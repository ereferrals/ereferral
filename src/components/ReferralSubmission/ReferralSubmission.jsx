import React, {useState} from "react"
import PatientDetails from "../PatientDetails/PatientDetails";
import RefererDetails from "../RefererDetails/RefererDetails";
import DiagnosisDetails from "../DiagnosisDetails/DiagnosisDetails";
import MDTDetails from "../MDTDetails/MDTDetails";
import Reports from "../Reports/Reports";
import SubmitReferral from "../SubmitReferral/SubmitReferral";
import SuccessView from "../SuccessView/SuccessView";
import LeftNavForDetails from "../LeftNavForDetails/LeftNavForDetails";
import Header from "../Header/Header";
import "./ReferralSubmission.css"
import { useSelector } from "react-redux";
import NextofKinDetails from "../NextofKinDetails/NextofKinDetails";

const ReferralSubmission = () => {
  const currentStep = useSelector(state => state.referralSubmissionStep)

  return (
    <div className="App">
      <div style={{display:'inline-block',width:'100%'}}>
        <Header />
        <div style={{padding: '40px'}}>
          {(currentStep === 0 || currentStep === 1 || currentStep === 2 || currentStep === 3 || currentStep === 4) &&  
            <div style={{float:'left',width:'330px'}}>
              <LeftNavForDetails />
            </div>}
            <div style={{float:'left',width:'calc(100% - 330px)'}}>
              {currentStep === 0 && <PatientDetails />}
              {currentStep === 1 && <NextofKinDetails />}
              {currentStep === 2 && <RefererDetails />}
              {currentStep === 3 && <DiagnosisDetails />}
              {currentStep === 4 && <Reports />}
              {currentStep === 5 && <SubmitReferral />}
              {currentStep === 6 && <SuccessView />}
            </div>
        </div>
      </div>
    </div>
  );
}

export default ReferralSubmission