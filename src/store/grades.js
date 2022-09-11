import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  gradesFile: "",
  isUploaded: false,
};
export const gradesSlice = createSlice({
  name: "grades",
  initialState,
  reducers: {
    setFile(state, action) {
      state.gradesFile = action.payload.value;
      state.isUploaded = false;
    },
    upload(state) {
      state.isUploaded = true;
    },
    resetGrades(state) {
      state.gradesFile = null;
      state.isUploaded = false;
    },
  },
});

export const { setFile, resetGrades } = gradesSlice.actions;

export default gradesSlice.reducer;
