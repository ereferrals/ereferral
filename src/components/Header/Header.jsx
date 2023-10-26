import React from "react"
import NHSLogoWhite from "../../Images/NHSLogoWhite.png"
import "./Header.css"

const Header = () => {

    return(
        <div class="header">
            <div><img src={NHSLogoWhite} /></div>
            <div>The Clatterbridge Cancer Centre</div>
        </div>
    )
}

export default Header