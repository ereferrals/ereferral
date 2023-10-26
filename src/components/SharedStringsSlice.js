import { createSlice } from "@reduxjs/toolkit";

const sharedStringsSlice = createSlice({
    name: "sharedStrings",
    initialState: {
        leftNavClearLinkText: "Patient"
    },
    reducers: {
        setLeftNavClearLinkText: (state, action) => {
            state.leftNavClearLinkText = action.payload;
        },
    },
});  

export const { setLeftNavClearLinkText } = sharedStringsSlice.actions;
export default sharedStringsSlice.reducer;
