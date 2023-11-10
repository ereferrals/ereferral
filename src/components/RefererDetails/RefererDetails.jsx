import React,{useState,useEffect, useRef} from "react"
import FormTextBoxCtrl from "../FormTextBoxCtrl/FormTextBoxCtrl";
import FormTextAreaCtrl from "../FormTextAreaCtrl/FormTextAreaCtrl";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../DetailsSlice";
import { setReferralSubmissionStep } from "../ReferralSubmissionSlice";
import FormSelectCtrl from "../FormSelectCtrl/FormSelectCtrl";
import { setLeftNavClearLinkText } from "../SharedStringsSlice";
import ModalDialog from "../ModalDialog/ModalDialog";

const RefererDetails = () => {
    const dispatch = useDispatch();
    const details = useSelector(state => state.details)
    const currentStep = useSelector(state => state.referralSubmissionStep)
    const listData = useSelector(state => state.masterData)
    const [referringOrgsList,setReferringOrgsList] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalText, setModalText] = useState("")

    const prevLeftNavClearText = useRef(state => state.leftNavClearLinkText)

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
        var errorMsg = "<div style='max-height:500px;overflow-y:auto;width:400px'><b>You must ensure you complete all the below mandatory fields to continue:</b><br/><br/>"
        const referMandatoryFields = ['GPName', 'GPPractice', 'GPPracticeAddress', 'ReferringOrganisation', 'ReferringConsultant']
        
        const referMFDN = {}
        referMFDN["GPName"] = "GP Name"
        referMFDN["GPPractice"] = "GP Practice"
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
            return true
        }
        return false
    }

    const handleNext = () => {
        if (checkFieldsValidation()){
            openModal()
            return
        }
        dispatch(setReferralSubmissionStep(currentStep + 1))
    }

    const handleBack = () => {
        if (checkFieldsValidation()){
            openModal()
            return
        }
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
                        <FormTextBoxCtrl label="Specified GP" onChangeText={onChangeTextHandle} title="GPName" value={details && details.GPName} onlyText={true} isMandatory={true}/><br/>
                        <FormTextBoxCtrl label="GP Practice Name" onChangeText={onChangeTextHandle} title="GPPractice" value={details && details.GPPractice} onlyText={true} isMandatory={true}/><br/>
                        <FormTextAreaCtrl label="GP Practice Address" onChangeText={onChangeTextHandle} title="GPPracticeAddress" value={details && details.GPPracticeAddress} ctrlWidth="322px" isMandatory={true}/>
                    </div>
                    <div style={{float:'left'}}>
                        <FormSelectCtrl label="Referring Organisation" onChangeText={onChangeTextHandle} title="ReferringOrganisation" value={details && details.ReferringOrganisation} options={referringOrgsList} isMandatory={true}/><br/>
                        {/*<FormTextBoxCtrl label="Referring Organisation" onChangeText={onChangeTextHandle} title="ReferringOrganisation" value={details && details.ReferringOrganisation}/><br/>*/}
                        <FormTextBoxCtrl label="Referring Consultant" onChangeText={onChangeTextHandle} title="ReferringConsultant" value={details && details.ReferringConsultant} onlyText={true} isMandatory={true}/><br/>
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