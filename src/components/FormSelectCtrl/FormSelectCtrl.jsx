import React, {useEffect, useState} from "react"
import "./FormSelectCtrl.css"
import { useSelector } from "react-redux"

const FormSelectCtrl = ({label, onChangeText, title, value, options, disableCtrl}) => {
  const [selectValue, setSelectValue] = useState(value)
  const details = useSelector(state => state.details)

  useEffect(() => {
    setSelectValue(details && details[title])
  },[value])

  const onChangeHandle = (e) => {
    setSelectValue(e.target.value)
    onChangeText(title, e.target.value)
  }
  return (
    <div className="formselectctrl">
      <label>{label}</label><br/>
      <select onChange={onChangeHandle} value={selectValue} disabled={disableCtrl}>
          <option></option>
          {options && options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  )
}

export default FormSelectCtrl