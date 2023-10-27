import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "appStep",
    initialState: 0,//checkonce
    reducers: {
        setAppStep: (state, action) => {
            return action.payload;
          },
    },
});  

export const { setAppStep } = appSlice.actions;
export default appSlice.reducer;
