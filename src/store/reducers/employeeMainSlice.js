import { createSlice } from "@reduxjs/toolkit";
import {
  editExistEmployee,
  getAllMainEmployees,
  getSingleEmployee,
  postNewEmployee,
} from "../actions/employeeMainAction";

const initialState = {
  allEmployeeData: [],
  singleEmployee: {},
  isLoading: false,
  message: "",
};

const employeeMainSlice = createSlice({
  name: "employeeMainSlice",
  initialState: initialState,
  reducers: {},

  extraReducers: function (builder) {
    //Fetch All Employees
    builder.addCase(getAllMainEmployees.pending, (state) => {
      state.isLoading = true;
      state.message = "Employee data fetch panding!";
    });

    builder.addCase(getAllMainEmployees.fulfilled, (state, action) => {
      // console.log("action=>", action);
      state.isLoading = false;
      state.allEmployeeData = action.payload;
      state.message = "Employee data fetched!";
    });

    builder.addCase(getAllMainEmployees.rejected, (state, action) => {
      state.isLoading = false;
      state.allEmployeeData = [];
      state.message = "Something Went Wrong!";
    });

    // Add employee/post
    builder.addCase(postNewEmployee.pending, (state) => {
      state.isLoading = true;
      state.message = "Employee data add panding!";
    });

    builder.addCase(postNewEmployee.fulfilled, (state, action) => {
      // console.log("postNewEmployee=fulfilled=>", action);
      state.isLoading = false;
      state.allEmployeeData = [...state.allEmployeeData, action.payload];
      state.message = "Employee data added!";
    });

    builder.addCase(postNewEmployee.rejected, (state, action) => {
      // console.log("postNewEmployee=rejected=>", action);

      state.isLoading = false;
      state.allEmployeeData = action.payload;
      state.message = "Something Went Wrong!";
    });

    // Fetch Single Employee
    builder.addCase(getSingleEmployee.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSingleEmployee.fulfilled, (state, action) => {
      // console.log("getSingleEmployee-action=>", action);
      state.isLoading = false;
      state.singleEmployee = action.payload;
      state.message = "Single employee data fetched!";
    });
    builder.addCase(getSingleEmployee.rejected, (state) => {
      state.isLoading = false;
      state.singleEmployee = {};
      state.message = "Something Went Wrong!";
    });

    // Add employee/post
    builder.addCase(editExistEmployee.pending, (state) => {
      state.isLoading = true;
      state.message = "Employee data edit panding!";
    });

    builder.addCase(editExistEmployee.fulfilled, (state, action) => {
      console.log("editExistEmployee=fulfilled=>", action);
      state.isLoading = false;
      state.allEmployeeData = [...state.allEmployeeData, action.payload];
      state.message = "Employee data updated!";
    });

    builder.addCase(editExistEmployee.rejected, (state, action) => {
      console.log("editExistEmployee=rejected=>", action);

      state.isLoading = false;
      state.allEmployeeData = action.payload;
      state.message = "Something Went Wrong!";
    });
  },
});

export default employeeMainSlice.reducer;
