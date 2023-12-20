// stagesSlice.js

import { createSlice } from "@reduxjs/toolkit";

const detailsSlice = createSlice({
    name: "details",
    initialState: {},
    reducers: {
        updateDetails: (state, action) => {
            const { title, value } = action.payload;
            state[title] = value;
        },
        resetDetails: (state) => {
            return {}
        },
        removeDetailField: (state, action) => {
            const fieldToRemove = action.payload;
            delete state[fieldToRemove];
        },
    },
});  

export const { updateDetails, resetDetails, removeDetailField } = detailsSlice.actions;
export default detailsSlice.reducer;
