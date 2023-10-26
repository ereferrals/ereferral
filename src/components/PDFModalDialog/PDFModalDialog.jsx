import React from 'react';
import './PDFModalDialog.css';

const PDFModalDialog = ({ isOpen, onClose, showCloseButton, header, children }) => {
  if (!isOpen) {
    return null;
  }

  if(onClose){

  }

  return (
    <div className="modal-overlay-pdf">
      <div className="modal-content-pdf">
        <span style={{fontWeight:'bold',fontSize:'22px'}}>{header}</span><br/><br/>
        {children}<br/>
        {showCloseButton && <button style={{marginTop: '0px'}} className="btn-primary close-button" onClick={onClose}>
          Close
        </button>}
      </div>
    </div>
  );
};

export default PDFModalDialog;