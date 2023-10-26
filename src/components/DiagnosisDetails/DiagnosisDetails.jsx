import React,{useState,useEffect} from "react"
import FormTextBoxCtrl from "../FormTextBoxCtrl/FormTextBoxCtrl";
import FormTextAreaCtrl from "../FormTextAreaCtrl/FormTextAreaCtrl";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../DetailsSlice";
import { setReferralSubmissionStep } from "../ReferralSubmissionSlice";
import FormSelectCtrl from "../FormSelectCtrl/FormSelectCtrl";
import FormYesNoBtnsCtrl from "../FormYesNoBtnsCtrl/FormYesNoBtnsCtrl";
import { setLeftNavClearLinkText } from "../SharedStringsSlice";

const DiagnosisDetails = ({onNext,onBack}) => {
    const dispatch = useDispatch()
    const details = useSelector(state=>state.details)
    const listData = useSelector(state => state.masterData)
    const currentStep = useSelector(state => state.referralSubmissionStep)
    const [medicalOncologistList,setMedicalOncologistList] = useState([])
    const [clinicalOncologistList,setClinicalOncologistList] = useState([])
    const [targetCategoryList,setTargetCategoryList] = useState([])
    const [isUpgradeScreeingYes,setIsUpgradeScreeingYes] = useState(details.IsthisaTargetPatient)

    useEffect(() => {
        dispatch(setLeftNavClearLinkText("Treatment & Target Category"))
        if(listData.MedicalOncologists){
            setMedicalOncologistList(
                listData.MedicalOncologists
                  .filter(status => status.referralType === details.ReferralType)
                  .map(status => {
                    const lastSpaceIndex = status.title.lastIndexOf(' ');
                    const label = lastSpaceIndex !== -1 ? status.title.substring(0, lastSpaceIndex) : status.title;
                    
                    return {
                      label: label,
                      value: status.title
                    }
                  })
              )
        }
        if(listData.ClinicalOncologists){
            setClinicalOncologistList(
                listData.ClinicalOncologists
                  .filter(status => status.referralType === details.ReferralType)
                  .map(status => {
                    const lastSpaceIndex = status.title.lastIndexOf(' ');
                    const label = lastSpaceIndex !== -1 ? status.title.substring(0, lastSpaceIndex) : status.title;
            
                    return {
                      label: label,
                      value: status.title
                    }
                  })
              )
        }
        if(listData.TargetCategories){
            setTargetCategoryList(listData.TargetCategories.map((status) => ({
                label: status.title,
                value: status.title
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
        if(title == "IsthisaTargetPatient"){
            setIsUpgradeScreeingYes(value)
        }
        dispatch(updateDetails({title, value}))
    }

    const resetControl = (title, value) => {
        dispatch(updateDetails({ title, value }));
    }

    const handleReset = () => {
        resetControl("MedicalOncologistCCCConsultant","")
        resetControl("ClinicalOncologistCCCConsultant","")
        resetControl("PrimaryDiagnosis","")
        resetControl("IsthisaTargetPatient","")
        resetControl("TargetCategory","")
    }

    return (
        <div className="detailssection">
            <div style={{float:'left',width:'870px'}}>
                <h3 className="detailsHeader">Treatment & Target Category</h3>
                <div style={{display:'inline-block',width:'870px'}}>
                    <div style={{marginRight:'200px',float: 'left'}}>
                        {/*<FormTextBoxCtrl label="Tumour Location" onChangeText={onChangeTextHandle} title="TumourLocation" value={details && details.TumourLocation}/><br/>*/}
                    </div>
                    <div style={{float:'left'}}>
                        <FormSelectCtrl label="CCC Consultant - Medical Oncologist" onChangeText={onChangeTextHandle} title="MedicalOncologistCCCConsultant" value={details && details.MedicalOncologistCCCConsultant} options={medicalOncologistList}/><br/>
                        <FormSelectCtrl label="CCC Consultant - Clinical Oncologist" onChangeText={onChangeTextHandle} title="ClinicalOncologistCCCConsultant" value={details && details.ClinicalOncologistCCCConsultant} options={clinicalOncologistList}/>
                    </div>
                </div>
                <div style={{display:'inline-block',width:'856px'}}><br/>
                    <FormTextAreaCtrl label="Primary Diagnosis" onChangeText={onChangeTextHandle} title="PrimaryDiagnosis" value={details && details.PrimaryDiagnosis} ctrlWidth="860px"/><br/>
                    <FormYesNoBtnsCtrl label="Is this a Target Patient?" onChangeValue={onChangeTextHandle} 
                                    title="IsthisaTargetPatient" value={details && details.IsthisaTargetPatient} IsNewLine={true} /><br/>
                    {isUpgradeScreeingYes === "Yes" && 
                    <FormSelectCtrl label="Target Category" onChangeText={onChangeTextHandle} 
                        title="TargetCategory" value={details && details.TargetCategory} options={targetCategoryList}/>}
                    {/*<FormTextAreaCtrl label="Pathway Information" onChangeText={onChangeTextHandle} title="PathwayInformation" value={details && details.PathwayInformation} ctrlWidth="860px"/><br/>*/}
                    {/*<FormTextAreaCtrl label="Upgrade/Screening/62 Day - including PPI/UPI number/Clock start date" onChangeText={onChangeTextHandle} title="UpgradeScreening" 
                    value={details && details.UpgradeScreening} ctrlWidth="860px"/><br/>*/}
                    {/*<FormTextAreaCtrl label="Diagnostics" onChangeText={onChangeTextHandle} title="Diagnostics" 
                    value={details && details.Diagnostics} ctrlWidth="860px"/>*/}
                </div>
            </div>
            
            <div className="detailsNext">
                    <button onClick={handleNext}>Next</button>
                    <button onClick={handleBack} style={{marginRight:'10px'}}>Back</button>
                    {/*<button onClick={handleReset} style={{marginRight:'10px'}}>Reset</button>*/}
                </div>
        </div>
    )
}

export default DiagnosisDetails