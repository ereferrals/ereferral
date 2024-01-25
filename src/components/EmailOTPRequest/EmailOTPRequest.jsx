import React,{useState,useEffect} from "react"
import TextBoxCtrl from "../TextBoxCtrl/TextBoxCtrl";
import ButtonCtrl from "../ButtonCtrl/ButtonCtrl";
import ModalDialog from "../ModalDialog/ModalDialog";
import { validateDomain, generateOTP, clearSession, validateReCaptcha } from "../../Services/api";
import { useDispatch } from "react-redux";
import { setUserValidationStep } from "../UserValidation/UserValidationSlice";
import { setEmail } from "./EmailSlice";
import { updateDetails } from "../DetailsSlice";
import ReCAPTCHA from "react-google-recaptcha";
import { setReferrerEmail } from "../SharedStringsSlice";
import {warning_ValidEmailText} from "../Config.js"

const EmailOTPRequest = () =>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [emailId, setEmailId] = useState("")
    const [modalText, setModalText] = useState("");
    const [showCloseButton,setShowCloseButton] = useState(true)
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const dispatch = useDispatch()
    const [captchaResponse, setCaptchaResponse] = useState(null)
    const [isSupportedMode, setIsSupportedMode] = useState(true)

    useEffect(() => {
        /*const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        const isPrivateMode = window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.isPrivate;

        if (isSafari || isPrivateMode) {
            //alert("You cannot use the app in Safari and private mode");
            setIsSupportedMode(false)
        } else {
            clearSessionString();
        }
        */
        clearSessionString()
    },[isSupportedMode])

    const clearSessionString = async () => {
        try {
            await clearSession();
        } 
        catch (error) {
            if (error.message.includes('400')) {
              alert(error.message);
            } else if (error.message.includes('500')) {
              alert(error.message);
            } else {
              alert(error.message);
            }
        }
    }

    const handleEmailOTPRequest = async () =>{
        if(emailId == "" || !(emailPattern.test(emailId))){
            setShowCloseButton(true)
            setModalText(warning_ValidEmailText)
            openModal();
            return;
        }
        else{
            const atIndex = emailId.indexOf("@");
            var emailText = "";
            if (atIndex !== -1) {
                emailText = emailId.slice(0, atIndex)
            }
            if(emailText != "" && emailText.length > 64){
                setShowCloseButton(true)
                setModalText(warning_ValidEmailText)
                openModal();
                return;
            }
        }
        if(captchaResponse == null){
            setShowCloseButton(true)
            setModalText("Please select the 'I am not a Robot' checkbox.")
            openModal();
            return;
        }
        else{
            const atIndex = emailId.indexOf("@");
            var domain = "";
            if (atIndex !== -1) {
                domain = emailId.slice(atIndex + 1);
            }
            setShowCloseButton(false)
            setModalText("Validating email... Please wait.")
            openModal();
            //checkonce
            //Change to domain before live.
            //var isValid = await validateDomain(domain);
            try{
                await validateDomain(emailId);
                dispatch(setReferrerEmail(emailId));
                setModalText("Sending verification code... Please wait.")
                dispatch(setEmail(emailId))
                await generateOTP();
                closeModal();
                dispatch(setUserValidationStep(1))
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
        //generate otp
        //onNext();
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const onChangeText = (email) => {
        setEmailId(email)
    }

    const onChange = async (value) => {
        try {
            await validateReCaptcha(value)
            setCaptchaResponse("validated")
        } 
        catch (error) {
            if (error.message.includes('400')) {
                alert(error.message);
            } else if (error.message.includes('500')) {
                alert(error.message);
            } else {
                alert(error.message);
            }
        }
    }

    return(
        <div>
            {isSupportedMode && <>
            <center>
                <p><TextBoxCtrl placeholdertext="Enter email address" onChangeText={onChangeText} /></p>
                <p>
                <ReCAPTCHA sitekey="6LeB4t4oAAAAAONBx_KT4CXAKPi9Kh_cGE_jiFqM" onChange={onChange} />
                </p>
                <p><ButtonCtrl btnText="Send" btnClickHandler={handleEmailOTPRequest} /></p>
            </center>
            <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={showCloseButton}>
            {modalText}
            </ModalDialog></>}
            {!isSupportedMode && <><b style={{fontSize:'16px'}}>Please note that the app is not compatible with Safari or private browsing mode. For the best experience, we recommend using a different browser or regular browsing mode.</b></>}
        </div>
    )
}

export default EmailOTPRequest