import { createSlice } from "@reduxjs/toolkit";

const reportsSlice = createSlice({
  name: "reports",
  initialState: {
    files: [],
    reportsList: [],
  },
  reducers: {
    updateFiles: (state, action) => {
      state.files = action.payload;
    },
    updateReportsList: (state, action) => {
      state.reportsList = action.payload;
    },
    resetReports: (state) => {
      return {
        files: [],
        reportsList: [],
      }; // Reset the state to its initial value
    },
  },
});

export const { updateFiles, updateReportsList, resetReports } = reportsSlice.actions;
export default reportsSlice.reducer;