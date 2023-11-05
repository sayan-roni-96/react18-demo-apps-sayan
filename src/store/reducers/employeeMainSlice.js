import { createSlice } from '@reduxjs/toolkit';
import {
  getAllMainEmployees,
  getSingleEmployee,
} from '../actions/employeeMainAction';

const initialState = {
  allEmployeeData: [],
  singleEmployee: {},
  isLoading: false,
  message: '',
};

const employeeMainSlice = createSlice({
  name: 'employeeMainSlice',
  initialState: initialState,
  reducers: {},

  extraReducers: function (builder) {
    //Fetch All Employees
    builder.addCase(getAllMainEmployees.pending, (state) => {
      state.isLoading = true;
      state.message = 'Employee data fetch panding!';
    });

    builder.addCase(getAllMainEmployees.fulfilled, (state, action) => {
      // console.log('action=>', action);
      state.isLoading = false;
      state.allEmployeeData = action.payload;
      state.message = 'Employee data fetched!';
    });

    builder.addCase(getAllMainEmployees.rejected, (state, action) => {
      state.isLoading = false;
      state.allEmployeeData = [];
      state.message = 'Something Went Wrong!';
    });

    // Fetch Single Employee
    builder.addCase(getSingleEmployee.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSingleEmployee.fulfilled, (state, action) => {
      console.log('getSingleEmployee-action=>', action);
      state.isLoading = false;
      state.singleEmployee = action.payload;
      state.message = 'Single employee data fetched!';
    });
    builder.addCase(getSingleEmployee.rejected, (state) => {
      state.isLoading = false;
      state.singleEmployee = {};
      state.message = 'Something Went Wrong!';
    });
  },
});

export default employeeMainSlice.reducer;
