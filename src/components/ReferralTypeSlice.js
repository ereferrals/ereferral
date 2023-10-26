import { createSlice } from "@reduxjs/toolkit";

const referralTypeStageSlice = createSlice({
    name: "referralTypeStageStep",
    initialState: 0,
    reducers: {
        setReferralTypeStageStep: (state, action) => {
            return action.payload;
          },
    },
});  

export const { setReferralTypeStageStep } = referralTypeStageSlice.actions;
export default referralTypeStageSlice.reducer;
