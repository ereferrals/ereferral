import React, { useState, useEffect } from "react";
import {Viewer, Worker} from "@react-pdf-viewer/core"
import { DefaultLayoutPlugin, defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

const PDFViewer = ({ file }) => {
    const [pdfFile, setPDFFile] = useState(null);
    const [viewPDF, setViewPDF] = useState(null);

    useEffect(() => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setPDFFile(e.target.result);
        };
    }, [file]);

    useEffect(() => {
        if (pdfFile !== null) {
            setViewPDF(pdfFile);
        }
    }, [pdfFile]);

    const newPlugin = defaultLayoutPlugin();

    return (
        <div>
            <div className="pdf-container">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    {viewPDF && (
                        <Viewer fileUrl={viewPDF} plugins={[newPlugin]} />
                    )}
                </Worker>
            </div>
        </div>
    );
};

export default PDFViewer;
