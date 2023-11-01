import React,{useState,useEffect, cloneElement} from "react"
import ModalDialog from "../ModalDialog/ModalDialog";
import { saveData, uploadFileToLib } from "../../Services/api";
import "./SubmitReferral.css"
import ButtonCtrl from "../ButtonCtrl/ButtonCtrl";
import { useDispatch, useSelector } from "react-redux";
import { setReferralSubmissionStep } from "../ReferralSubmissionSlice";
import { updateDetails } from "../DetailsSlice";

const SubmitReferral = () => {
    const dispatch = useDispatch()
    const details = useSelector(state => state.details)
    const reports = useSelector(state => state.reports.files)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const currentStep = useSelector(state => state.referralSubmissionStep)
    const email = useSelector(state => state.email)
    const [isConfirmation, setIsConfirmation] = useState(true)
    const [confirmationBtnText, setConfirmationBtnText] = useState("")
    const [modalText, setModalText] = useState("")
    const [showCloseButton,setShowCloseButton] = useState(true)

    const onSubmitHandle = async () =>{
        if(!navigator.onLine){
            setModalText("Submission is not possible because there is no internet connection.")
            setIsConfirmation(false)
            setShowCloseButton(true)
            openModal()
            return
        }
        setModalText("Are you sure you want to submit this referral?")
        setIsConfirmation(true)
        setShowCloseButton(false)
        setConfirmationBtnText("Yes")
        openModal()
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleBack = () => {
        dispatch(setReferralSubmissionStep(currentStep-1))
    }
    const handleConfirmation = async (isConfirmed) => {
        if(isConfirmed){
            setIsConfirmation(false)
            setShowCloseButton(false)
            setModalText("Submitting Data... Please wait.")
            var itemId = await saveData(details);
            console.log(itemId);
            var reportsMetadata = {};
            for(var i=0;i < reports.length;i++){
                if(!reportsMetadata.hasOwnProperty(reports[i].name))
                {
                    reportsMetadata[reports[i].ReportFile.name] = {};
                }
                reportsMetadata[reports[i].ReportFile.name].ReferralID=itemId;
                reportsMetadata[reports[i].ReportFile.name].Report=reports[i].ReportName;
                reportsMetadata[reports[i].ReportFile.name].ReportOrder=reports[i].ReportOrder;
            }
            
            const uploadPromises = reports.map((report) => {
            return uploadFileToLib(report.ReportFile, reportsMetadata[report.ReportFile.name]);
            });
        
            await Promise.all(uploadPromises);
            closeModal();
            dispatch(setReferralSubmissionStep(currentStep + 1))
        }
        closeModal();
      }

    return(
        <div className="container-submit">
            <div style={{display: 'inline-block',width:'100%'}}>
                <h3 className="detailsHeader" style={{float:'left'}}>Submit Referral</h3>
                <button onClick={handleBack} className="buttonCtrl" style={{float:'right'}}>Back</button>
            </div>
            <p>Declaration to be Agreed.</p>
            <p>Press <b><i>Submit</i></b> to send your referral. Press <b><i>Back</i></b> if you need to change any of the details.
            </p>
            <div style={{textAlign:"center", marginTop:'40px'}}><ButtonCtrl btnClickHandler={onSubmitHandle} btnText="Submit" /></div>
            <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={showCloseButton} 
            isConfirmation={isConfirmation} confirmationFn={handleConfirmation} confirmationBtnText={confirmationBtnText}>
                {modalText}
            </ModalDialog>
        </div>
    )
}

export default SubmitReferral