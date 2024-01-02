import { createSlice } from "@reduxjs/toolkit";

const sharedStringsSlice = createSlice({
    name: "sharedStrings",
    initialState: {
        leftNavClearLinkText: "Patient",
        ReferrerEmail: "",
        enablePatientMandatory: false,
        enableNOKMandatory: false,
        enableReferMandatory: false,
        enableTTCMandatory: false
    },
    reducers: {
        setLeftNavClearLinkText: (state, action) => {
            state.leftNavClearLinkText = action.payload;
        },
        setReferrerEmail: (state, action) => {
            state.ReferrerEmail = action.payload;
        },
        setPatientMandatory: (state, action) => {
            state.enablePatientMandatory = action.payload;
        },
        setNOKMandatory: (state, action) => {debugger
            state.enableNOKMandatory = action.payload;
        },
        setReferMandatory: (state, action) => {
            state.enableReferMandatory = action.payload;
        },
        setTTCMandatory: (state, action) => {
            state.enableTTCMandatory = action.payload;
        },
        resetMandatory: (state) => {
            state.enablePatientMandatory = false
            state.enableNOKMandatory = false
            state.enableReferMandatory = false
            state.enableTTCMandatory = false
        }
    },
});  

export const { setLeftNavClearLinkText, setReferrerEmail, setPatientMandatory, setNOKMandatory,
    setReferMandatory, setTTCMandatory, resetMandatory } = sharedStringsSlice.actions;
export default sharedStringsSlice.reducer;
