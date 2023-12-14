import React, {useEffect, useRef, useState} from "react"
import FormTextBoxCtrl from "../FormTextBoxCtrl/FormTextBoxCtrl";
import FormTextAreaCtrl from "../FormTextAreaCtrl/FormTextAreaCtrl";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../DetailsSlice";
import { setReferralSubmissionStep } from "../ReferralSubmissionSlice";
import { setAppStep } from "../AppSlice";
import FormSelectCtrl from "../FormSelectCtrl/FormSelectCtrl";
import { setLeftNavClearLinkText, setNOKMandatory } from "../SharedStringsSlice";
import ModalDialog from "../ModalDialog/ModalDialog";
import FormCheckBoxCtrl from "../FormCheckBoxCtrl/FormCheckBoxCtrl";
import { warning_MandatoryText } from "../Config";

const NextofKinDetails = () => {
    const dispatch = useDispatch()
    const details = useSelector((state) => state.details)
    const currentStep = useSelector(state => state.referralSubmissionStep)
    const [relationshiptoPatientDataList,setRelationshiptoPatientDataList] = useState([])
    const listData = useSelector(state => state.masterData)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showCloseButton,setShowCloseButton] = useState(true)
    const [modalText, setModalText] = useState("")
    const [disableControls, setDisableControls] = useState(false)
    const [isConfirmation, setIsConfirmation] = useState(false)
    const [confirmationBtnText, setConfirmationBtnText] = useState("")
    const prevNoNOKValue = useRef(details.NoNextOfKin)
    //const [enableRedBorder, setEnableRedBorder] = useState(false)
    const enableRedBorder = useSelector(state => state.sharedStrings.enableNOKMandatory)
    //const mandatoryFlag = useSelector(state => !state.details.IsExistingNHSNumber)
    const mandatoryFlag = useSelector(state => state.details.IsExistingNHSNumber === 'Yes' ? false : true)

    useEffect(() => {
        if(details){
            if(prevNoNOKValue.current != details.NoNextOfKin && details.NoNextOfKin && 
                ((details.NextofKinFirstName && details.NextofKinFirstName != "") || 
                (details.NextofKinLastName && details.NextofKinLastName != "") || 
                (details.NextofKinMiddlename && details.NextofKinMiddlename != "") ||  
                (details.NextofKinAddressLine1 && details.NextofKinAddressLine1 != "") || 
                (details.NextofKinAddressLine2 && details.NextofKinAddressLine2 != "") || 
                (details.NextofKinAddressLine3 && details.NextofKinAddressLine3 != "") ||  
                (details.NextofKinAddressLine4 && details.NextofKinAddressLine4 != "") || 
                (details.NextofKinPostCode && details.NextofKinPostCode != "") || 
                (details.NextofKinHomePhoneNumber && details.NextofKinHomePhoneNumber != "") ||  
                (details.NextofKinMobileNumber && details.NextofKinMobileNumber != "") || 
                (details.RelationshiptoPatient && details.RelationshiptoPatient != ""))){
                setIsConfirmation(true)
                setShowCloseButton(false)
                setModalText("If you proceed, data you have entered will be cleared")
                setConfirmationBtnText("Ok")
                openModal()
            }
            prevNoNOKValue.current = details.NoNextOfKin
            setDisableControls(details.NoNextOfKin)
        }
    },[details.NoNextOfKin])

    const checkFieldsValidation = () => {
        //var errorMsg = "<div style='max-height:500px;overflow-y:auto;width:400px'><b style='line-height:28px'>You must ensure you complete all the below mandatory fields to continue:</b><br/><br/>"
        var errorMsg = `<div style='max-height:500px;overflow-y:auto;width:400px;'><b style='line-height:28px'>${warning_MandatoryText}</b><br/><br/>`
        const nextofKinMandatoryFields = ['NextofKinFirstName', 'NextofKinLastName', 'NextofKinAddressLine1',
                            'NextofKinAddressLine2', /*'NextofKinAddressLine3', 'NextofKinAddressLine4', */'NextofKinPostCode',
                            'NextofKinMobileNumber' ]

        const nextofKinMFDN = {}
        nextofKinMFDN["NextofKinFirstName"] = "First Name"
        nextofKinMFDN["NextofKinLastName"] = "Last Name"
        nextofKinMFDN["NextofKinAddressLine1"] = "Address Line 1"
        nextofKinMFDN["NextofKinAddressLine2"] = "Address Line 2"
        nextofKinMFDN["NextofKinAddressLine3"] = "Address Line 3"
        nextofKinMFDN["NextofKinAddressLine4"] = "Address Line 4"
        nextofKinMFDN["NextofKinPostCode"] = "Post Code"
        nextofKinMFDN["NextofKinHomePhoneNumber"] = "Home Phone Number"
        nextofKinMFDN["NextofKinMobileNumber"] = "Mobile Number"
        nextofKinMFDN["RelationshiptoPatient"] = "Relationship to Patient"
        var emptyFields = []

        if(!details["NoNextOfKin"]){
            for (const fieldName of nextofKinMandatoryFields) {
                if (!details.hasOwnProperty(fieldName) || details[fieldName] === "") {
                    emptyFields.push(nextofKinMFDN[fieldName])
                }
            }
        }

        if (emptyFields.length > 0) {
            errorMsg = errorMsg + `<div style='text-align:left;line-height:28px'><ul>${emptyFields.map(field => `<li>${field}</li>`).join('')}</ul></div>`;
            setModalText(errorMsg)
            //setEnableRedBorder(true)
            //setNOKMandatory(true)
            const title = "enableNOKMandatory"
            const value = true
            dispatch(setNOKMandatory({title, value}))
            return true
        }
        else if(details.NextofKinHomePhoneNumber && details.NextofKinHomePhoneNumber != "" && (details.NextofKinHomePhoneNumber.length != 11)){
            setModalText("Enter valid Home Phone Number")
            return true
        }
        else if(details.NextofKinMobileNumber && details.NextofKinMobileNumber != "" && (details.NextofKinMobileNumber.length != 11)){
            setModalText("Enter valid Mobile Number")
            return true
        }
    }
    const handleNext = () => {
        setIsConfirmation(false)
        if (details && details.IsExistingNHSNumber != "Yes" && checkFieldsValidation()){
            setShowCloseButton(true)
            openModal()
            return
        }
        dispatch(setReferralSubmissionStep(currentStep + 1))
    }

    const handleBack = () => {
        /*if (checkFieldsValidation()){
            setShowCloseButton(true)
            openModal()
            return
        }*/
        dispatch(setReferralSubmissionStep(currentStep - 1))
    }

    const onChangeTextHandle = (title, value) => {
        dispatch(updateDetails({ title, value }))
    }
    const handleConfirmation = async (isConfirmed) => {
        if(isConfirmed){
            setIsConfirmation(false)
            handleReset()
        }
        closeModal();
    }
    useEffect(() => {
        dispatch(setLeftNavClearLinkText("Next of Kin"))

        if(listData.RelationshiptoPatient){
            setRelationshiptoPatientDataList(listData.RelationshiptoPatient.map((status) => ({
                label: status.title,
                value: status.title
            })))
        }
    },[])

    const resetControl = (title, value) => {
        dispatch(updateDetails({ title, value }));
    }

    const handleReset = () => {
        //resetControl("NoNextOfKin",false)
        resetControl("NextofKinFirstName","")
        resetControl("NextofKinLastName","")
        resetControl("NextofKinMiddlename","")
        resetControl("NextofKinAddressLine1","")
        resetControl("NextofKinAddressLine2","")
        resetControl("NextofKinAddressLine3","")
        resetControl("NextofKinAddressLine4","")
        resetControl("NextofKinPostCode","")

        resetControl("NextofKinHomePhoneNumber","")
        resetControl("NextofKinMobileNumber","")
        resetControl("RelationshiptoPatient","")
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="detailssection">
            <div style={{float:'left',width:"100%"}}>
                <div style={{display:"inline-block",width:"100%"}}>
                    <h3 className="detailsHeader" style={{float:"left"}}>Next of Kin Details</h3>
                    <div className="detailsNext" style={{float:"right"}}>
                        <button onClick={handleNext}>Next</button>
                        <button onClick={handleBack} style={{marginRight:'10px'}}>Back</button>
                    </div>
                </div>
                <div style={{display:'inline-block',width:'100%'}}>
                    <div style={{marginRight:'200px',float: 'left'}}>
                        <FormCheckBoxCtrl label="No Next of Kin" onChangeText={onChangeTextHandle} title="NoNextOfKin" value={details && details.NoNextOfKin} /><br/>
                        <FormTextBoxCtrl label="First Name" onChangeText={onChangeTextHandle} title="NextofKinFirstName" value={details && details.NextofKinFirstName} onlyText={true} disableCtrl={disableControls} isMandatory={mandatoryFlag} enableRedBorder={!disableControls && enableRedBorder && (!details.NextofKinFirstName || details.NextofKinFirstName === "")}/><br/>
                        <FormTextBoxCtrl label="Last Name" onChangeText={onChangeTextHandle} title="NextofKinLastName" value={details && details.NextofKinLastName} onlyText={true} disableCtrl={disableControls} isMandatory={mandatoryFlag} enableRedBorder={!disableControls && enableRedBorder && (!details.NextofKinLastName || details.NextofKinLastName === "")}/><br/>
                        <FormTextBoxCtrl label="Middle Name" onChangeText={onChangeTextHandle} title="NextofKinMiddlename" value={details && details.NextofKinMiddlename} onlyText={true} disableCtrl={disableControls}/><br/>
                        <FormTextBoxCtrl label="Address Line 1" onChangeText={onChangeTextHandle} title="NextofKinAddressLine1" value={details && details.NextofKinAddressLine1} disableCtrl={disableControls} isMandatory={mandatoryFlag} enableRedBorder={!disableControls && enableRedBorder && (!details.NextofKinAddressLine1 || details.NextofKinAddressLine1 === "")}/><br/>
                        <FormTextBoxCtrl label="Address Line 2" onChangeText={onChangeTextHandle} title="NextofKinAddressLine2" value={details && details.NextofKinAddressLine2} disableCtrl={disableControls} isMandatory={mandatoryFlag} enableRedBorder={!disableControls && enableRedBorder && (!details.NextofKinAddressLine2 || details.NextofKinAddressLine2 === "")}/><br/>
                        <FormTextBoxCtrl label="Address Line 3" onChangeText={onChangeTextHandle} title="NextofKinAddressLine3" value={details && details.NextofKinAddressLine3} disableCtrl={disableControls} enableRedBorder={!disableControls && enableRedBorder && (!details.NextofKinAddressLine3 || details.NextofKinAddressLine3 === "")}/><br/>
                        <FormTextBoxCtrl label="Address Line 4" onChangeText={onChangeTextHandle} title="NextofKinAddressLine4" value={details && details.NextofKinAddressLine4} disableCtrl={disableControls} enableRedBorder={!disableControls && enableRedBorder && (!details.NextofKinAddressLine4 || details.NextofKinAddressLine4 === "")}/><br/>
                        <FormTextBoxCtrl label="Post Code" onChangeText={onChangeTextHandle} title="NextofKinPostCode" value={details && details.NextofKinPostCode} disableCtrl={disableControls} isMandatory={mandatoryFlag} enableRedBorder={!disableControls && enableRedBorder && (!details.NextofKinPostCode || details.NextofKinPostCode === "")}/><br/>
                        
                    </div>
                    <div style={{float:'left'}}>
                        <FormTextBoxCtrl label="Primary Contact Number" onChangeText={onChangeTextHandle} title="NextofKinMobileNumber" value={details && details.NextofKinMobileNumber} maxLengthValue={11} disallowSpaces={true} disableCtrl={disableControls} isMandatory={mandatoryFlag} enableRedBorder={!disableControls && enableRedBorder && (!details.NextofKinMobileNumber || details.NextofKinMobileNumber === "")}/><br/>
                        <FormTextBoxCtrl label="Mobile / Home Number (if not listed above)" onChangeText={onChangeTextHandle} title="NextofKinHomePhoneNumber" value={details && details.NextofKinHomePhoneNumber} maxLengthValue={11} disallowSpaces={true} disableCtrl={disableControls}/><br/>
                        <FormSelectCtrl label="Relationship to Patient" onChangeText={onChangeTextHandle} title="RelationshiptoPatient" value={details && details.RelationshiptoPatient} options={relationshiptoPatientDataList} disableCtrl={disableControls}/><br/>
                    </div>
                </div>
            </div>
            {/*<div className="detailsNext">
                <button onClick={handleNext}>Next</button>
                <button onClick={handleBack} style={{marginRight:'10px'}}>Back</button>
            </div>*/}
            <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={showCloseButton} 
            isConfirmation={isConfirmation} confirmationFn={handleConfirmation} confirmationBtnText={confirmationBtnText} isHtmlContent={true}>
                {modalText}
            </ModalDialog>
        </div>
    )
}

export default NextofKinDetails;
