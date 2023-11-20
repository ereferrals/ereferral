import React from "react"
import NHSLogoWhite from "../../Images/NHSLogoWhite.png"
import "./Header.css"
import NHSLogo from "../../Images/Clatterbridge-logo1.jpg"

const Header = () => {

    return(
        <div class="header">
            <div><img src={NHSLogoWhite} /></div>
            <div>Patient Referral Portal</div>
        </div>
    )
}

export default Header