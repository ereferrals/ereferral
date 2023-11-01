import React,{useState,useEffect} from "react"
import FormTextBoxCtrl from "../FormTextBoxCtrl/FormTextBoxCtrl";
import FormTextAreaCtrl from "../FormTextAreaCtrl/FormTextAreaCtrl";
import FormDateCtrl from "../FormDateCtrl/FormDateCtrl";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../DetailsSlice";
import { setReferralSubmissionStep } from "../ReferralSubmissionSlice";
import FormSelectCtrl from "../FormSelectCtrl/FormSelectCtrl";
import { setLeftNavClearLinkText } from "../SharedStringsSlice";

const RefererDetails = () => {
    const dispatch = useDispatch();
    const details = useSelector(state => state.details)
    const currentStep = useSelector(state => state.referralSubmissionStep)
    const listData = useSelector(state => state.masterData)
    const [referringOrgsList,setReferringOrgsList] = useState([])

    useEffect(() => {
        dispatch(setLeftNavClearLinkText("Refer"))
        if(listData.ReferringOrgs){
            setReferringOrgsList(listData.ReferringOrgs.map((status) => ({
                label: status.hospital,
                value: status.hospital
            })))
        }
    },[])

    const handleNext = () => {
        dispatch(setReferralSubmissionStep(currentStep + 1))
    }

    const handleBack = () => {
        dispatch(setReferralSubmissionStep(currentStep - 1))
    }

    const onChangeTextHandle = (title, value) => {
        dispatch(updateDetails({title, value}))
    }
    const resetControl = (title, value) => {
        dispatch(updateDetails({ title, value }));
    }

    const handleReset = () => {
        resetControl("GPName","")
        resetControl("GPPractice","")
        resetControl("GPPracticeAddress","")

        resetControl("ReferringOrganisation","")
        resetControl("ReferringConsultant","")
        resetControl("DateDecisiontoRefer","")
    }

    return (
        <div className="detailssection">
            <div style={{float:'left',width:"100%"}}>
                <div style={{display:"inline-block",width:"100%"}}>
                    <h3 className="detailsHeader" style={{float:"left"}}>Refer Details</h3>
                    <div className="detailsNext" style={{float:"right"}}>
                        <button onClick={handleNext}>Next</button>
                        <button onClick={handleBack} style={{marginRight:'10px'}}>Back</button>
                    </div>
                </div>
                <div style={{display:'inline-block',width:'100%'}}>
                    <div style={{marginRight:'200px',float: 'left'}}>
                        <FormTextBoxCtrl label="Specified GP" onChangeText={onChangeTextHandle} title="GPName" value={details && details.GPName} onlyText={true}/><br/>
                        <FormTextBoxCtrl label="GP Practice Name" onChangeText={onChangeTextHandle} title="GPPractice" value={details && details.GPPractice} onlyText={true}/><br/>
                        <FormTextAreaCtrl label="GP Practice Address" onChangeText={onChangeTextHandle} title="GPPracticeAddress" value={details && details.GPPracticeAddress} ctrlWidth="322px"/>
                    </div>
                    <div style={{float:'left'}}>
                        <FormSelectCtrl label="Referring Organisation" onChangeText={onChangeTextHandle} title="ReferringOrganisation" value={details && details.ReferringOrganisation} options={referringOrgsList}/><br/>
                        {/*<FormTextBoxCtrl label="Referring Organisation" onChangeText={onChangeTextHandle} title="ReferringOrganisation" value={details && details.ReferringOrganisation}/><br/>*/}
                        <FormTextBoxCtrl label="Referring Consultant" onChangeText={onChangeTextHandle} title="ReferringConsultant" value={details && details.ReferringConsultant} onlyText={true}/><br/>
                        {/*<FormDateCtrl label="Date Decision to Refer" onChangeText={onChangeTextHandle} title="DateDecisiontoRefer" value={details && details.DateDecisiontoRefer} dtWidth="320px"/>*/}
                        
                    </div>
                </div>
            </div>
            
            {/*<div className="detailsNext">
                <button onClick={handleNext}>Next</button>
                <button onClick={handleBack} style={{marginRight:'10px'}}>Back</button>
            </div>*/}
        </div>
    )
}

export default RefererDetails