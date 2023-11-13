import React, {useState, useEffect} from "react"
import "./FormDateCtrl.css"
import { useSelector } from "react-redux"

const FormDateCtrl = ({label, onChangeText, title, value, isSameRow, lblMinWidth, dtWidth, isFutureDate, 
  isMandatory, enableRedBorder}) => {
  const [textboxvalue, setTextBoxValue] = useState(value)
  const details = useSelector(state => state.details)

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const currentDate = `${year}-${month}-${day}`;

  useEffect(() => {
    setTextBoxValue(details && details[title])
  },[value])

  const onChangeHandle = (e) => {
    setTextBoxValue(e.target.value)
    onChangeText(title, e.target.value)
  }
  return (
    <div className="detailsform">
      <label style={{minWidth:lblMinWidth}}>{label}{isMandatory && <span className="asterik">*</span>}</label>{!isSameRow && <br/>}
      <input className={`dtCtrl ${enableRedBorder ? 'redBorder' : ''}`} 
      dateFormat="dd-MM-yyyy" type="date" onChange={onChangeHandle} value={textboxvalue}
      style={{width:dtWidth}} 
      min={isFutureDate==true ? currentDate : undefined }
      max={isFutureDate==false ? currentDate : undefined } />
    </div>
  )
}

export default FormDateCtrl