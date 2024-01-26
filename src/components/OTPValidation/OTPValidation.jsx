import React,{useEffect, useState} from "react";
import "./OTPValidation.css";
import ButtonCtrl from "../ButtonCtrl/ButtonCtrl";
import { generateOTP, validateOTP } from "../../Services/api";
import ModalDialog from "../ModalDialog/ModalDialog";
import { useDispatch, useSelector } from "react-redux";
import { setAppStep } from "../AppSlice";

const OTPValidation = () => {
  const dispatch = useDispatch()
  const [enteredOTP, setEnteredOTP] = useState(Array(6).fill(""))
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showCloseButton,setShowCloseButton] = useState(true)
  const [modalText, setModalText] = useState("")
  const [isTimerActive, setIsTimerActive] = useState(true)
  const [remainingTime, setRemainingTime] = useState(300)
  const emailId = useSelector(state => state.sharedStrings.ReferrerEmail)
  const [resendAttempts, setResendAttempts] = useState(0)
  const maxResendAttempts = 3
  const [maxAttempts, setMaxAttempts] = useState(0)
  const [textBoxValues, setTextBoxValues] = useState(Array(6).fill(''))

  useEffect(() => {
    let timer;

    if (isTimerActive && remainingTime > 0) {
      timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      if (resendAttempts < maxResendAttempts) {
        setIsTimerActive(false);
      } else {
        openModal();
        setShowCloseButton(true);
        setModalText("Maximum verification code attempts reached. Please refresh and try again.");
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isTimerActive, remainingTime]);

  const handleKeyDown = (event, index) => {
    if (/^[0-9]$/.test(event.key) && index < 5) {
      const nextInput = event.target.parentElement.querySelector(
        `input:nth-child(${index + 2})`
      );
      if (nextInput) {
        nextInput.focus();
      }
    }
  };
  const handleTextboxChange = (event, index) => {
    var newValue = event.target.value;
    const isValidDigit = /^[0-9 ]$/.test(newValue);
    if(!isValidDigit && newValue.trim() != "")
    {
      event.target.value="";
      return;
    }
    setEnteredOTP((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = newValue;
      return newValues;
    });
  };
  
  const openModal = () => {
      setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
  };

  const handleOTPValidation = async () => {
    if(maxAttempts == 5){
      openModal();
      setShowCloseButton(true);
      setModalText("You have reached maximum attempts. Please refresh and try again.");
      return
    }
    const concatenatedNumberString = enteredOTP.map(String).join("");
    if(concatenatedNumberString.length == 6){
      openModal();
      setShowCloseButton(false);
      setModalText("Validating OTP... Please wait.");
      try{
        await validateOTP(concatenatedNumberString);//"Success";//checkonce
        closeModal();
        dispatch(setAppStep(1))
      }
      catch (error) {
          setShowCloseButton(true)
          if (error.message.includes('400')) {
              setMaxAttempts(maxAttempts + 1)
              if(error.message.includes('Invalid')){
                if(maxAttempts < 5){
                  setMaxAttempts(maxAttempts + 1)
                  setModalText("Invalid verification code.");
                }
                else{
                  setModalText("You have reached maximum attempts. Please refresh and try again.");
                }
              }
              else if(error.message.includes('OTP has expired')){
                setModalText("Verification code has expired.")
              }
              else {
                  setModalText(error.message)
              }
          } else if (error.message.includes('500')) {
              setModalText(error.message)
          } else {
              setModalText(error.message)
          }
      }
    }
    else{
      openModal();
      setShowCloseButton(true);
      setModalText("Enter valid verification code");
    }
  };

  const handleResendOTP = async () => {
    try{
        setEnteredOTP(Array(6).fill(''))
        setResendAttempts(resendAttempts + 1)
        openModal()
        setShowCloseButton(false)
        setModalText("Sending verification code... Please wait.")
        await generateOTP(emailId);
        closeModal();
        setRemainingTime(300)
        setIsTimerActive(true)
        return false
      }
      catch (error) {
        setShowCloseButton(true)
        if (error.message.includes('400')) {
            if(error.message.includes('OTP Generated Already')){
                setModalText("Another eReferral session already in progress. Please close all browsers and try again.")
            }
            else if(error.message.includes('Not valid')){
                setModalText("Email not found in our records.")
            }
            else {
                setModalText(error.message)
            }
        } else if (error.message.includes('500')) {
            setModalText(error.message)
        } else {
            setModalText(error.message)
        }
    }
  }

  return (
    <div className="OTPValidation">
      <center>
        <p>Please enter the six digit code sent to your email address</p>
        <p>
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              onKeyUp={(event) => handleKeyDown(event, index)}
              onChange={(event) => handleTextboxChange(event, index)}
              value={enteredOTP[index]}
            />
          ))}
        </p>
        <p>
        {maxAttempts !== 5 && (
          isTimerActive ? (
            <span>Verification code will expire in {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}</span>
          ) : (
            <a style={{ color: "#005cbb" }} href="javascript:void(0)" onClick={handleResendOTP}>
              Resend verification code
            </a>
          )
        )}
        </p>
        <p><ButtonCtrl btnText="Send" btnClickHandler={handleOTPValidation} /></p>
        <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={showCloseButton}>
          {modalText}
        </ModalDialog>
      </center>
    </div>
  );
};

export default OTPValidation;
