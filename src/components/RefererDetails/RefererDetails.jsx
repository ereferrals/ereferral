import React,{useState,useEffect, useRef} from "react"
import FormTextBoxCtrl from "../FormTextBoxCtrl/FormTextBoxCtrl";
import FormTextAreaCtrl from "../FormTextAreaCtrl/FormTextAreaCtrl";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../DetailsSlice";
import { setReferralSubmissionStep } from "../ReferralSubmissionSlice";
import FormSelectCtrl from "../FormSelectCtrl/FormSelectCtrl";
import { setLeftNavClearLinkText, setReferMandatory } from "../SharedStringsSlice";
import ModalDialog from "../ModalDialog/ModalDialog";
import { warning_MandatoryText } from "../Config";

const RefererDetails = () => {
    const dispatch = useDispatch();
    const details = useSelector(state => state.details)
    const currentStep = useSelector(state => state.referralSubmissionStep)
    const listData = useSelector(state => state.masterData)
    const [referringOrgsList,setReferringOrgsList] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalText, setModalText] = useState("")

    const prevLeftNavClearText = useRef(state => state.leftNavClearLinkText)
    const enableRedBorder = useSelector(state => state.sharedStrings.enableReferMandatory)
    const mandatoryFlag = useSelector(state => (state.details.IsExistingNHSNumber === 'Yes' || state.details.OverseasPatient === 'Yes') ? false : true)

    useEffect(() => {
        if(prevLeftNavClearText.current !== "Refer"){
            dispatch(setLeftNavClearLinkText("Refer"))
            if(listData.ReferringOrgs){
                setReferringOrgsList(listData.ReferringOrgs.map((status) => ({
                    label: status.hospital,
                    value: status.hospital
                })))
            }
            prevLeftNavClearText.current = "Refer"
        }
    },[])

    const checkFieldsValidation = () => {
        //var errorMsg = "<div style='max-height:500px;overflow-y:auto;width:400px'><b style='line-height:28px'>You must ensure you complete all the below mandatory fields to continue:</b><br/><br/>"
        var errorMsg = `<div style='max-height:500px;overflow-y:auto;width:400px;'><b style='line-height:28px'>${warning_MandatoryText}</b><br/><br/>`
        const referMandatoryFields = ['GPName', 'GPPractice', 'GPPracticeAddress', 'ReferringOrganisation', 'ReferringConsultant']
        
        const referMFDN = {}
        referMFDN["GPName"] = "Specified GP"
        referMFDN["GPPractice"] = "GP Practice Name"
        referMFDN["GPPracticeAddress"] = "GP Practice Address"
        referMFDN["ReferringOrganisation"] = "Referring Organisation"
        referMFDN["ReferringConsultant"] = "Referring Consultant"

        let emptyFields = []

        for (const fieldName of referMandatoryFields) {
            if (!details.hasOwnProperty(fieldName) || details[fieldName] === "") {
                emptyFields.push(referMFDN[fieldName])
            }
        }
    
        if (emptyFields.length > 0) {
            errorMsg = errorMsg + `<div style='text-align:left;line-height:28px'><ul>${emptyFields.map(field => `<li>${field}</li>`).join('')}</ul></div>`;
            setModalText(errorMsg)
            const title = "enableReferMandatory"
            const value = true
            dispatch(setReferMandatory({title, value}))
            return true
        }
        return false
    }

    const handleNext = () => {
        if ((details && details.IsExistingNHSNumber != "Yes" && details && details.OverseasPatient != "Yes") && checkFieldsValidation()){
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

    const onChangeTextHandle = (title, value) => {
        dispatch(updateDetails({title, value}))
    }

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
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
                        <FormTextBoxCtrl label="Specified GP" onChangeText={onChangeTextHandle} title="GPName" value={details && details.GPName} onlyText={true} isMandatory={mandatoryFlag} enableRedBorder={enableRedBorder && (!details.GPName || details.GPName === "")}/><br/>
                        <FormTextBoxCtrl label="GP Practice Name" onChangeText={onChangeTextHandle} title="GPPractice" value={details && details.GPPractice} onlyText={true} isMandatory={mandatoryFlag} enableRedBorder={enableRedBorder && (!details.GPPractice || details.GPPractice === "")}/><br/>
                        <FormTextAreaCtrl label="GP Practice Address" onChangeText={onChangeTextHandle} title="GPPracticeAddress" value={details && details.GPPracticeAddress} ctrlWidth="322px" isMandatory={mandatoryFlag} enableRedBorder={enableRedBorder && (!details.GPPracticeAddress || details.GPPracticeAddress === "")}/>
                    </div>
                    <div style={{float:'left'}}>
                        <FormSelectCtrl label="Referring Organisation" onChangeText={onChangeTextHandle} title="ReferringOrganisation" value={details && details.ReferringOrganisation} options={referringOrgsList} isMandatory={mandatoryFlag} enableRedBorder={enableRedBorder && (!details.ReferringOrganisation || details.ReferringOrganisation === "")}/><br/>
                        {/*<FormTextBoxCtrl label="Referring Organisation" onChangeText={onChangeTextHandle} title="ReferringOrganisation" value={details && details.ReferringOrganisation}/><br/>*/}
                        <FormTextBoxCtrl label="Referring Consultant" onChangeText={onChangeTextHandle} title="ReferringConsultant" value={details && details.ReferringConsultant} onlyText={true} isMandatory={mandatoryFlag} enableRedBorder={enableRedBorder && (!details.ReferringConsultant || details.ReferringConsultant === "")}/><br/>
                        {/*<FormDateCtrl label="Date Decision to Refer" onChangeText={onChangeTextHandle} title="DateDecisiontoRefer" value={details && details.DateDecisiontoRefer} dtWidth="320px"/>*/}
                        
                    </div>
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

export default RefererDetails