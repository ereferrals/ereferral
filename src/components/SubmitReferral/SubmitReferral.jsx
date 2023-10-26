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
    
    const onSubmitHandle = async () =>{
        openModal();
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
        //onNext();
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

    return(
        <div className="container-submit">
            <div style={{display: 'inline-block',width:'100%'}}>
                <h3 className="detailsHeader" style={{float:'left'}}>Submit Referral</h3>
                <button onClick={handleBack} className="buttonCtrl" style={{float:'right'}}>Back</button>
            </div>
            <p>Delcaration to be Agreed.</p>
            <p>Thank you for making the referral today. Please note this will be reviewed by a Clatterbridge consultant and you
                will be notified if the referral has been accepted.
            </p>
            <div style={{textAlign:"center", marginTop:'40px'}}><ButtonCtrl btnClickHandler={onSubmitHandle} btnText="Submit" /></div>
            <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={false}>
                <p>Submitting data... please wait.</p>
            </ModalDialog>
        </div>
    )
}

export default SubmitReferral