import { configureStore, createReducer } from "@reduxjs/toolkit";
import employeeMainSlice from "./reducers/employeeMainSlice";
import studentMainSlice from "./reducers/studentMainSlice";
export const reduxStore = configureStore({
  reducer: {
    employee: employeeMainSlice,
    student: studentMainSlice,
  },
});
