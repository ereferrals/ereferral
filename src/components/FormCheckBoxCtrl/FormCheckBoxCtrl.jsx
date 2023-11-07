import React, {useEffect, useState} from "react"
import "./FormCheckBoxCtrl.css"

const FormCheckBoxCtrl = ({label, onChangeText, title, value}) => {
  const [textboxvalue, setTextBoxValue] = useState(false)

  useEffect(() => {
    setTextBoxValue(value)
  },[value])

  const onChangeHandle = (e) => {
    setTextBoxValue(e.target.checked)
    onChangeText(title, e.target.checked)
  }
  return (
    <div className="detailsform">
      <label style={{minWidth: '300px'}}>{label}</label>
      <input className="textbox" style={{height:'20px',width:'20px', position:'relative',top:'5px'}} type="checkbox" onClick={onChangeHandle} checked={textboxvalue} />
    </div>
  )
}
 
export default FormCheckBoxCtrl