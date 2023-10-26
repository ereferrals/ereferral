import React from "react"
import videoSrc from "../../Images/NHSVideo.mp4"
import "./HomeVideo.css"
import { useDispatch, useSelector } from "react-redux"
import { setReferralTypeStageStep } from "../ReferralTypeSlice"

const HomeVideo = () => {
    const dispatch = useDispatch()
    const currentStep = useSelector(state => state.referralTypeStageStep)

    const handleNext = () =>{
        dispatch(setReferralTypeStageStep(currentStep + 1))
    }

    return(
        <div>
            <div class="video-container">
                <video controls>
                    <source src={videoSrc} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video><br/>
                <button onClick={handleNext} class="rightbtn">Skip {'>'}{'>'}</button>
            </div>
        </div>
    )
}

export default HomeVideo