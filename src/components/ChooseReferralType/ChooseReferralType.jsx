import React, { useEffect } from "react";
import Breast from "../../Images/Breast.png";
import Lung from "../../Images/Lung.png";
import "./ChooseReferralType.css"
import { useDispatch, useSelector } from "react-redux";
import { setReferralType } from "./ChooseReferralTypeSlice";
import { resetDetails, updateDetails } from "../DetailsSlice";
import { setReferralTypeStageStep } from "../ReferralTypeSlice";
import { setStage } from "../ChooseStages/StagesSlice";
import { resetReports } from "../Reports/ReportsSlice";
import { getMasterData } from "../../Services/api";
import { setClinicalOncologistList, setCommunicationRequirementList, setCovidList, setEthnicity, setMaritalStatuses, 
  setMedicalOncologistList, setNHSNumbers, setReferringOrgs, setRelationshiptoPatientList, setReligions, setSexOptionsList, setSpecialRequirementsList, 
  setTargetCategoriesList, 
  setTitlesList} from "../MasterDataSlice";

const transparentPixel =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/5+AAwAB/4DaaNvTAAAAAElFTkSuQmCC";

const imageNames = ["Breast", "Lung", "", "", "", "", "", "", "", "", "", "", "", ""];

const ChooseReferralType = () => {
  const imageUrls = [Breast, Lung, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel];
  const dispatch = useDispatch();
  const currentStep = useSelector(state => state.referralTypeStageStep)
  const selectedReferralType = useSelector(state => state.referralType)
  const listData = useSelector(state => state.masterData)
  
  //Load master data asynchronously. 
  useEffect(() => {
    if(listData.Religions && listData.Religions.length == 0){
      fetchData("NHSNumbers")
      fetchData("Religions")
      fetchData("MaritalStatuses")
      fetchData("Ethnicity")
      fetchData("MedicalOncologists")
      fetchData("ClinicalOncologists")
      fetchData("TargetCategories")
      //fetchData("Covid")
      fetchData("SpecialRequirements")
      //fetchData("CommunicationRequirement")
      fetchData("SexOptions")
      fetchData("RelationshiptoPatient")
      fetchData("Titles")
      fetchData("ReferringOrgs")
    }
  },[])

  const fetchData = (type_name) => {
    getMasterData(type_name)
      .then((data) => {
        switch (type_name) {
          case "NHSNumbers":
            dispatch(setNHSNumbers(data));
            break;
          case "Religions":
            dispatch(setReligions(data));
            break;
          case "Ethnicity":
            dispatch(setEthnicity(data));
            break;
          case "MaritalStatuses":
            dispatch(setMaritalStatuses(data));
            break;
          case "MedicalOncologists":
            dispatch(setMedicalOncologistList(data));
            break;
          case "ClinicalOncologists":
            dispatch(setClinicalOncologistList(data));
            break;
          case "TargetCategories":
            dispatch(setTargetCategoriesList(data));
            break;
          case "Covid":
            dispatch(setCovidList(data));
            break;
          case "SpecialRequirements":
            dispatch(setSpecialRequirementsList(data));
            break;
          case "CommunicationRequirement":
            dispatch(setCommunicationRequirementList(data));
            break;
          case "SexOptions":
            dispatch(setSexOptionsList(data));
            break;
          case "RelationshiptoPatient":
            dispatch(setRelationshiptoPatientList(data));
            break;
          case "Titles":
            dispatch(setTitlesList(data));
            break;
          case "ReferringOrgs":
            dispatch(setReferringOrgs(data));
            break;
          default:
            console.error(`Unsupported type_name: ${type_name}`);
        }

        console.log("Response:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleImageClick = (e) => {
    if(e.target.title != ""){
      dispatch(setReferralType(e.target.title));
      let title = "ReferralType"
      let value = e.target.title
      dispatch(resetDetails())
      dispatch(resetReports())
      dispatch(updateDetails({title, value}));
      dispatch(setReferralTypeStageStep(currentStep + 1))

      if(e.target.title != selectedReferralType){
        dispatch(setStage(null))//add confirmation
      }
    }
    else
    {
      alert("This Referral Type not configured.")
    }
  };

  return (
    <div>
        <div className="image-container">
            <div className="image-header">Please choose a referral type</div>
            <div className="image-gallery">
                {imageUrls.map((imageUrl, index) => (
                    <a
                        key={index}
                        href="javascript:void(0)"
                        className="image-tile-link"
                        onClick={(event) => handleImageClick(event, imageUrl)}
                        title={imageNames[index]}
                        >
                        <div key={index} className="image-tile" title={imageNames[index]}>
                            {/*<img src={imageUrl} alt={`Image ${index}`} title={imageNames[index]}/>*/}
                            <div className="image-name" title={imageNames[index]}>{imageNames[index]}</div>
                        </div>
                    </a>
                ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseReferralType;
