import React, {useEffect, useState} from "react"
import "./FormTextBoxCtrl.css"
import { useSelector } from "react-redux"

const FormTextBoxCtrl = ({label, onChangeText, title, value, ctrlInSameRow, lblWidth, ctrlWidth, onBlurText, 
    maxLengthValue, minLengthValue, disallowSpaces, onlyText}) => {
  const [textboxvalue, setTextBoxValue] = useState(value)
  const details = useSelector(state => state.details)
  
  useEffect(() => {
    setTextBoxValue(details && details[title])
  },[value])

  const onChangeHandle = (e) => {
    var newValue = e.target.value;
    if (disallowSpaces) {
      newValue = newValue.replace(/\D/g, "");
    }
    if(onlyText){
      newValue = newValue.replace(/[^A-Za-z \-'’]+/g, "")
    }
    setTextBoxValue(newValue)
    onChangeText(title, newValue)
  }
  const handleOnBlur = (e) => {
    if(onBlurText){
      onBlurText(title, e.target.value)
    }
  }

  return (
    <div className="detailsform">
      <label style={lblWidth && { width: lblWidth }}>{label}</label>{ctrlInSameRow !== false && <br />}
      <input style={ctrlWidth && { width: ctrlWidth }} className="textbox" type="text" onChange={onChangeHandle} 
      onBlur={handleOnBlur} maxLength={maxLengthValue && maxLengthValue} minLength={minLengthValue && minLengthValue}
      value={textboxvalue} />
    </div>
  )
}

export default FormTextBoxCtrl