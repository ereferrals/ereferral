import { createSlice } from "@reduxjs/toolkit";

const referralSubmissionSlice = createSlice({
    name: "referralSubmissionStep",
    initialState: 0,
    reducers: {
        setReferralSubmissionStep: (state, action) => {
            return action.payload;
          },
    },
});  

export const { setReferralSubmissionStep } = referralSubmissionSlice.actions;
export default referralSubmissionSlice.reducer;
