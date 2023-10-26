import React from "react"
import { useDispatch } from "react-redux"
import { setReferralTypeStageStep } from "../ReferralTypeSlice"
import { setAppStep } from "../AppSlice"
import { resetDetails } from "../DetailsSlice"
import { setStage } from "../ChooseStages/StagesSlice"

const SuccessView = () => {
    const dispatch = useDispatch()

    const handleAddReferral = () => {
        dispatch(setAppStep(1))
        dispatch(setReferralTypeStageStep(1))
        dispatch(resetDetails())
        dispatch(setStage(null))
    }

    return(
        <div style={{textAlign:"center"}}>
            Your referral has been submitted successfully.<br/><br/>
            <button className="buttonCtrl" style={{float:'none'}} onClick={handleAddReferral}>Submit another referral</button>
        </div>
    )
}

export default SuccessView