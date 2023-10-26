import { createSlice } from "@reduxjs/toolkit";

const stagesSlice = createSlice({
  name: "stage",
  initialState: {
    currentStage: null,
    stagesData: []
  },
  reducers: {
    setStage: (state, action) => {
      state.currentStage = action.payload;
    },
    setStagesList: (state, action) => {
      state.stagesData = action.payload;
    },
  },
});

export const { setStage, setStagesList } = stagesSlice.actions;
export default stagesSlice.reducer;
