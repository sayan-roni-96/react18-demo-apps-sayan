import { createSlice } from '@reduxjs/toolkit';
import { getAllMainEmployees } from '../actions/employeeMainAction';

const initialState = {
  allEmployeeData: [],
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
      console.log('action=>', action);
      state.isLoading = false;
      state.allEmployeeData = action.payload;
      state.message = 'Employee data fetched!';
    });

    builder.addCase(getAllMainEmployees.rejected, (state, action) => {
      state.isLoading = false;
      state.allEmployeeData = [];
      state.message = 'Something Went Wrong!';
    });
  },
});

export default employeeMainSlice.reducer;
