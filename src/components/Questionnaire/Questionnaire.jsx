import React, {useEffect, useState} from "react";
import FormTextAreaCtrl from "../FormTextAreaCtrl/FormTextAreaCtrl";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../DetailsSlice";
import FormSelectCtrl from "../FormSelectCtrl/FormSelectCtrl"
import FormDateCtrl from "../FormDateCtrl/FormDateCtrl";
import { setReferralTypeStageStep } from "../ReferralTypeSlice";
import { setNHSNumbers } from "../MasterDataSlice"
import ModalDialog from "../ModalDialog/ModalDialog";
import { setAppStep } from "../AppSlice";
import { setReferralSubmissionStep } from "../ReferralSubmissionSlice";
import FormTextBoxCtrl from "../FormTextBoxCtrl/FormTextBoxCtrl";
import FormYesNoBtnsCtrl from "../FormYesNoBtnsCtrl/FormYesNoBtnsCtrl";
import { warning_NHSNumberText } from "../Config";
import { setNOKMandatory, setPatientMandatory, setReferMandatory, setTTCMandatory } from "../SharedStringsSlice";

const Questionnaire = () => {
    const dispatch = useDispatch()
    const details = useSelector(state => state.details)
    const [discussedAtMDT, setDiscussedAtMDT] = useState(details.DiscussedatMDT);
    const [overseasPatient, setOverseasPatient] = useState(details.OverseasPatient);
    const [awareOfDiagnosis, setAwareOfDiagnosis] = useState(details.PatientAwareofDiagnosis);
    const refTypeStageStep = useSelector(state => state.referralTypeStageStep)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showCloseButton,setShowCloseButton] = useState(true);
    const [modalText, setModalText] = useState("");
    const nhsNumbers = useSelector(state => state.masterData.NHSNumbers)
    /*
    useEffect(() => {
        if(nhsNumbers.length == 0){
            fetchNHSNumbers()
        }
    },[])

    const fetchNHSNumbers = async () => {
        var nhsnos = [{title: "121212"}]//await getMasterData("NHSNumbers")//getNHSNumbers()//checkonce
        dispatch(setNHSNumbers(nhsnos))
    }*/

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleNext = () => {
        if(awareOfDiagnosis == undefined || awareOfDiagnosis == "" || 
        (awareOfDiagnosis == "Yes" && (discussedAtMDT == undefined || discussedAtMDT == "")) || 
        (discussedAtMDT == "Yes" && (overseasPatient == undefined || overseasPatient == "")))
        {
            /*discussedAtMDT == undefined || discussedAtMDT == "" || 
            awareOfDiagnosis == undefined || awareOfDiagnosis == "" || 
            overseasPatient == undefined || overseasPatient == ""*/

            setShowCloseButton(true);
            setModalText("Please complete the questionnaire");
            openModal()
            return
        }
        if(discussedAtMDT == 'No' || awareOfDiagnosis == 'No'){
            setShowCloseButton(true);
            if(discussedAtMDT == 'No')
                setModalText("Unable to proceed if patient has not been discussed at MDT and the stage has not been defined");
            else
                setModalText("Unable to proceed if the patient is not informed of the diagnosis");
            openModal();
            return;
        }
        if(overseasPatient == 'No'){
            if(!details.NHSNumber || details.NHSNumber == ""){
                setShowCloseButton(true)
                setModalText(warning_NHSNumberText)
                openModal()
                return
            }
        }
        if(!details.DateatMDT || details.DateatMDT === ""){
            setShowCloseButton(true)
            setModalText("Enter date at MDT")
            openModal()
            return
        }
        if(details.NHSNumber && details.NHSNumber != "" && (details.NHSNumber.length != 10)){
            setShowCloseButton(true)
            setModalText("Enter valid NHS Number")
            openModal()
            return
        }
        //dispatch(setReferralSubmissionStep(0))
        //dispatch(setAppStep(2))
        dispatch(setReferralTypeStageStep(refTypeStageStep + 1))
    }

    const handleBack = () => {
        dispatch(setReferralTypeStageStep(refTypeStageStep-1))
    }

    const onChangeTextHandle = (title, value) => {
        dispatch(updateDetails({title, value}))
        if(title == "DiscussedatMDT"){
            setDiscussedAtMDT(value)
            if(value == 'No'){
                resetControls("DiscussedatMDT")
                setModalText("Cannot continue if not discussed at MDT")
                openModal();
                return;
            }
        }
        else if(title == "OverseasPatient"){
            setOverseasPatient(value)
            if(value == 'No'){
                resetControls("OverseasPatient")
            }
        }
        else if(title == "PatientAwareofDiagnosis"){
            setAwareOfDiagnosis(value)
            if(value == 'No'){
                resetControls("PatientAwareofDiagnosis")
                setModalText("Cannot continue if patient not aware of diagnosis")
                openModal();
                return;
            }
        }
    }

    const resetControls = (ctrlsset) => {
        var ctrlsToReset = []
        if(ctrlsset == "PatientAwareofDiagnosis"){
            ctrlsToReset.push("DiscussedatMDT")
        }
        if(ctrlsset == "PatientAwareofDiagnosis" || ctrlsset == "DiscussedatMDT"){
            ctrlsToReset.push("DateatMDT")
            ctrlsToReset.push("TreatmentDecision")
            ctrlsToReset.push("MDTComments")
            ctrlsToReset.push("OverseasPatient")
        }
        if(ctrlsset == "PatientAwareofDiagnosis" || ctrlsset == "DiscussedatMDT" || ctrlsset == "OverseasPatient"){
            ctrlsToReset.push("HasAssessmentbeenCompleted")
            ctrlsToReset.push("OutcomeofAssessment")
            ctrlsToReset.push("NHSNumber")
        }
        ctrlsToReset.forEach(ctrl => {
            var title = ctrl
            var value = ""
            dispatch(updateDetails({title,value}))
        });
    }

    const onBlurTextHandle = (title, value) => {
        if(title == "NHSNumber"){
            const numberExists = nhsNumbers && nhsNumbers.some((nhsNumber) => nhsNumber.title === value);
            if(numberExists)
            {
                dispatch(setPatientMandatory(false))
                dispatch(setNOKMandatory(false))
                dispatch(setReferMandatory(false))
                dispatch(setTTCMandatory(false))

                value = "Yes"
                setShowCloseButton(true)
                setModalText("<span style='line-height:28px'>The NHS number has been recognised as not needing all the reports specified. <br/>Please complete as many of the fields as you can and attach the reports you have available.</span>")
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

    const treatmentDecisionOptions = [
        { id: 'Radiotherapy', label: 'Radiotherapy' },
        { id: 'Systemictreatment', label: 'Systemic treatment' },
        { id: 'Combinationofsystemictreatmentandradiotherapy', label: 'Combination of systemic treatment and radiotherapy' },
    ];
    
    return(
        <div>
            <div className="choosestage-container">
                <div className="choosestage-header">
                    <div style={{float: 'left'}}>NHS Entitlement Assessment & MDT Outcome</div>
                    <div style={{float: 'right'}}>
                        <button onClick={handleNext} className="buttonCtrl">Next</button>
                        <button onClick={handleBack} className="buttonCtrl" style={{marginRight: '10px'}}>Back</button>
                        {/*<ButtonCtrl className="buttonCtrl" btnText="Next" btnClickHandler={handleCreateReferral} />*/}
                    </div>
                </div>
                <div style={{display:'inline-block',width:'100%'}}>
                    
                    <div>
                        <FormYesNoBtnsCtrl label="Does the patient know their diagnosis?" onChangeValue={onChangeTextHandle} 
                                    title="PatientAwareofDiagnosis" value={details && details.PatientAwareofDiagnosis} />
                       
                    </div>
                    {awareOfDiagnosis == 'Yes' && (<><br/>

                    <div>
                        <FormYesNoBtnsCtrl label="Has the patient been discussed at MDT and stage defined?" onChangeValue={onChangeTextHandle} 
                                    title="DiscussedatMDT" value={details && details.DiscussedatMDT} />
                    </div>
                    {discussedAtMDT === 'Yes' && (<><br/>
                        <div>
                            <FormDateCtrl label="Date at MDT" onChangeText={onChangeTextHandle} title="DateatMDT" 
                            value={details && details.DateatMDT} isSameRow={true} lblMinWidth={'480px'} dtWidth={'150px'} 
                            isFutureDate={false} />
                            
                        </div><br/><br/>
                        <div style={{marginBottom:"10px",fontWeight:"bold",color:"#005cbb",fontSize:"20px"}}>Treatment Proposal:</div>
                        {treatmentDecisionOptions.map((option) => (<>
                            <div key={option.id}>
                                <label htmlFor={option.id} style={{minWidth:"475px",display:"inline-block",fontWeight:"600"}}>{option.label}</label>
                                <input
                                    type="radio"
                                    id={option.id}
                                    title="TreatmentDecision"
                                    value={details && details.TreatmentDecision}
                                    checked={details && details.TreatmentDecision === option.label}
                                    onChange={(e) => onChangeTextHandle("TreatmentDecision", option.label)} 
                                    style={{height:"20px",width:"20px"}}
                                />
                                
                            </div><br/></>
                        ))}
                        <div><br/>
                            <FormTextAreaCtrl label="MDT Comments" onChangeText={onChangeTextHandle} title="MDTComments" 
                            value={details && details.MDTComments} ctrlWidth="633px"/>
                        </div>
                        
                    <br/>

                    <div>
                        <FormYesNoBtnsCtrl label="Is this patient an Overseas Visitor, Welsh or Scottish patient?" onChangeValue={onChangeTextHandle} 
                                    title="OverseasPatient" value={details && details.OverseasPatient} />
                       
                    </div>
                    {overseasPatient === 'Yes' && (
                        <><br/>
                            <div>
                                <FormYesNoBtnsCtrl label="NHS Entitlement?" onChangeValue={onChangeTextHandle} 
                                            title="HasAssessmentbeenCompleted" value={details && details.HasAssessmentbeenCompleted} />
                            </div><br/>
                            <div>
                                <FormTextAreaCtrl label="Outcome of Assessment" onChangeText={onChangeTextHandle} 
                                    title="OutcomeofAssessment" value={details && details.OutcomeofAssessment} ctrlWidth="633px"/>
                            </div>
                        </>
                    )}
                    <br/>
                    <div><FormTextBoxCtrl label="NHS Number" onChangeText={onChangeTextHandle} title="NHSNumber" 
                        value={details && details.NHSNumber} ctrlInSameRow={false} lblWidth="480px" ctrlWidth="150px" 
                        onBlurText={onBlurTextHandle} maxLengthValue={10} minLengthValue={10} disallowSpaces={true}/>
                    </div>
                    </>)}
                    
                    </>)}
                        
                    <br/><br/>
                </div>
            
                <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={showCloseButton} isHtmlContent={true}>
                    {modalText}
                </ModalDialog>
        </div>
        </div>
    )
}

export default Questionnaire