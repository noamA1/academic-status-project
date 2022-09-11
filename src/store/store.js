import { configureStore } from "@reduxjs/toolkit";
import curriculumReducer from "./curriculum.js";
import gradesReducer from "./grades.js";

export const store = configureStore({
  reducer: {
    curriculum: curriculumReducer,
    grades: gradesReducer,
  },
});
