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
        <span style={{fontWeight:'bold',fontSize:'22px',maxWidth:'90%',display:'inline-block'}}>{header}</span>
        {showCloseButton && <button style={{marginTop: '0px',float:'right'}} className="btn-primary close-button" onClick={onClose}>
          Close
        </button>}<br/><br/>
        {children}
      </div>
    </div>
  );
};

export default PDFModalDialog;