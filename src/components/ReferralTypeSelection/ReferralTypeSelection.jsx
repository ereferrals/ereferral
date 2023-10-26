import React from "react"
import HomeVideo from "../HomeVideo/HomeVideo";
import ChooseReferralType from "../ChooseReferralType/ChooseReferralType";
import ChooseStages from "../ChooseStages/ChooseStages";
import Header from "../Header/Header";
import "./ReferralTypeSelection.css"
import { useSelector } from "react-redux";
import Questionnaire from "../Questionnaire/Questionnaire";

const ReferralTypeSelection = () => {
    const currentStep = useSelector(state => state.referralTypeStageStep)

    return(
        <div>
            <Header />
            {currentStep === 0 && <HomeVideo />}
            {currentStep === 1 && <ChooseReferralType />}
            {currentStep === 3 && <ChooseStages />}
            {currentStep === 2 && <Questionnaire />}
        </div>
    )
}

export default ReferralTypeSelection