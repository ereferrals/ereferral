import React from "react"
import NHSLogoWhite from "../../Images/NHSLogoWhite.png"
import "./Header.css"
import NHSLogo from "../../Images/Clatterbridge-logo1.jpg"

const Header = () => {

    return(
        <div class="header">
            <div><img src={NHSLogo} /></div>
            <div>The Clatterbridge Cancer Centre</div>
        </div>
    )
}

export default Header