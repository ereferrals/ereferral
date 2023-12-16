// rootReducer.js

import { combineReducers } from "@reduxjs/toolkit";
import referralTypeReducer from "./ChooseReferralType/ChooseReferralTypeSlice";
import stagesReducer from "./ChooseStages/StagesSlice";
import detailsReducer from "./DetailsSlice"
import reportsReducer from "./Reports/ReportsSlice"
import appReducer from "./AppSlice"
import referralTypeStageReducer from "./ReferralTypeSlice"
import referralSubmissionReducer from "./ReferralSubmissionSlice"
import userValidationReducer from "./UserValidation/UserValidationSlice"
import emailReducer from "./EmailOTPRequest/EmailSlice"
import masterDataReducer from "./MasterDataSlice"
import sharedStringsReducer from "./SharedStringsSlice"

const rootReducer = combineReducers({
  referralType: referralTypeReducer,
  stage: stagesReducer,
  details: detailsReducer,
  reports: reportsReducer,
  appStep: appReducer,
  referralTypeStageStep: referralTypeStageReducer,
  referralSubmissionStep: referralSubmissionReducer,
  userValidationStep: userValidationReducer,
  email: emailReducer,
  masterData: masterDataReducer,
  sharedStrings: sharedStringsReducer
});

export default rootReducer;
