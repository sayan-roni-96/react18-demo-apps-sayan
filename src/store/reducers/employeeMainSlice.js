import { createSlice } from '@reduxjs/toolkit';
import { getAllMainEmployees } from '../actions/employeeMainAction';

const initialState = {
  allEmployeeData: [],
  message: '',
};

const employeeMainSlice = createSlice({
  name: 'employeeMainSlice',
  initialState: initialState,
  reducers: {},

  extraReducers: function(builder) {
    //Fetch All Employees
    builder.addCase(getAllMainEmployees.pending, (state) => {
      state.message = 'Employee data fetch panding!';
    });

    builder.addCase(getAllMainEmployees.fulfilled, (state, action) => {
      state.allEmployeeData = action.payload;
      state.message = 'Employee data fetched!';
    });

    builder.addCase(getAllMainEmployees.rejected, (state, action) => {
      state.allEmployeeData = [];
      state.message = 'Something Went Wrong!';
    });
  },
});

export default employeeMainSlice.reducer;
