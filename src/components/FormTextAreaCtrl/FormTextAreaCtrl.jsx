import React, {useEffect, useState} from "react"
import "./FormTextAreaCtrl.css"
import { useSelector } from "react-redux"

const FormTextAreaCtrl = ({label, onChangeText, title, value, ctrlWidth}) => {
  const [textboxvalue, setTextBoxValue] = useState(value)
  const details = useSelector(state => state.details)

  useEffect(() => {
    setTextBoxValue(details && details[title])
  },[value])

  const onChangeHandle = (e) => {
    setTextBoxValue(e.target.value)
    onChangeText(title, e.target.value)
  }
  return (
    <div className="detailsform">
      <label>{label}</label><br/>
      <textarea className="textarea" type="text" onChange={onChangeHandle} value={textboxvalue} rows={3} 
        style={{width: ctrlWidth}} />
    </div>
  )
}

export default FormTextAreaCtrl