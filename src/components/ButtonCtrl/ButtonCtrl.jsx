import React from "react";
import "./ButtonCtrl.css"

const ButtonCtrl = ({btnText, btnClickHandler}) => {
    return(
        <div>
            <button onClick={btnClickHandler} class="btnCtrl">{btnText}</button>
        </div>
    )
}

export default ButtonCtrl