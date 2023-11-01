import React, { useState, useEffect } from "react";
import "./Reports.css";
import PDFViewer from "../PDFViewer/PDFViewer";
import PDFModalDialog from "../PDFModalDialog/PDFModalDialog";
import viewIcon from "../../Images/viewIcon.png";
import addReport from "../../Images/addReport.png";
import deleteIcon from "../../Images/deleteIcon.png";
import ModalDialog from "../ModalDialog/ModalDialog";
import { useDispatch, useSelector } from "react-redux";
import { updateFiles, updateReportsList } from "./ReportsSlice";
import { setReferralSubmissionStep } from "../ReferralSubmissionSlice";

const Reports = () => {
  const dispatch = useDispatch()
  const details = useSelector(state => state.details)
  const selectedStage = useSelector(state => state.stage.currentStage)
  const files = useSelector((state) => state.reports.files);
  const reportslist = useSelector((state) => state.reports.reportsList);
  const [draggingOver, setDraggingOver] = useState(null);
  const [fileToView, setFileToView] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false)
  const [showCloseButton, setShowCloseButton] = useState(true)
  const [modalText, setModalText] = useState("")
  const [isConfirmation, setIsConfirmation] = useState(true)
  const [reportFileToDelete,setReportFileToDelete] = useState(null)
  const [reportIndex, setReportIndex] = useState(reportslist.length)
  const currentStep = useSelector(state => state.referralSubmissionStep)
  const [confirmationType, setConfirmationType] = useState("")
  const [reportNameToAdd, setReportNameToAdd] = useState("")
  const [confirmationBtnText, setConfirmationBtnText] = useState("")
  const [reportHeaderOnPreview, setReportHeaderOnPreview] = useState("")
  const [clickedReport, setClickedReport] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const formdata = useSelector(state => state.details)
  
  const handleAddDuplicateReport = (e) => {
    setConfirmationBtnText("Add")
    setConfirmationType("Add-Report")
    setModalText("Do you want to proceed to add an additional report?");
    setShowCloseButton(false)
    setIsConfirmation(true);
    openModal();
    setReportNameToAdd(e.target.title)
  }

  const addAnAdditionalReportRow = () => {
    const newIndex = reportIndex + 1;
    const newReport = { ReportName: reportNameToAdd, IsMain: false, ReportIndex: newIndex };
    
    const existingReport = reportslist.find((report) => report.ReportName === reportNameToAdd && !files.some((file) => file.ReportIndex === report.ReportIndex));
    if (existingReport) {
      alert("Cannot add duplicate report without a file.");
      return;
    }
    
    const updatedReports = [...reportslist];
    const relatedReportIndex = updatedReports.findIndex((report) => report.ReportName === newReport.ReportName);
    updatedReports.splice(relatedReportIndex + 1, 0, newReport);
    
    setReportIndex(newIndex);
    dispatch(updateReportsList(updatedReports))
    setReportNameToAdd("")
  }

  useEffect(() => {
    if(reportslist.length == 0){
      var newIndex = 0;
      const reportstemp = selectedStage.reports.map(report => {
        newIndex = newIndex + 1;
        setReportIndex(newIndex);
        return {ReportName: report, IsMain: true, ReportIndex: newIndex }
      })
      reportstemp.sort((a, b) => a.ReportName.localeCompare(b.ReportName));
      dispatch(updateReportsList(reportstemp))
    }
  },[])

  const handleNext = () => {
    var errorMsg = "<div style='max-height:500px;overflow-y:auto;width:400px'><b>You must ensure you complete all the below mandatory fields before submitting your referral:</b><br/><br/>"
    const patientMandatoryFields = ['NHSNumber', 'Surname','FirstName','Title','DateofBirth','Sex','MaritalStatus',
                              'Ethnicorigin','Religion','SpecialRequirements','AddressLine1','AddressLine2','AddressLine3',
                            'AddressLine4','PostCode','HomePhoneNumber','MobileNumber'
                            ]
    var emptyFields = []
    var hasMFToFill = false

    for (const fieldName of patientMandatoryFields) {
      if (!formdata.hasOwnProperty(fieldName) || formdata[fieldName] === "") {
        emptyFields.push(fieldName)
        hasMFToFill = true
      }
    }
    
    if (emptyFields.length > 0) {
      errorMsg = errorMsg + `<div style='text-align:left;line-height:28px'><b style='font-size:20px'>Patient Details</b>:<ul>${emptyFields.map(field => `<li>${field}</li>`).join('')}</ul></div>`;
    }

    const nextofKinMandatoryFields = ['NextofKinFirstName', 'NextofKinLastName', 'NextofKinAddressLine1',
                            'NextofKinAddressLine2', 'NextofKinAddressLine3', 'NextofKinAddressLine4', 'NextofKinPostCode',
                            'NextofKinHomePhoneNumber', 'NextofKinMobileNumber', 'RelationshiptoPatient' ]

    emptyFields = []

    for (const fieldName of nextofKinMandatoryFields) {
      if (!formdata.hasOwnProperty(fieldName) || formdata[fieldName] === "") {
        emptyFields.push(fieldName)
        hasMFToFill = true
      }
    }

    if (emptyFields.length > 0) {
      errorMsg = errorMsg + `<div style='text-align:left;line-height:28px'><b style='font-size:20px'>Next of Kin Details</b>:<ul>${emptyFields.map(field => `<li>${field}</li>`).join('')}</ul></div>`;
    }
    
    const referMandatoryFields = ['GPName', 'GPPractice', 'GPPracticeAddress', 'ReferringOrganisation', 'ReferringConsultant', 'DateDecisiontoRefer']

    emptyFields = []

    for (const fieldName of referMandatoryFields) {
      if (!formdata.hasOwnProperty(fieldName) || formdata[fieldName] === "") {
        emptyFields.push(fieldName)
        hasMFToFill = true
      }
    }

    if (emptyFields.length > 0) {
      errorMsg = errorMsg + `<div style='text-align:left;line-height:28px'><b style='font-size:20px'>Refer Details</b>:<ul>${emptyFields.map(field => `<li>${field}</li>`).join('')}</ul></div>`;
    }

    const treatmentMandatoryFields = [ 'MedicalOncologistCCCConsultant', 'ClinicalOncologistCCCConsultant', 'PrimaryDiagnosis', 'IsthisaTargetPatient', 'TargetCategory' ]

    emptyFields = []

    for (const fieldName of treatmentMandatoryFields) {
      if (!formdata.hasOwnProperty(fieldName) || formdata[fieldName] === "") {
        emptyFields.push(fieldName)
        hasMFToFill = true
      }
    }

    if (emptyFields.length > 0) {
      errorMsg = errorMsg + `<div style='text-align:left;line-height:28px'><b style='font-size:20px'>Treatment & Target Category</b>:<ul>${emptyFields.map(field => `<li>${field}</li>`).join('')}</ul></div>`;
    }

    errorMsg = errorMsg + "</div>"

    if(hasMFToFill && false){//checkonce
      setModalText(errorMsg)
      setShowCloseButton(true)
      setIsConfirmation(false)
      openModal()
      return
    }
    debugger
    const mainReports = reportslist.filter((report) => report.IsMain);
    const mainReportsWithFiles = mainReports.every((mainReport) => {
        if(details && details.IsthisaTargetPatient == "No" && mainReport.ReportName == "IPT Form"){
          return true
        }
        return files.some((file) => file.ReportIndex === mainReport.ReportIndex)
      });

    if (!mainReportsWithFiles && formdata.IsExistingNHSNumber != "Yes") {
      setModalText("Please upload files for all reports before proceeding")
      setShowCloseButton(true)
      setIsConfirmation(false)
      openModal()
      return
    }

    if(details && details.IsthisaTargetPatient == "Yes"){
      const tempReports = reportslist.filter((report) => report.ReportName == "IPT Form")
      if(tempReports.length > 0){
        const iptFormFile = files.some((file) => file.ReportName === "IPT Form")
        if(!iptFormFile){
          setModalText("Please upload IPT Form report.")
          setShowCloseButton(true)
          setIsConfirmation(false)
          openModal()
          return
        }
      }
    } else if (details && details.IsthisaTargetPatient === "No") {
      const updatedFiles = files.filter((file) => file.ReportName !== "IPT Form");
      //const updatedFiles = files.filter((file) => file.ReportIndex !== report.ReportIndex);
      dispatch(updateFiles(updatedFiles));
    }

    dispatch(setReferralSubmissionStep(currentStep + 1))
  };

  const handleBack = () => {
    dispatch(setReferralSubmissionStep(currentStep - 1))
  };

  const handleDragEnter = (e, report) => {
    e.preventDefault();
    setDraggingOver(report);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {
    setDraggingOver(null);
  };

  const handleDrop = (e, report, reportIndex, reportOrder) => {
    e.preventDefault();
    setDraggingOver(null);

    if (e.dataTransfer.files.length > 1) {
      alert("Drop only one file.");
      return;
    }

    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile.type.includes("pdf")) {
        alert("Only PDF files are allowed.");
        return;
    }

    if (droppedFile.size > 5 * 1024 * 1024) {
      alert("Please upload file with size up to 5MB.");
      return;
    }

    const existingFile = files.find((file) => file.ReportIndex === reportIndex);
    if (existingFile) {
      const replaceFile = window.confirm("This report already has a file. Do you want to replace it?");
      if (!replaceFile) {
        return;
      }
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const arrayBuffer = e.target.result;
      const dataView = new DataView(arrayBuffer);
    
      if (!(arrayBuffer.byteLength > 4 &&
          dataView.getUint8(0) === 0x25 &&
          dataView.getUint8(1) === 0x50 &&
          dataView.getUint8(2) === 0x44 &&
          dataView.getUint8(3) === 0x46)) {
        alert("Invalid PDF file.");
        return;
      }

      const timestamp = new Date().getTime()
      const fileParts = droppedFile.name.split('.');
      const fileExtension = fileParts.pop();
      const fileNameWithoutExtension = fileParts.join('.');
      const fileNameWithTimestamp = `${fileNameWithoutExtension}_${timestamp}.${fileExtension}`;
      const updatedFile = new File([droppedFile], fileNameWithTimestamp, {
        type: droppedFile.type,
      });
      
      const newStage = { 
        ReportName: report, 
        ReportFile: updatedFile,//droppedFile, 
        ReportIndex: reportIndex,
        ReportOrder: reportOrder 
      };
      const updatedFiles = files.filter((file) => file.ReportIndex !== reportIndex);
      dispatch(updateFiles([...updatedFiles, newStage]))
    }
    reader.readAsArrayBuffer(droppedFile);
  };

  const handlePDFView = (e) => {
    openPDFModal();
    var reportName = e.target.title;
    setReportHeaderOnPreview(reportName)
    files.map(file =>{
        if(file.ReportName == reportName){
            setFileToView(file.ReportFile);
        }
    })
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openPDFModal = () => {
    setIsPDFModalOpen(true);
  };

  const closePDFModal = () => {
    setIsPDFModalOpen(false);
  };

  const handleDeleteFile = (e, hasFile, isMain) => {
      if(hasFile){
        setConfirmationBtnText("Delete")
        setShowCloseButton(false)
        setConfirmationType("Delete-File")
        setModalText("Are you sure to delete the file?");
        setIsConfirmation(true);
        openModal();
        setReportFileToDelete(e.target.title);
      }
      else if(!isMain){
        const updatedReports = reportslist.filter((report) =>
          report.ReportIndex !== parseInt(e.target.title)
        );
        dispatch(updateReportsList(updatedReports))
      }
  }
    
    const deleteFile = () => {
      const updatedFiles = files.filter(file => file.ReportIndex !== parseInt(reportFileToDelete));
      dispatch(updateFiles(updatedFiles))
      const updateReports = reportslist.filter(report => report.ReportIndex !== parseInt(reportFileToDelete) || report.IsMain)
      dispatch(updateReportsList(updateReports))
      setReportFileToDelete(null);
    }

    const replaceFileOnReport = (report, selFile) => {
      if(clickedReport)
      {
        report = clickedReport
      }
      if(selectedFile)
      {
        selFile = selectedFile
      }

      const timestamp = new Date().getTime()
      const fileParts = selFile.name.split('.');
      const fileExtension = fileParts.pop();
      const fileNameWithoutExtension = fileParts.join('.');
      const fileNameWithTimestamp = `${fileNameWithoutExtension}_${timestamp}.${fileExtension}`;
      //const fileNameWithTimestamp = `${selFile.name}_${timestamp}`
      const updatedFile = new File([selFile], fileNameWithTimestamp, {
        type: selFile.type,
      });

      const newFile = {
        ReportName: report.ReportName,
        ReportFile: updatedFile,//selFile,
        ReportIndex: report.ReportIndex,
        ReportOrder: report.ReportOrder
      };
      const updatedFiles = files.filter((file) => file.ReportIndex !== report.ReportIndex);
      dispatch(updateFiles([...updatedFiles, newFile]));
      setClickedReport(null)
      setSelectedFile(null)
    }

    const handleConfirmation = (isConfirmed) => {
      if(isConfirmed){
        if(confirmationType == "Delete-File")
        {
          deleteFile()
        }
        else if(confirmationType == "Add-Report"){
          addAnAdditionalReportRow();
        }
        else if(confirmationType == "Replace-File"){
          replaceFileOnReport();
        }
      }
      closeModal();
    }

    const handleFileUpload = (e, report) => {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".pdf";
      fileInput.click();
  
      fileInput.addEventListener("change", (event) => {
        const selFile = event.target.files[0];
        if (!selFile.type.includes("pdf")) {
            alert("Only PDF files are allowed.");
            return;
        }
        if (selFile.size > 5 * 1024 * 1024) {
          alert("Please upload file with size up to 5MB.");
          return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
          const arrayBuffer = e.target.result;
          const dataView = new DataView(arrayBuffer);
        
          if (!(arrayBuffer.byteLength > 4 &&
              dataView.getUint8(0) === 0x25 &&
              dataView.getUint8(1) === 0x50 &&
              dataView.getUint8(2) === 0x44 &&
              dataView.getUint8(3) === 0x46)) {
            alert("Invalid PDF file.");
            return;
          }

          if (selFile) {
            const existingFile = files.find((file) => file.ReportIndex === report.ReportIndex);
            setClickedReport(report)
            setSelectedFile(selFile)
            if (existingFile) {
              setConfirmationBtnText("Yes")
              setConfirmationType("Replace-File")
              setModalText("This report already has a file. Do you want to replace it?");
              setShowCloseButton(false)
              setIsConfirmation(true);
              openModal();
            }
            else{
              replaceFileOnReport(report,selFile);
            }
          }
        }
        reader.readAsArrayBuffer(selFile);
      });
    };

  return (
    <div>
      <div style={{ float: "left",width:"100%" }}>
        <div style={{display:"inline-block",width:"100%"}}>
            <h3 className="detailsHeader" style={{float:"left",marginBottom:'5px'}}>Reports</h3>
            <div className="detailsNext" style={{float:"right"}}>
                <button onClick={handleNext}>Next</button>
                <button onClick={handleBack} style={{marginRight:'10px'}}>Back</button>
            </div>
        </div>
        <span>Please drag and drop the required documents to the sections or click on sections below</span><br/><br/>
        {reportslist.map((report, index) => {
          if(details && details.IsthisaTargetPatient == "No" && report.ReportName== "IPT Form"){
            return
          }
          const hasFile = files.some((file) => file.ReportIndex === report.ReportIndex);
          var filename = null;
          if (hasFile) {
            var file = files.find(file => file.ReportIndex === report.ReportIndex);
            filename = file.ReportFile.name;
          }

          return (
            <div style={{display:'flex'}}>
                <div style={{width:'80px',display:'block',alignItems:'right',height:'40px',textAlign:'right'}}>{hasFile && <>
                  {report.IsMain && <img src={addReport} title={report.ReportName} onClick={handleAddDuplicateReport} 
                  style={{width: '30px',cursor: 'pointer',marginRight:'5px',marginTop:'5px'}}/>}
                  <img src={viewIcon} title={report.ReportName} onClick={handlePDFView} 
                  style={{width: '40px',cursor: 'pointer',marginRight:'5px',height:'28px',marginTop:'8px'}}/>
                  </>
                }</div>
                <div
                key={index}
                title={report.ReportName}
                className={`report-strip drop-area ${
                    draggingOver === report.ReportName ? "dragging" : ""
                } ${hasFile ? "with-file" : ""}`}
                onDragEnter={(e) => handleDragEnter(e, report)}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, report.ReportName, report.ReportIndex, report.ReportOrder)}
                onClick={() => handleFileUpload(null, report)}
                >
                {!report.IsMain && "Additional"} {report.ReportName}{hasFile && " - "}{hasFile && filename}
                </div>
                {(hasFile || !report.IsMain) && <div><img src={deleteIcon} title={report.ReportIndex} 
                  onClick={(e) => {handleDeleteFile(e, hasFile, report.IsMain)}} style={{width: '25px',margin:'7px 0px 0px 5px',cursor:'pointer'}}/></div>}
            </div>
          );
        })}
        {fileToView && <PDFModalDialog isOpen={isPDFModalOpen} onClose={closePDFModal} showCloseButton={true} header={reportHeaderOnPreview}>
            <PDFViewer file={fileToView}></PDFViewer>
        </PDFModalDialog>}
      </div>
      {/*<div className="detailsNext">
        <button onClick={handleNext}>Next</button>
        <button onClick={handleBack} style={{marginRight:'10px'}}>Back</button>
      </div>*/}
      <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={showCloseButton} isConfirmation={isConfirmation} 
      confirmationFn={handleConfirmation} confirmationBtnText={confirmationBtnText} isHtmlContent={true}>
        {modalText}
      </ModalDialog>
    </div>
  );
};

export default Reports;

