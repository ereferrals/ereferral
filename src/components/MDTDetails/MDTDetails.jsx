import React,{useState,useEffect} from "react"
import FormTextBoxCtrl from "../FormTextBoxCtrl/FormTextBoxCtrl";
import FormTextAreaCtrl from "../FormTextAreaCtrl/FormTextAreaCtrl";
import FormCheckBoxCtrl from "../FormCheckBoxCtrl/FormCheckBoxCtrl";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../DetailsSlice";
import { setReferralSubmissionStep } from "../ReferralSubmissionSlice";

const MDTDetails = ({onNext,onBack}) => {
    const dispatch = useDispatch()
    const details = useSelector(state => state.details)
    const currentStep = useSelector(state => state.referralSubmissionStep)

    const handleNext = () => {
        dispatch(setReferralSubmissionStep(currentStep + 1))
    }

    const handleBack = () => {
        dispatch(setReferralSubmissionStep(currentStep - 1))
    }

    const onChangeTextHandle = (title, value) => {
        dispatch(updateDetails({title, value}))
    }

    return (
        <div className="detailssection">
            <div style={{float:'left',width:'870px'}}>
                <h3 className="detailsHeader">MDT Details</h3>
                <div style={{display:'inline-block',width:'100%'}}>
                    <div>
                        {/*<FormCheckBoxCtrl label="Is the Patient Aware of Diagnosis?" onChangeText={onChangeTextHandle} title="PatientAwareofDiagnosis" value={details && details.PatientAwareofDiagnosis}/><br/>
                        <FormCheckBoxCtrl label="Overseas Patient?" onChangeText={onChangeTextHandle} title="OverseasPatient" value={details && details.OverseasPatient}/><br/>                        
                        <FormCheckBoxCtrl label="Has Assessment been Completed?" onChangeText={onChangeTextHandle} title="HasAssessmentbeenCompleted" value={details && details.HasAssessmentbeenCompleted}/><br/>
                        <FormTextAreaCtrl label="MDT Comments" onChangeText={onChangeTextHandle} title="MDTComments" value={details && details.MDTComments} ctrlWidth="860px"/><br/>
                        <FormTextAreaCtrl label="Outcome of Assessment" onChangeText={onChangeTextHandle} title="OutcomeofAssessment" value={details && details.OutcomeofAssessment} ctrlWidth="860px"/>*/}
                    </div>
                </div>
            </div>
            
            <div className="detailsNext">
                    <button onClick={handleNext}>Next</button>
                    <button onClick={handleBack} style={{marginRight:'10px'}}>Back</button>
                </div>
        </div>
    )
}

export default MDTDetails