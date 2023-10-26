import { createSlice } from "@reduxjs/toolkit";

const userValidationSlice = createSlice({
    name: "userValidationStep",
    initialState: 0,
    reducers: {
        setUserValidationStep: (state, action) => {
            return action.payload;
          },
    },
});  

export const { setUserValidationStep } = userValidationSlice.actions;
export default userValidationSlice.reducer;
