import { createSlice } from "@reduxjs/toolkit";

const referralTypeSlice = createSlice({
  name: "referralType",
  initialState: null,
  reducers: {
    setReferralType: (state, action) => {
      return action.payload;
    },
  },
});

export const { setReferralType } = referralTypeSlice.actions;
export default referralTypeSlice.reducer;