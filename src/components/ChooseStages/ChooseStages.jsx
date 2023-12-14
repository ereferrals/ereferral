import React, {useEffect, useState} from "react"
import "./ChooseStages.css"
import ButtonCtrl from "../ButtonCtrl/ButtonCtrl";
import { getReferralTypeStages, sendEmail } from "../../Services/api";
import ModalDialog from "../ModalDialog/ModalDialog";
import { useDispatch,useSelector } from "react-redux";
import { setStage, setStagesList } from "./StagesSlice";
import { updateDetails } from "../DetailsSlice";
import { setReferralTypeStageStep } from "../ReferralTypeSlice";
import { setAppStep } from "../AppSlice";
import { updateFiles, updateReportsList } from "../Reports/ReportsSlice";
import { setReferralSubmissionStep } from "../ReferralSubmissionSlice";
import { warning_SelectStageText } from "../Config.js"

const ChooseStages = () => {
    const dispatch = useDispatch();
    const selectedReferralType = useSelector((state) => state.referralType)
    const selectedStage = useSelector(state => state.stage.currentStage)
    const reportslist = useSelector(state => state.reports.reportsList)
    
    const refTypeStageStep = useSelector(state => state.referralTypeStageStep)
    const stagesMasterData = useSelector(state => state.stage.stagesData)
    const [stages, setStages] = useState([])
    const userEmail = useSelector(state => state.email)
    const accessToken = useSelector(state => state.accessToken)
    const [isConfirmation, setIsConfirmation] = useState(true)
    const [confirmationBtnText, setConfirmationBtnText] = useState("")

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showCloseButton,setShowCloseButton] = useState(true);
    const [modalText, setModalText] = useState("");

    const handleStageClick = (stage) => {
        dispatch(setStage(stage))
        let title = "ReferralTypeStage"
        let value = stage.stage
        dispatch(updateDetails({title, value}));
        dispatch(setStage(stage))
        let reportIndex = 0;
        const filteredReports = stage.reports.map(report => {
            const matchingStage = stagesMasterData.find(stageItem => {
                return stageItem.title == stage.title && stageItem.stage == stage.stage && stageItem.report == report;
            })
            return { ReportName: report, IsMain: true, ReportIndex: ++reportIndex, ReportOrder: matchingStage && matchingStage.reportOrder }
        });
        dispatch(updateReportsList(filteredReports));
        dispatch(updateFiles([]))
    };

    useEffect(() => {
        if(stagesMasterData.length == 0){
            fetchStages();
        }
        filterStagesOnReferralType();
    },[stagesMasterData]);
    
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const filterStagesOnReferralType = () => {
        const filteredStages = selectedReferralType
            ? stagesMasterData.filter(stage => stage.title === selectedReferralType)
            : stagesMasterData;

        const groupedStages = filteredStages.reduce((result, item) => {
            const key = `${item.title}-${item.stage}`;
            if (!result[key]) {
                result[key] = {
                    title: item.title,
                    stage: item.stage,
                    reports: []
                };
            }
            result[key].reports.push(item.report);
            return result;
        }, {});

        const finalStages = Object.values(groupedStages);
        
        setStages(finalStages);
    }

    const fetchStages = async () => {
        setIsConfirmation(false)
        setShowCloseButton(false);
        setModalText("Getting Referral Type Stages... Please wait.");
        openModal();
        setTimeout(async ()=> {
            const stages = await getReferralTypeStages(accessToken);//checkonce
            /*const stages = [{title: 'Breast', stage: 'Stage I-II', report: 'Report 1', StageOrder: 1, ReportOrder: 1},
            {title: 'Breast', stage: 'Stage I-II', report: 'Report 11', StageOrder: 3, ReportOrder: 2},
            {title: 'Breast', stage: 'Stage III', report: 'Report 2', StageOrder: 4, ReportOrder: 2},
            {title: 'Breast', stage: 'Stage III', report: 'Report 22', StageOrder: 2, ReportOrder: 1},
            {title: 'Breast', stage: 'Stage IV', report: 'Report 3', StageOrder: 5, ReportOrder: 1},
            {title: 'Lung', stage: 'Stage I-II', report: 'Report 11', StageOrder: 1, ReportOrder: 1},
            {title: 'Lung', stage: 'Stage III', report: 'Report 22', StageOrder: 2, ReportOrder: 1},
            {title: 'Lung', stage: 'Stage IV', report: 'Report 33', StageOrder: 3, ReportOrder: 1},
            {title: 'Lung', stage: 'Mesothelioma', report: 'Report 44', StageOrder: 4, ReportOrder: 1},
            {title: 'Lung', stage: 'Thymoma', report: 'Referral Letter or MDT Outcome', StageOrder: 5, ReportOrder: 3},
            {title: 'Lung', stage: 'Thymoma', report: 'IPT Form', StageOrder: 5, ReportOrder: 1},
            {title: 'Lung', stage: 'Thymoma', report: 'Histology report of biopsy', StageOrder: 5, ReportOrder: 2},
            {title: 'Lung', stage: 'Thymoma', report: 'Histology report of EBUS', StageOrder: 5, ReportOrder: 4},
            {title: 'Lung', stage: 'Thymoma', report: 'Molecular profile in case of adenocarcinoma: EGFR, ALK and PD-L1', StageOrder: 5, ReportOrder: 5},
            {title: 'Lung', stage: 'Thymoma', report: 'Molecular profile in case of squamous cell carcinoma: PDL-1', StageOrder: 5, ReportOrder: 6}];
            */
            const sortedStages = stages.sort((a, b) => {
                if (a.StageOrder !== b.StageOrder) {
                    return a.StageOrder - b.StageOrder;
                } else {
                    return a.ReportOrder - b.ReportOrder;
                }
            })
            
            dispatch(setStagesList(sortedStages))
            closeModal();
        },100)
    }

    const handleBack = () => {
        dispatch(setReferralTypeStageStep(refTypeStageStep-1))
        //goBack();
    }

    const handleNext = () => {
        if(selectedStage == null){
            setShowCloseButton(true);
            setIsConfirmation(false)
            setModalText(warning_SelectStageText);
            openModal();
            return;
        }
        //dispatch(setReferralTypeStageStep(currentStep + 1))
        dispatch(setReferralSubmissionStep(0))
        dispatch(setAppStep(2))
    }

    const handleSendEmailWithReportsList = () => {
        if(selectedStage != null){
            //setShowCloseButton(false)
            //setModalText("Sending email... Please wait.")
            setConfirmationBtnText("Yes")
            setModalText("Would you like to receive a list of all reports required to make a referral?");
            setShowCloseButton(false)
            setIsConfirmation(true);
            openModal()
            setTimeout(async() => {
                /*await sendEmail(userEmail,"Reports List", "<p>Please find the below list of reports need documents to attach to your referral for " + 
                    selectedStage.title + " cancer and " + selectedStage.stage + " stage.</p>" + "<p>" + 
                    reportslist.map(report => {
                        return "<div>" +  report.ReportIndex + ". " + report.ReportName + "</div>"
                    }) + "</p>")
                closeModal()*/
            },100)
        }
        else{
            setModalText("Select a stage");
            setShowCloseButton(true)
            openModal();
        }
    }

    const handleConfirmation = async (isConfirmed) => {
        if(isConfirmed){
            setShowCloseButton(false)
            setIsConfirmation(false)
            setModalText("Sending email... Please wait.")
            await sendEmail(userEmail,"Reports List", "<p>Please find the below list of reports need documents to attach to your referral for " + 
            selectedStage.title + " cancer and " + selectedStage.stage + " stage.</p>" + "<p>" + 
            reportslist.map(report => {
                return "<div>" +  report.ReportIndex + ". " + report.ReportName + "</div>"
            }) + "</p>")
        }
        closeModal();
      }

    return(
        <div>
            <div className="choosestage-container">
                <div className="choosestage-header">
                    <div style={{float: 'left'}}>Please choose a {selectedReferralType} Cancer stage</div>
                    <div style={{float: 'right'}}>
                        <button onClick={handleNext} className="buttonCtrl">Next</button>
                        <button onClick={handleBack} className="buttonCtrl" style={{marginRight: '10px'}}>Back</button>
                        {/*<ButtonCtrl className="buttonCtrl" btnText="Next" btnClickHandler={handleCreateReferral} />*/}
                    </div>
                </div>
                <div className="choosestage-gallery">
                    <div className="leftColumn">
                        {stages.map((stage, index) => (
                        <div><button
                            key={index}
                            onClick={() => handleStageClick(stage)}
                            className={`stagebutton ${selectedStage && selectedStage.stage === stage.stage ? "selected" : ""}`}
                            >
                            {stage.stage}
                        </button><br/></div>
                        ))}
                    </div>
                    <div className="rightColumn">
                        {selectedStage && (
                            <div>
                            <h3 style={{marginTop:'0px',color: '#005cbb'}}>To make a {selectedStage.stage} referral, the following information will be required (in pdf format):</h3>
                                {selectedStage.reports.map((report, index) => (
                                    <div key={index} style={{fontWeight: '600',lineHeight:'30px'}}>{index+1}. {report}</div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="agreeTerm">
                    {/*The patient has been discussed at an MDT Meeting with all results, stage defined, treatment proposal and 
                    referral to CCC agreed?
                    <input type="checkbox" onClick={handleAgreedClick} />
                    Send an email that contains list of documents for submitting referral
                    <button className="buttonCtrl" onClick={handleSendEmailWithReportsList}>Send email</button>*/}
                </div>
                {/*<div style={{float: 'right'}}>
                    <ButtonCtrl className="btnCreate" btnText="Create a Referral" btnClickHandler={handleCreateReferral} />
                </div>*/}
                <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={showCloseButton} 
                    isConfirmation={isConfirmation} confirmationFn={handleConfirmation} confirmationBtnText={confirmationBtnText}>
                    <p>{modalText}</p>
                </ModalDialog>
            </div>
        </div>
    )
}

export default ChooseStages
