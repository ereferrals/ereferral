import React from "react";
import EmailOTPRequest from '../EmailOTPRequest/EmailOTPRequest';
import OTPValidation from '../OTPValidation/OTPValidation';
import ClatterbridgeLogo from '../../Images/Clatterbridge-logo.png';
import "./UserValidation.css";
import { useSelector } from "react-redux";

const UserValidation = () => {
    const currentStep = useSelector(state => state.userValidationStep)
    /*const [currentStep, setCurrentStep] = useState(0);
    const [otp, setOTP] = useState("");

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleOTPGeneration = (generatedOTP) => {
      setOTP(generatedOTP);
    };

    const goToReferralSelection = () => {
        onNext();
    }*/
    
    return(
        <div class="container">
            <div class="vertical-center">
                <p>
                    <img src={ClatterbridgeLogo} style={{width: '320px'}}/>
                </p>
                <p class="boldtxt" style={{ lineHeight: '50px', fontSize: '30px', marginTop: '0px' }}>
                    Patient Referral Portal
                </p>
                {currentStep === 0 && <EmailOTPRequest />}
                {currentStep === 1 && <OTPValidation />}
            </div>
        </div>
    )
}

export default UserValidation