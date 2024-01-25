import React,{useState,useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../DetailsSlice";
import { setReferralSubmissionStep } from "../ReferralSubmissionSlice";
import FormSelectCtrl from "../FormSelectCtrl/FormSelectCtrl";
import FormYesNoBtnsCtrl from "../FormYesNoBtnsCtrl/FormYesNoBtnsCtrl";
import { setLeftNavClearLinkText, setTTCMandatory } from "../SharedStringsSlice";
import ModalDialog from "../ModalDialog/ModalDialog";
import { warning_MandatoryText } from "../Config.js"

const DiagnosisDetails = () => {
    const dispatch = useDispatch()
    const details = useSelector(state=>state.details)
    const listData = useSelector(state => state.masterData)
    const currentStep = useSelector(state => state.referralSubmissionStep)
    const [medicalOncologistList,setMedicalOncologistList] = useState([{label: "Not Required", value: "Not Required"}, 
    {label: "CCC to Assign", value:"CCC to Assign"}])
    const [clinicalOncologistList,setClinicalOncologistList] = useState([{label: "Not Required", value: "Not Required"}, 
    {label: "CCC to Assign", value:"CCC to Assign"}])
    const [targetCategoryList,setTargetCategoryList] = useState([])
    const [isUpgradeScreeingYes,setIsUpgradeScreeingYes] = useState(details.IsthisaTargetPatient)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalText, setModalText] = useState("")
    //const [enableRedBorder, setEnableRedBorder] = useState(false)
    const enableRedBorder = useSelector(state => state.sharedStrings.enableTTCMandatory)
    const fixedOptions = [{label: "Not Required", value: "Not Required"}, 
    {label: "CCC to Assign", value:"CCC to Assign"}]
    const mandatoryFlag = true//useSelector(state => state.details.IsExistingNHSNumber === 'Yes' ? false : true)

    useEffect(() => {
        dispatch(setLeftNavClearLinkText("Treatment & Target Category"))
        if(listData.MedicalOncologists){
            const allOptions = listData.MedicalOncologists
            .filter(status => status.referralType === details.ReferralType)
            .map(status => {
              const lastSpaceIndex = status.title.lastIndexOf(' ');
              const label = lastSpaceIndex !== -1 ? status.title.substring(0, lastSpaceIndex) : status.title;
      
              return {
                label: status.title,
                value: status.title
              };
            })
            const sortedOptions = allOptions.sort((a, b) => a.label.localeCompare(b.label))
            const finalOptions = [...fixedOptions, ...sortedOptions]
            setMedicalOncologistList(finalOptions)
        }
        if(listData.ClinicalOncologists){
            const allOptions = listData.ClinicalOncologists
                .filter(status => status.referralType === details.ReferralType)
                .map(status => {
                    const lastSpaceIndex = status.title.lastIndexOf(' ');
                    const label = lastSpaceIndex !== -1 ? status.title.substring(0, lastSpaceIndex) : status.title;

                    return {
                    label: status.title,
                    value: status.title
                    };
            })
            const sortedOptions = allOptions.sort((a, b) => a.label.localeCompare(b.label))
            const finalOptions = [...fixedOptions, ...sortedOptions]
            setClinicalOncologistList(finalOptions)
        }
        if(listData.TargetCategories){
            setTargetCategoryList(listData.TargetCategories.map((status) => ({
                label: status.title,
                value: status.title
            })))
        }
    },[])

    const checkFieldsValidation = () => {
        var errorMsg = `<div style='max-height:500px;overflow-y:auto;width:400px'><b style='line-height:28px'>${warning_MandatoryText}</b><br/><br/>`
        let treatmentMandatoryFields = [ 'MedicalOncologistCCCConsultant', 'ClinicalOncologistCCCConsultant', 
        'IsthisaTargetPatient' ]
        
        const treatmentMFDN = {}
        treatmentMFDN["MedicalOncologistCCCConsultant"] = "CCC Consultant - Medical Oncologist"
        treatmentMFDN["ClinicalOncologistCCCConsultant"] = "CCC Consultant - Clinical Oncologist"
        treatmentMFDN["IsthisaTargetPatient"] = "Is this a Target Patient"

        if(details && details.IsthisaTargetPatient == "Yes"){
            //treatmentMandatoryFields = treatmentMandatoryFields.filter(field => field !== 'TargetCategory')
            treatmentMandatoryFields.push("TargetCategory")
            treatmentMFDN["TargetCategory"] = "Target Category"
        }

        let emptyFields = []

        for (const fieldName of treatmentMandatoryFields) {
            if (!details.hasOwnProperty(fieldName) || details[fieldName] === "") {
                emptyFields.push(treatmentMFDN[fieldName])
            }
        }

        if (emptyFields.length > 0) {
            errorMsg = errorMsg + `<div style='text-align:left;line-height:28px'><ul>${emptyFields.map(field => `<li>${field}</li>`).join('')}</ul></div></div>`;
            setModalText(errorMsg)
            //setEnableRedBorder(true)
            const title = "enableTTCMandatory"
            const value = true
            dispatch(setTTCMandatory({title, value}))
            return true
        }
        return false
    }

    const handleNext = () => {
        if (details && /*details.IsExistingNHSNumber != "Yes" && */checkFieldsValidation()){
            openModal()
            return
        }
        dispatch(setReferralSubmissionStep(currentStep + 1))
    }

    const handleBack = () => {
        /*if (checkFieldsValidation()){
            openModal()
            return
        }*/
        dispatch(setReferralSubmissionStep(currentStep - 1))
    }

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const onChangeTextHandle = (title, value) => {
        if(title == "IsthisaTargetPatient"){
            setIsUpgradeScreeingYes(value)
        }
        dispatch(updateDetails({title, value}))
    }

    return (
        <div className="detailssection">
            <div style={{float:'left',width:"100%"}}>
                <div style={{display:"inline-block",width:"100%"}}>
                    <h3 className="detailsHeader" style={{float:"left"}}>Treatment & Target Category</h3>
                    <div className="detailsNext" style={{float:"right"}}>
                        <button onClick={handleNext}>Next</button>
                        <button onClick={handleBack} style={{marginRight:'10px'}}>Back</button>
                    </div>
                </div>
                <div style={{display:'inline-block',width:'870px'}}>
                    <div style={{marginRight:'200px',float: 'left'}}>
                        {/*<FormTextBoxCtrl label="Tumour Location" onChangeText={onChangeTextHandle} title="TumourLocation" value={details && details.TumourLocation}/><br/>*/}
                    </div>
                    <div style={{float:'left'}}>
                        <FormSelectCtrl label="CCC Consultant - Medical Oncologist" onChangeText={onChangeTextHandle} title="MedicalOncologistCCCConsultant" value={details && details.MedicalOncologistCCCConsultant} options={medicalOncologistList} isMandatory={mandatoryFlag} enableRedBorder={enableRedBorder && (!details.MedicalOncologistCCCConsultant || details.MedicalOncologistCCCConsultant === "")} dontSortOptions={true}/><br/>
                        <FormSelectCtrl label="CCC Consultant - Clinical Oncologist" onChangeText={onChangeTextHandle} title="ClinicalOncologistCCCConsultant" value={details && details.ClinicalOncologistCCCConsultant} options={clinicalOncologistList} isMandatory={mandatoryFlag} enableRedBorder={enableRedBorder && (!details.ClinicalOncologistCCCConsultant || details.ClinicalOncologistCCCConsultant === "")} dontSortOptions={true}/>
                    </div>
                </div>
                <div style={{display:'inline-block',width:'856px'}}><br/>
                    {/*<FormTextAreaCtrl label="Primary Diagnosis" onChangeText={onChangeTextHandle} title="PrimaryDiagnosis" value={details && details.PrimaryDiagnosis} ctrlWidth="860px"/><br/>*/}
                    <div style={{width:'190px', border: enableRedBorder && !details.IsthisaTargetPatient ? '1px solid red' : '0px solid red', padding: enableRedBorder && !details.IsthisaTargetPatient ? '5px' : '0px'}}>
                        <FormYesNoBtnsCtrl label="Is this a Target Patient?" onChangeValue={onChangeTextHandle} 
                                    title="IsthisaTargetPatient" value={details && details.IsthisaTargetPatient} IsNewLine={true} isMandatory={mandatoryFlag} enableRedBorder={enableRedBorder && (!details.IsthisaTargetPatient || details.IsthisaTargetPatient === "")} />
                    </div><br/>
                    {isUpgradeScreeingYes === "Yes" && 
                    <FormSelectCtrl label="Target Category" onChangeText={onChangeTextHandle} 
                        title="TargetCategory" value={details && details.TargetCategory} options={targetCategoryList} isMandatory={mandatoryFlag} enableRedBorder={enableRedBorder && (!details.TargetCategory || details.TargetCategory === "")}/>}
                    {/*<FormTextAreaCtrl label="Pathway Information" onChangeText={onChangeTextHandle} title="PathwayInformation" value={details && details.PathwayInformation} ctrlWidth="860px"/><br/>*/}
                    {/*<FormTextAreaCtrl label="Upgrade/Screening/62 Day - including PPI/UPI number/Clock start date" onChangeText={onChangeTextHandle} title="UpgradeScreening" 
                    value={details && details.UpgradeScreening} ctrlWidth="860px"/><br/>*/}
                    {/*<FormTextAreaCtrl label="Diagnostics" onChangeText={onChangeTextHandle} title="Diagnostics" 
                    value={details && details.Diagnostics} ctrlWidth="860px"/>*/}
                </div>
            </div>

            <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={true} isHtmlContent={true}>
                {modalText}
            </ModalDialog>
            
            {/*<div className="detailsNext">
                    <button onClick={handleNext}>Next</button>
                    <button onClick={handleBack} style={{marginRight:'10px'}}>Back</button>
                </div>*/}
        </div>
    )
}

export default DiagnosisDetails