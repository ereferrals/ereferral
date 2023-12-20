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
    },
});  

export const { updateDetails, resetDetails, removeDetailField } = detailsSlice.actions;
export default detailsSlice.reducer;
