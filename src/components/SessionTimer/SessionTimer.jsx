import React, { useEffect, useState } from "react"
import ModalDialog from "../ModalDialog/ModalDialog"
import "./SessionTimer.css"
import { resetSession } from "../../Services/api"

const SessionTimer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [countdown, setCountdown] = useState(120)
    const [startCountdown, setStartCountdown] = useState(false)
    const [countdownover, setCountdownover] = useState(false)

    let timer
    let timer2
    const sessionTimeout = 5 * 60 * 1000
    const warningTimeout = 2 * 60 * 1000
 
    useEffect(() => {
        if(startCountdown)
        {
            timer2 = setTimeout(() => {
                if (countdown > 0) {
                    setCountdown(countdown - 1)
                    console.log(countdown)
                }
                else{
                    openModal()
                    setStartCountdown(false)
                    setCountdownover(true)
                }
            }, 1000)
        }
        return () => {
            clearTimeout(timer2)
        }
        
    },[countdown, startCountdown])

    useEffect(() => {
        startTimer()
    },[])

    const resetTimer = () => {
        clearTimeout(timer)
        startTimer()
        setCountdown(120)
        setStartCountdown(false)
        closeModal()
    }  

    const startTimer = () => {
        timer = setTimeout(() => {
            setStartCountdown(true)
            openModal()
        }, sessionTimeout - warningTimeout)
    }

    const openModal = () => {
        setIsModalOpen(true)
    }
  
    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleExtendSession = async () => {
        await resetSession()
        resetTimer()
    }

    const handleCloseSession = () => {
        setStartCountdown(false)
        closeModal()
    }

    const handleClosePopup = () => {
        closeModal()
    }
    
    return (<div>
        {!countdownover && 
            <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={false}>
                Current session going to be expired in {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')} mins
            <br/><br/>
            <button className="timer-button" onClick={handleExtendSession} style={{marginRight: "5px"}}>Extend session</button>
            <button className="timer-button" onClick={handleClosePopup} style={{marginLeft: "5px"}}>Close</button>
            </ModalDialog>
        }
        {countdownover && 
            <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={false}>
                Your session has expired. Please login again.<br/><br/>
                <button className="timer-button" onClick={handleCloseSession}>Close session</button>
            </ModalDialog>
        }
    </div>)
}
export default SessionTimer