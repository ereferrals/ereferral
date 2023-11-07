import React, {useEffect, useState} from "react"
import FormTextBoxCtrl from "../FormTextBoxCtrl/FormTextBoxCtrl";
import FormTextAreaCtrl from "../FormTextAreaCtrl/FormTextAreaCtrl";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../DetailsSlice";
import { setReferralSubmissionStep } from "../ReferralSubmissionSlice";
import { setAppStep } from "../AppSlice";
import FormSelectCtrl from "../FormSelectCtrl/FormSelectCtrl";
import { setLeftNavClearLinkText } from "../SharedStringsSlice";
import ModalDialog from "../ModalDialog/ModalDialog";
import FormCheckBoxCtrl from "../FormCheckBoxCtrl/FormCheckBoxCtrl";

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

    useEffect(() => {
        if(details){
            setDisableControls(details.NoNextOfKin)
        }
    },[details.NoNextOfKin])

    const handleNext = () => {
        if(details.NextofKinHomePhoneNumber && details.NextofKinHomePhoneNumber != "" && (details.NextofKinHomePhoneNumber.length != 11)){
            setShowCloseButton(true)
            setModalText("Enter valid Home Phone Number")
            openModal()
            return
        }
        else if(details.NextofKinMobileNumber && details.NextofKinMobileNumber != "" && (details.NextofKinMobileNumber.length != 10)){
            setShowCloseButton(true)
            setModalText("Enter valid Mobile Number")
            openModal()
            return
        }
        dispatch(setReferralSubmissionStep(currentStep + 1))
    }

    const handleBack = () => {
        if(details.NextofKinHomePhoneNumber && details.NextofKinHomePhoneNumber != "" && (details.NextofKinHomePhoneNumber.length != 11)){
            setShowCloseButton(true)
            setModalText("Enter valid Home Phone Number")
            openModal()
            return
        }
        else if(details.NextofKinMobileNumber && details.NextofKinMobileNumber != "" && (details.NextofKinMobileNumber.length != 10)){
            setShowCloseButton(true)
            setModalText("Enter valid Mobile Number")
            openModal()
            return
        }
        dispatch(setReferralSubmissionStep(currentStep - 1))
    }

    const onChangeTextHandle = (title, value) => {
        dispatch(updateDetails({ title, value }));
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
        resetControl("NoNextOfKin",false)
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
                        <FormTextBoxCtrl label="First Name" onChangeText={onChangeTextHandle} title="NextofKinFirstName" value={details && details.NextofKinFirstName} onlyText={true} disableCtrl={disableControls}/><br/>
                        <FormTextBoxCtrl label="Last Name" onChangeText={onChangeTextHandle} title="NextofKinLastName" value={details && details.NextofKinLastName} onlyText={true} disableCtrl={disableControls}/><br/>
                        <FormTextBoxCtrl label="Middle Name (Optional)" onChangeText={onChangeTextHandle} title="NextofKinMiddlename" value={details && details.NextofKinMiddlename} onlyText={true} disableCtrl={disableControls}/><br/>
                        <FormTextBoxCtrl label="Address Line 1" onChangeText={onChangeTextHandle} title="NextofKinAddressLine1" value={details && details.NextofKinAddressLine1} disableCtrl={disableControls}/><br/>
                        <FormTextBoxCtrl label="Address Line 2" onChangeText={onChangeTextHandle} title="NextofKinAddressLine2" value={details && details.NextofKinAddressLine2} disableCtrl={disableControls}/><br/>
                        <FormTextBoxCtrl label="Address Line 3" onChangeText={onChangeTextHandle} title="NextofKinAddressLine3" value={details && details.NextofKinAddressLine3} disableCtrl={disableControls}/><br/>
                        <FormTextBoxCtrl label="Address Line 4" onChangeText={onChangeTextHandle} title="NextofKinAddressLine4" value={details && details.NextofKinAddressLine4} disableCtrl={disableControls}/><br/>
                        <FormTextBoxCtrl label="Post Code" onChangeText={onChangeTextHandle} title="NextofKinPostCode" value={details && details.NextofKinPostCode} disableCtrl={disableControls}/><br/>
                        <FormTextBoxCtrl label="Home Phone Number" onChangeText={onChangeTextHandle} title="NextofKinHomePhoneNumber" value={details && details.NextofKinHomePhoneNumber} maxLengthValue={11} disallowSpaces={true} disableCtrl={disableControls}/><br/>
                        <FormTextBoxCtrl label="Mobile Number" onChangeText={onChangeTextHandle} title="NextofKinMobileNumber" value={details && details.NextofKinMobileNumber} maxLengthValue={10} disallowSpaces={true} disableCtrl={disableControls}/><br/>
                        <FormSelectCtrl label="Relationship to Patient" onChangeText={onChangeTextHandle} title="RelationshiptoPatient" value={details && details.RelationshiptoPatient} options={relationshiptoPatientDataList} disableCtrl={disableControls}/><br/>
                    </div>
                    <div style={{float:'left'}}>
                        
                    </div>
                </div>
            </div>
            {/*<div className="detailsNext">
                <button onClick={handleNext}>Next</button>
                <button onClick={handleBack} style={{marginRight:'10px'}}>Back</button>
            </div>*/}
            <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={showCloseButton}>
                {modalText}
            </ModalDialog>
        </div>
    )
}

export default NextofKinDetails;
