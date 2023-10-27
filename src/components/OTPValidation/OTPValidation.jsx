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
  const [remainingTime, setRemainingTime] = useState(120)
  const emailId = useSelector(state => state.email)
  const [resendAttempts, setResendAttempts] = useState(0)
  const maxResendAttempts = 3
  const [maxAttempts, setMaxAttempts] = useState(0);

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
        setModalText("Maximum OTP attempts reached. Please refresh and try again.");
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
    const isValidDigit = /^[0-9]$/.test(newValue);
    if(!isValidDigit)
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
      var response = await validateOTP(concatenatedNumberString);//"Success";//checkonce
      if(response == "Success"){
          closeModal();
          dispatch(setAppStep(1))
          //onNext();
      }
      else{
          //closeModal();
          setShowCloseButton(true);debugger
          setMaxAttempts(maxAttempts + 1)
          if(response && response.indexOf("Invalid") > -1){
            if(maxAttempts < 5){
              setMaxAttempts(maxAttempts + 1)
              setModalText("Invalid OTP.");
            }
            else{
              setModalText("You have reached maximum attempts. Please refresh and try again.");
              setModalText(response);
            }
          }
          else{
            setModalText(response);
          }
          
          //alert(response)
      }
    }
    else{
      openModal();
      setShowCloseButton(true);
      setModalText("Enter valid OTP");
    }
  };

  const handleResendOTP = async () => {debugger
    setResendAttempts(resendAttempts + 1)
    openModal()
    setShowCloseButton(false)
    setModalText("Sending OTP... Please wait.")
    await generateOTP(emailId);
    closeModal();
    setRemainingTime(120)
    setIsTimerActive(true)
    return false
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
            />
          ))}
        </p>
        <p>
        {maxAttempts !== 5 && (
          isTimerActive ? (
            <span>OTP will expire in {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}</span>
          ) : (
            <a style={{ color: "#005cbb" }} href="javascript:void(0)" onClick={handleResendOTP}>
              Re-send OTP
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
