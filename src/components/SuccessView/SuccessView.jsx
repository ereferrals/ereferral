import React from "react"
import { useDispatch } from "react-redux"
import { setReferralTypeStageStep } from "../ReferralTypeSlice"
import { setAppStep } from "../AppSlice"
import { resetDetails } from "../DetailsSlice"
import { setStage } from "../ChooseStages/StagesSlice"
import { setUserValidationStep } from "../UserValidation/UserValidationSlice"
import { setNOKMandatory, setPatientMandatory, setReferMandatory, setTTCMandatory } from "../SharedStringsSlice"

const SuccessView = () => {
    const dispatch = useDispatch()

    const handleAddReferral = () => {
        dispatch(setAppStep(1))
        dispatch(setReferralTypeStageStep(1))
        dispatch(resetDetails())
        dispatch(setStage(null))
    }

    const handleResetSession = () => {
        dispatch(setAppStep(0))
        dispatch(setUserValidationStep(0))
        dispatch(setReferralTypeStageStep(0))
        dispatch(resetDetails())
        dispatch(setStage(null))
        dispatch(setPatientMandatory(false))
        dispatch(setNOKMandatory(false))
        dispatch(setReferMandatory(false))
        dispatch(setTTCMandatory(false))
    }

    return(
        <div style={{lineHeight:"28px",width:"70%",margin:"0 auto"}}>
            <p>Thank you for your referral into The Clatterbridge Cancer Centre.</p>
            <p>Your referral request has been received and will be reviewed by the relevant team shortly. 
                An email will be sent to you once the referral is accepted.</p>
            <p>Many thanks,<br/>The Clatterbridge Cancer Centre</p>
            <br/>
            <button className="buttonCtrl" style={{float:'none',marginRight:'20px'}} onClick={handleAddReferral}>Submit another referral</button>
            <button className="buttonCtrl" style={{float:'none'}} onClick={handleResetSession}>Close session</button>
        </div>
    )
}

export default SuccessView