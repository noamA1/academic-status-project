import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedYear: "",
  selectedProgram: "",
  fileType: "",
  fileName: "",

  isUploaded: false,
};
export const curriculumSlice = createSlice({
  name: "curriculum",
  initialState,
  reducers: {
    setFile(state, action) {
      state.fileName = action.payload.value;
      state.isUploaded = false;
    },
    upload(state) {
      state.isUploaded = true;
    },
    reset(state) {
      state.selectedYear = null;
      state.selectedProgram = null;
      state.fileType = null;
      state.fileName = null;
      state.isUploaded = false;
    },
    setOptions(state, action) {
      switch (action.payload.type) {
        case "programs":
          state.selectedProgram = action.payload.value;
          break;
        case "files":
          state.fileType = action.payload.value;
          break;
        case "years":
          state.selectedYear = action.payload.value;
          break;
        default:
          break;
      }
    },
  },
});

export const { setFile, setOptions, upload, reset } = curriculumSlice.actions;

export default curriculumSlice.reducer;
