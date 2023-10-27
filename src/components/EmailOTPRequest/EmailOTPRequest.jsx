import React,{useState} from "react"
import TextBoxCtrl from "../TextBoxCtrl/TextBoxCtrl";
import ButtonCtrl from "../ButtonCtrl/ButtonCtrl";
import ModalDialog from "../ModalDialog/ModalDialog";
import { validateDomain, generateOTP } from "../../Services/api";
import { useDispatch } from "react-redux";
import { setUserValidationStep } from "../UserValidation/UserValidationSlice";
import { setEmail } from "./EmailSlice";
import { updateDetails } from "../DetailsSlice";

const EmailOTPRequest = () =>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [emailId, setEmailId] = useState("");
    const [modalText, setModalText] = useState("");
    const [showCloseButton,setShowCloseButton] = useState(true)
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const dispatch = useDispatch()

    const handleEmailOTPRequest = async () =>{
        if(emailId == "" || !(emailPattern.test(emailId))){
            setShowCloseButton(true)
            setModalText("Enter valid email address")
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
            var isValid = await validateDomain(domain);
            if(isValid == "OTP Generated Already")
            {
                setShowCloseButton(true)
                setModalText("Another eReferral session already in progress. Please close all browsers and try again.")
                return
            }
            //if((isValid==undefined || isValid == "Not valid") && false){//checkonce
            if(isValid==undefined || isValid == "Not valid"){
                setShowCloseButton(true)
                setModalText("Email not found in our records.")
                //openModal();
                return;
            }
            else{
                var title = "ReferrerEmail"
                var value = emailId
                dispatch(updateDetails({title, value}));
                setShowCloseButton(false)
                setModalText("Sending OTP... Please wait.")
                dispatch(setEmail(emailId))
                await generateOTP(emailId);
                closeModal();
                dispatch(setUserValidationStep(1))
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

    return(
        <div>
            <center>
                <p><TextBoxCtrl placeholdertext="Enter email address" onChangeText={onChangeText} /></p>
                <p><ButtonCtrl btnText="Send" btnClickHandler={handleEmailOTPRequest} /></p>
            </center>
            <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={showCloseButton}>
            {modalText}
            </ModalDialog>
        </div>
    )
}

export default EmailOTPRequest