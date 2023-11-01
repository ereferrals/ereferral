import React, { useState, useEffect } from "react"
import FormTextBoxCtrl from "../FormTextBoxCtrl/FormTextBoxCtrl";
import FormTextAreaCtrl from "../FormTextAreaCtrl/FormTextAreaCtrl";
import FormDateCtrl from "../FormDateCtrl/FormDateCtrl";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../DetailsSlice";
import { setReferralSubmissionStep } from "../ReferralSubmissionSlice";
import { setAppStep } from "../AppSlice";
import FormSelectCtrl from "../FormSelectCtrl/FormSelectCtrl";
import { TextBox } from "@react-pdf-viewer/core";
import ModalDialog from "../ModalDialog/ModalDialog";
import { setLeftNavClearLinkText } from "../SharedStringsSlice";

const PatientDetails = () => {
    const dispatch = useDispatch()
    const details = useSelector((state) => state.details)
    const currentStep = useSelector(state => state.referralSubmissionStep)
    const listData = useSelector(state => state.masterData)
    const [maritalStatusList,setMaritalStatusList] = useState([])
    const [religionsList,setReligionsList] = useState([])
    const [ethnicoriginsList,setEthnicoriginsList] = useState([])
    const [covidDataList,setCovidDataList] = useState([])
    const [sexDataList,setSexDataList] = useState([])
    const [specialRequirementsDataList,setSpecialRequirementsDataList] = useState([])
    const [titlesList,setTitlesDataList] = useState([])
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showCloseButton,setShowCloseButton] = useState(true)
    const [modalText, setModalText] = useState("")
    const nhsNumbers = useSelector(state => state.masterData.NHSNumbers)
    
    useEffect(() => {
        dispatch(setLeftNavClearLinkText("Patient"))
        if(listData.MaritalStatuses){
            setMaritalStatusList(listData.MaritalStatuses.map((status) => ({
                label: status.title,
                value: status.title
            })))
        }
        if(listData.Religions){
            setReligionsList(listData.Religions.map((status) => ({
                label: status.title,
                value: status.title
            })))
        }
        if(listData.Ethnicity){
            setEthnicoriginsList(listData.Ethnicity.map((status) => ({
                label: status.title,
                value: status.title
            })))
        }
        if(listData.Covid){
            setCovidDataList(listData.Covid.map((status) => ({
                label: status.title,
                value: status.title
            })))
        }
        if(listData.SpecialRequirements){
            setSpecialRequirementsDataList(listData.SpecialRequirements.map((status) => ({
                label: status.title,
                value: status.title
            })))
        }
        if(listData.SexOptions){
            setSexDataList(listData.SexOptions.map((status) => ({
                label: status.title,
                value: status.title
            })))
        }
        if(listData.Titles){
            setTitlesDataList(listData.Titles.map((status) => ({
                label: status.title,
                value: status.title
            })))
        }
    },[details])


    const handleNext = () => {
        if(details.NHSNumber && details.NHSNumber != "" && (details.NHSNumber.length < 10 || details.NHSNumber.length > 10)){
            setShowCloseButton(true)
            setModalText("Enter valid NHS Number")
            openModal()
            return
        }
        else if(details.HomePhoneNumber && details.HomePhoneNumber != "" && (details.HomePhoneNumber.length != 11)){
            setShowCloseButton(true)
            setModalText("Enter valid Home Phone Number")
            openModal()
            return
        }
        else if(details.MobileNumber && details.MobileNumber != "" && (details.MobileNumber.length != 10)){
            setShowCloseButton(true)
            setModalText("Enter valid Mobile Number")
            openModal()
            return
        }
        else if(details.EmailAddress && details.EmailAddress != "" && !(emailPattern.test(details.EmailAddress))){
            setShowCloseButton(true)
            setModalText("Enter valid email address")
            openModal()
            return
        }
        dispatch(setReferralSubmissionStep(currentStep + 1))
    }

    const handleBack = () => {
        if(details.NHSNumber && details.NHSNumber != "" && (details.NHSNumber.length < 10 || details.NHSNumber.length > 10)){
            setShowCloseButton(true)
            setModalText("Enter valid NHS Number")
            openModal()
            return
        }
        else if(details.HomePhoneNumber && details.HomePhoneNumber != "" && (details.HomePhoneNumber.length != 11)){
            setShowCloseButton(true)
            setModalText("Enter valid Home Phone Number")
            openModal()
            return
        }
        else if(details.MobileNumber && details.MobileNumber != "" && (details.MobileNumber.length != 10)){
            setShowCloseButton(true)
            setModalText("Enter valid Mobile Number")
            openModal()
            return
        }
        else if(details.EmailAddress && details.EmailAddress != "" && !(emailPattern.test(details.EmailAddress))){
            setShowCloseButton(true)
            setModalText("Enter valid email address")
            openModal()
            return
        }
        dispatch(setAppStep(1))
    }

    const onChangeTextHandle = (title, value) => {
        dispatch(updateDetails({ title, value }));
    }

    const resetControl = (title, value) => {
        dispatch(updateDetails({ title, value }));
    }

    const handleReset = () => {
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

    const onBlurTextHandle = (title, value) => {
        if(title == "NHSNumber"){
            const numberExists = nhsNumbers && nhsNumbers.some((nhsNumber) => nhsNumber.title === value);
            if(numberExists)
            {
                value = "Yes"
                setShowCloseButton(true)
                setModalText("As NHS Number already available, no need to upload all reports again.")
                openModal()
            }
            else
            {
                value = "No"
            }
            title = "IsExistingNHSNumber";
            dispatch(updateDetails({title, value}))
        }
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="detailssection">
            <div style={{float:'left'}}>
                <div style={{display:"inline-block",width:"100%"}}>
                    <h3 className="detailsHeader" style={{float:"left"}}>Patient Details</h3>
                    <div className="detailsNext" style={{float:"right"}}>
                        <button onClick={handleNext}>Next</button>
                        <button onClick={handleBack} style={{marginRight:'10px'}}>Back</button>
                    </div>
                </div>
                
                <div style={{display:'inline-block',width:'100%'}}>
                    <div style={{marginRight:'200px',float: 'left'}}>
                        <FormTextBoxCtrl label="NHS Number" onBlurText={onBlurTextHandle} onChangeText={onChangeTextHandle} title="NHSNumber" value={details && details.NHSNumber} maxLengthValue={10} disallowSpaces={true} /><br/>
                        <FormTextBoxCtrl label="Last Name" onChangeText={onChangeTextHandle} title="Surname" value={details && details.Surname} onlyText={true}/><br/>
                        <FormTextBoxCtrl label="First Name" onChangeText={onChangeTextHandle} title="FirstName" value={details && details.FirstName} onlyText={true}/><br/>
                        <FormTextBoxCtrl label="Middle Name (Optional)" onChangeText={onChangeTextHandle} title="MiddleName" value={details && details.MiddleName} onlyText={true}/><br/>
                        <FormSelectCtrl label="Title" onChangeText={onChangeTextHandle} title="Title" value={details && details.Title} options={titlesList}/><br/>
                        <FormDateCtrl label="Date of Birth" onChangeText={onChangeTextHandle} title="DateofBirth" value={details && details.DateofBirth} dtWidth="320px"/><br/>
                        <FormSelectCtrl label="Sex" onChangeText={onChangeTextHandle} title="Sex" value={details && details.Sex} options={sexDataList}/><br/>
                        <FormSelectCtrl label="Marital Status" onChangeText={onChangeTextHandle} title="MaritalStatus" value={details && details.MaritalStatus} options={maritalStatusList}/><br/>
                        <FormSelectCtrl label="Ethnicity" onChangeText={onChangeTextHandle} title="Ethnicorigin" value={details && details.Ethnicorigin} options={ethnicoriginsList}/><br/>
                        <FormSelectCtrl label="Religion" onChangeText={onChangeTextHandle} title="Religion" value={details && details.Religion} options={religionsList}/><br/>
                        <FormSelectCtrl label="Special Requirements" onChangeText={onChangeTextHandle} title="SpecialRequirements" value={details && details.SpecialRequirements} options={specialRequirementsDataList}/><br/>
                    </div>
                    <div style={{float:'left'}}>
                        <FormTextBoxCtrl label="Address Line 1" onChangeText={onChangeTextHandle} title="AddressLine1" value={details && details.AddressLine1}/><br/>
                        <FormTextBoxCtrl label="Address Line 2" onChangeText={onChangeTextHandle} title="AddressLine2" value={details && details.AddressLine2}/><br/>
                        <FormTextBoxCtrl label="Address Line 3" onChangeText={onChangeTextHandle} title="AddressLine3" value={details && details.AddressLine3}/><br/>
                        <FormTextBoxCtrl label="Address Line 4" onChangeText={onChangeTextHandle} title="AddressLine4" value={details && details.AddressLine4}/><br/>
                        <FormTextBoxCtrl label="Post Code" onChangeText={onChangeTextHandle} title="PostCode" value={details && details.PostCode}/><br/>
                        <FormTextBoxCtrl label="Home Phone Number" onChangeText={onChangeTextHandle} title="HomePhoneNumber" value={details && details.HomePhoneNumber} maxLengthValue={11} disallowSpaces={true}/><br/>
                        <FormTextBoxCtrl label="Mobile Number" onChangeText={onChangeTextHandle} title="MobileNumber" value={details && details.MobileNumber} maxLengthValue={10} disallowSpaces={true}/><br/>
                        <FormTextBoxCtrl label="Email Address (Optional)" onChangeText={onChangeTextHandle} title="EmailAddress" value={details && details.EmailAddress}/><br/>
                    </div>
                </div>
            </div>
            
            
            <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={showCloseButton}>
                {modalText}
            </ModalDialog>
        </div>
    )
}

export default PatientDetails;
