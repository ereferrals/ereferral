import { createSlice } from "@reduxjs/toolkit";

const sharedStringsSlice = createSlice({
    name: "sharedStrings",
    initialState: {
        leftNavClearLinkText: "Patient",
        ReferrerEmail: ""
    },
    reducers: {
        setLeftNavClearLinkText: (state, action) => {
            state.leftNavClearLinkText = action.payload;
        },
        setReferrerEmail: (state, action) => {
            state.ReferrerEmail = action.payload;
        },
    },
});  

export const { setLeftNavClearLinkText, setReferrerEmail } = sharedStringsSlice.actions;
export default sharedStringsSlice.reducer;
