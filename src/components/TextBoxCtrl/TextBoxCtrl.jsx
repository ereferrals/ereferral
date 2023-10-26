import React, {useState} from "react"
import "./TextBoxCtrl.css"

const TextBoxCtrl = ({placeholdertext, onChangeText}) => {
    const [isFocused, setIsFocused] = useState(false);
  const [email, setEmail] = useState('');

  const handleFocus = () => {
    setIsFocused(true);
  };

  const onChangeHandler = (e) => {
    setEmail(e.target.value)
    onChangeText(e.target.value)
  }

  const handleBlur = () => {
    if (!email) {
      setIsFocused(false);
    }
  };

  return (
    <div><center>
    <div className={`input-container ${isFocused || email ? 'filled' : ''}`}>
      <div className="input-wrapper">
        <input
          type="email"
          id="email"
          className="input"
          value={email}
          onChange={onChangeHandler}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <span className={`placeholder ${isFocused || email ? 'shrink' : ''}`}>{placeholdertext}</span>
      </div>
    </div></center></div>
  )
}

export default TextBoxCtrl