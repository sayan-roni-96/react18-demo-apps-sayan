import { createSlice } from "@reduxjs/toolkit";
import { getAllMainStudents, getSingleStudent, postNewStudent } from "../actions/studentMainAction";
const initialState = {
    allStudentData: [],
    singleStudent: {},
    isLoading: false,
    message: "",
  };


const studentMainSlice = createSlice({
    name: "studentMainSlice",
    initialState: initialState,
    reducers: {},
  
    extraReducers: function (builder) {
      //Fetch All Student
      builder.addCase(getAllMainStudents.pending, (state) => {
        state.isLoading = true;
        state.message = "Student data fetch panding!";
      });
  
      builder.addCase(getAllMainStudents.fulfilled, (state, action) => {
        console.log("action=>", action);
        state.isLoading = false;
        state.allStudentData = action.payload;
        state.message = "Student data fetched!";
      });
  
      builder.addCase(getAllMainStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.allStudentData = [];
        state.message = "Something Went Wrong!";
      });
      // Fetch Single Student
    builder.addCase(getSingleStudent.pending, (state) => {
        state.isLoading = true;
      });

      builder.addCase(getSingleStudent.fulfilled, (state, action) => {
        console.log("getSingleStudent-action=>", action);
        state.isLoading = false;
        state.singleStudent = action.payload;
        state.message = "Single Student data fetched!";
      });

      builder.addCase(getSingleStudent.rejected, (state) => {
        state.isLoading = false;
        state.singleStudent = {};
        state.message = "Something Went Wrong!";
      });

      // Add employee/post
    builder.addCase(postNewStudent.pending, (state) => {
        state.isLoading = true;
        state.message = "Employee data add panding!";
      });
  
      builder.addCase(postNewStudent.fulfilled, (state, action) => {
        console.log("postNewStudent=fulfilled=>", action);
        state.isLoading = false;
        state.allStudentData = [...state.allStudentData, action.payload];
        state.message = "Employee data added!";
      });
  
      builder.addCase(postNewStudent.rejected, (state, action) => {
        console.log("postNewStudent=rejected=>", action);
  
        state.isLoading = false;
        state.allEmployeeData = action.payload;
        state.message = "Something Went Wrong!";
      });
    },
 });

    export default studentMainSlice.reducer;  