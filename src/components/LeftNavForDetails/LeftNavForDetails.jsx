import React, { useEffect, useState } from "react"
import "./LeftNavForDetails.css"
import { useDispatch, useSelector } from "react-redux"
import { setReferralSubmissionStep } from "../ReferralSubmissionSlice"
import { updateDetails } from "../DetailsSlice"
import ModalDialog from "../ModalDialog/ModalDialog"
import { setLeftNavClearLinkText, setNOKMandatory, setPatientMandatory, setReferMandatory, setTTCMandatory } from "../SharedStringsSlice"
import {warning_ValidEmailText,warning_MandatoryText} from "../Config.js"

const LeftNavForDetails = () => {
    const dispatch = useDispatch()
    const [currentStep,setCurrentStep] = useState(0)//"Patient")
    const leftNavStep = useSelector(stage => stage.referralSubmissionStep)
    const details = useSelector(state => state.details)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showCloseButton,setShowCloseButton] = useState(true)
    const [modalText, setModalText] = useState("")
    const [isConfirmation, setIsConfirmation] = useState(true)
    const [confirmationBtnText, setConfirmationBtnText] = useState("")
    const sharedStrings = useSelector(state => state.sharedStrings)
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    const checkPatientDetailsFieldsValidation = () => {
        //var errorMsg = "<div style='max-height:500px;overflow-y:auto;width:400px'><b style='line-height:28px'>You must ensure you complete all the below mandatory fields to continue:</b><br/><br/>"
        var errorMsg = `<div style='max-height:500px;overflow-y:auto;width:400px;'><b style='line-height:28px'>${warning_MandatoryText}</b><br/><br/>`
        const patientMandatoryFields = ['Surname','FirstName','DateofBirth','HomePhoneNumber']

        const patientMFDN = {}
        patientMFDN["Surname"] = "Surname"
        patientMFDN["FirstName"] = "First Name"
        patientMFDN["DateofBirth"] = "Date of Birth"
        patientMFDN["HomePhoneNumber"] = "Primary Contact Number"
        var emptyFields = []

        for (const fieldName of patientMandatoryFields) {
            if (!details.hasOwnProperty(fieldName) || details[fieldName] === "") {
                emptyFields.push(patientMFDN[fieldName])
            }
        }

        if(details.OverseasPatient == 'No'){
            if(!details.NHSNumber || details.NHSNumber == ""){
                emptyFields.push("NHS Number")
            } 
        }
        
        if (emptyFields.length > 0) {
            errorMsg = errorMsg + `<div style='text-align:left;line-height:28px'><ul>${emptyFields.map(field => `<li>${field}</li>`).join('')}</ul></div>`;
            setModalText(errorMsg)
            return true
        }
        else if(details.NHSNumber && details.NHSNumber != "" && (details.NHSNumber.length < 10 || details.NHSNumber.length > 10)){
            setModalText("Enter valid NHS Number")
            return true
        }
        else if(details.HomePhoneNumber && details.HomePhoneNumber != "" && (details.HomePhoneNumber.length != 11)){
            setModalText("Enter valid Primary Contact Number")
            return true
        }
        else if(details.MobileNumber && details.MobileNumber != "" && (details.MobileNumber.length != 11)){
            setModalText("Enter valid Mobile / Home Number")
            return true
        }
        else if(details.EmailAddress && details.EmailAddress != "" && !(emailPattern.test(details.EmailAddress))){
            setModalText(warning_ValidEmailText)
            return true
        }
        return false
    }
    const checkNOKDetailsFieldsValidation = () => {
        //var errorMsg = "<div style='max-height:500px;overflow-y:auto;width:400px'><b style='line-height:28px'>You must ensure you complete all the below mandatory fields to continue:</b><br/><br/>"
        var errorMsg = `<div style='max-height:500px;overflow-y:auto;width:400px;'><b style='line-height:28px'>${warning_MandatoryText}</b><br/><br/>`
        const nextofKinMandatoryFields = ['NextofKinFirstName', 'NextofKinLastName', 'NextofKinAddressLine1',
                            'NextofKinAddressLine2', 'NextofKinAddressLine3', 'NextofKinAddressLine4', 'NextofKinPostCode',
                            'NextofKinMobileNumber' ]

        const nextofKinMFDN = {}
        nextofKinMFDN["NextofKinFirstName"] = "First Name"
        nextofKinMFDN["NextofKinLastName"] = "Last Name"
        nextofKinMFDN["NextofKinAddressLine1"] = "Address Line1"
        nextofKinMFDN["NextofKinAddressLine2"] = "Address Line2"
        nextofKinMFDN["NextofKinAddressLine3"] = "Address Line3"
        nextofKinMFDN["NextofKinAddressLine4"] = "Address Line4"
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
        return false
    }
    const checkReferDetailsFieldsValidation = () => {
        //return false//checkonce
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
            return true
        }
        return false
    }

    const checkTTCFieldsValidation = () => {
        //return false//checkonce
        //var errorMsg = "<div style='max-height:500px;overflow-y:auto;width:400px'><b style='line-height:28px'>You must ensure you complete all the below mandatory fields to continue:</b><br/><br/>"
        var errorMsg = `<div style='max-height:500px;overflow-y:auto;width:400px;'><b style='line-height:28px'>${warning_MandatoryText}</b><br/><br/>`
        let treatmentMandatoryFields = [ 'MedicalOncologistCCCConsultant', 'ClinicalOncologistCCCConsultant', 
        'IsthisaTargetPatient' ]
        
        const treatmentMFDN = {}
        treatmentMFDN["MedicalOncologistCCCConsultant"] = "Medical Oncologist CCC Consultant"
        treatmentMFDN["ClinicalOncologistCCCConsultant"] = "Clinical Oncologist CCC Consultant"
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
            return true
        }
        return false
    }

    const handleGoToStep = (step) => {
        setIsConfirmation(false)
        if(details && details.IsExistingNHSNumber != "Yes"){
            if(sharedStrings.leftNavClearLinkText === "Patient"){
                if (step != 0 && checkPatientDetailsFieldsValidation()){
                    const title = "enablePatientMandatory"
                    const value = true
                    dispatch(setPatientMandatory({title, value}))
                    setShowCloseButton(true)
                    openModal()
                    return
                }
                else if(step != 0 && step != 1 && !details.NoNextOfKin){
                    setModalText("Please fill in Next of Kin Details.")
                    openModal()
                    return
                }
                else if((step === 3 || step === 4) && checkReferDetailsFieldsValidation()){
                    setModalText("Please fill in Refer Details.")
                    openModal()
                    return
                }
                else if((step === 4) && checkTTCFieldsValidation()){
                    setModalText("Please fill in Treatment & Target Category Details.")
                    openModal()
                    return
                }
            }
            if(sharedStrings.leftNavClearLinkText === "Next of Kin"){
                if ((step != 0 && step != 1) && checkNOKDetailsFieldsValidation()){
                    const title = "enableNOKMandatory"
                    const value = true
                    dispatch(setNOKMandatory({title, value}))
                    setShowCloseButton(true)
                    openModal()
                    return
                }
                else if((step === 3 || step === 4) && checkReferDetailsFieldsValidation()){
                    setModalText("Please fill in Refer Details.")
                    openModal()
                    return
                }
                else if((step === 4) && checkTTCFieldsValidation()){
                    setModalText("Please fill in Treatment & Target Category Details.")
                    openModal()
                    return
                }
            }
            if(sharedStrings.leftNavClearLinkText === "Refer"){
                if ((step === 3 || step === 4) && checkReferDetailsFieldsValidation()){
                    const title = "enableReferMandatory"
                    const value = true
                    dispatch(setReferMandatory({title, value}))
                    setShowCloseButton(true)
                    openModal()
                    return
                }
                else if(step === 4 && checkTTCFieldsValidation()){
                    setModalText("Please fill in Treatment & Target Category Details.")
                    openModal()
                    return
                }
            }
            if(sharedStrings.leftNavClearLinkText === "Treatment & Target Category"){
                if (step === 4 && checkTTCFieldsValidation()){
                    const title = "enableTTCMandatory"
                    const value = true
                    dispatch(setTTCMandatory({title, value}))
                    setShowCloseButton(true)
                    openModal()
                    return
                }
            }
        }

        if(step == 0)
            dispatch(setLeftNavClearLinkText("Patient"))
        else if(step == 1)
            dispatch(setLeftNavClearLinkText("Next of Kin"))
        else if(step == 2)
            dispatch(setLeftNavClearLinkText("Refer"))
        else if(step == 3)
            dispatch(setLeftNavClearLinkText("Treatment & Target Category"))
        else if(step == 4)
            dispatch(setLeftNavClearLinkText("Reports"))
        dispatch(setReferralSubmissionStep(step))
        setCurrentStep(step)
    }

    const handleClearDetails = () => {
        if(leftNavStep != 4){
            setShowCloseButton(false)
            setIsConfirmation(true)
            setConfirmationBtnText("Yes")
            setModalText("Do you want to clear " + sharedStrings.leftNavClearLinkText + " details?")
            openModal()
        }
    }

    const handleConfirmation = async (isConfirmed) => {
        if(isConfirmed){
            if(leftNavStep == 0)
                resetPatientDetails()
            else if(leftNavStep == 1)
                resetNextOfKinDetails()
            else if(leftNavStep == 2)
                resetReferDetails()
            else if(leftNavStep == 3)
                resetTreatmentDetails()
        }
        closeModal()
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const resetControl = (title, value) => {
        dispatch(updateDetails({ title, value }));
    }

    const resetTreatmentDetails = () => {
        resetControl("MedicalOncologistCCCConsultant","")
        resetControl("ClinicalOncologistCCCConsultant","")
        resetControl("PrimaryDiagnosis","")
        resetControl("IsthisaTargetPatient","")
        resetControl("TargetCategory","")
    }

    const resetReferDetails = () => {
        resetControl("GPName","")
        resetControl("GPPractice","")
        resetControl("GPPracticeAddress","")

        resetControl("ReferringOrganisation","")
        resetControl("ReferringConsultant","")
        resetControl("DateDecisiontoRefer","")
    }

    const resetNextOfKinDetails = () => {
        resetControl("NoNextOfKin", false)
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

    const resetPatientDetails = () => {
        resetControl("NHSNumber","")
        resetControl("Surname","")
        resetControl("FirstName","")
        resetControl("MiddleName","")
        resetControl("Title","")
        resetControl("DateofBirth","")
        resetControl("Sex","")
        resetControl("MaritalStatus","")
        resetControl("Ethnicorigin","")
        resetControl("Religion","")
        resetControl("SpecialRequirements","")

        resetControl("AddressLine1","")
        resetControl("AddressLine2","")
        resetControl("AddressLine3","")
        resetControl("AddressLine4","")
        resetControl("PostCode","")
        resetControl("HomePhoneNumber","")
        resetControl("MobileNumber","")
        resetControl("EmailAddress","")
    }

    return(
        <>
        <div className="leftnav">
            <button onClick={() => handleGoToStep (0)} className={`${leftNavStep === 0 ? 'active' : ''}`}>Patient Details</button><br/>
            <button onClick={() => handleGoToStep (1)} className={`${leftNavStep === 1 ? 'active' : ''}`}>Next of Kin Details</button><br/>
            <button onClick={() => handleGoToStep (2)} className={`${leftNavStep === 2 ? 'active' : ''}`}>Refer Details</button><br/>
            <button onClick={() => handleGoToStep (3)} className={`${leftNavStep === 3 ? 'active' : ''}`}>Treatment & Target Category</button><br/>
            {/*<button onClick={() => handleGoToStep (3)}>MDT Details</button><br/>*/}
            <button style={{display:"block"}} onClick={() => handleGoToStep (4)} className={`${leftNavStep === 4 ? 'active' : ''}`}>Reports</button>

            {leftNavStep != 4 && <><hr style={{width:"200px",float:"left",height:"1px",background:"black",marginBottom: "15px"}}/>
            <button style={{textAlign:"left",lineHeight:"28px"}} onClick={() => handleClearDetails()}>Clear {sharedStrings.leftNavClearLinkText} Details</button></>}

        </div>

            <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={showCloseButton} 
            isConfirmation={isConfirmation} confirmationFn={handleConfirmation} confirmationBtnText={confirmationBtnText} isHtmlContent={true}>
            {modalText}
            </ModalDialog></>
    )
}

export default LeftNavForDetails