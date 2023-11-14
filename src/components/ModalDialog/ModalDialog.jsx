import React from 'react';
import './ModalDialog.css';
import loading from "../../Images/loading.gif";

const ModalDialog = ({ isOpen, onClose, showCloseButton, isConfirmation, confirmationFn, confirmationBtnText, isHtmlContent, children }) => {
  if (!isOpen) {
    return null;
  }
  const handleConfirmation = (confirm) => {
    confirmationFn(confirm);
  }

  if(onClose){

  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {isHtmlContent && <dv dangerouslySetInnerHTML={{ __html: children }}></dv>}
        {!isHtmlContent && <dv>{children==="Submitting Data... Please wait." && <><img style={{width:"80px"}} src={loading} /><br/></>} {children}</dv>}
        {!isConfirmation && showCloseButton && <></>}
        {isConfirmation && <br/>}
        {showCloseButton && <><br/><button style={{marginTop:"20px"}} className="btn-primary close-button" onClick={onClose}>
          Ok
        </button></>}
        {isConfirmation && <><br/>
        <button className="btn-primary close-button" onClick={() => {handleConfirmation(true)}} style={{marginRight:'5px'}}>
          {confirmationBtnText}
        </button><button className="btn-primary close-button" onClick={() => {handleConfirmation(false)}} style={{marginLeft:'5px'}}>
          Cancel
        </button></>}
      </div>
      {/*<div className="modal-content">
        {isHtmlContent && <dv dangerouslySetInnerHTML={{ __html: children }}></dv>}
        {!isHtmlContent && <dv>{children}</dv>}
        {!isConfirmation && showCloseButton && <><br/><br/></>}
        {isConfirmation && <br/>}
        {showCloseButton && <button className="btn-primary close-button" onClick={onClose}>
          Ok
        </button>}
        {isConfirmation && <><br/>
        <button className="btn-primary close-button" onClick={() => {handleConfirmation(true)}} style={{marginRight:'5px'}}>
          {confirmationBtnText}
        </button><button className="btn-primary close-button" onClick={() => {handleConfirmation(false)}} style={{marginLeft:'5px'}}>
          Cancel
        </button></>}
      </div>*/}
    </div>
  );
};

export default ModalDialog;