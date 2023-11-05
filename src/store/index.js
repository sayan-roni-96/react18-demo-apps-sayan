import { configureStore, createReducer } from '@reduxjs/toolkit';
import employeeMainSlice from './reducers/employeeMainSlice';
export const reduxStore = configureStore({
  reducer: {
    employee: employeeMainSlice,
  },
});
