import { createSlice } from "@reduxjs/toolkit";
import { deleteAnStudent, editExistStudent, getAllMainStudents, getSingleStudent, postNewStudent } from "../actions/studentMainAction";
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

      // Add student/post
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
        state.allStudentData = action.payload;
        state.message = "Something Went Wrong!";
      });

      // Edit Student/post
    builder.addCase(editExistStudent.pending, (state) => {
      state.isLoading = true;
      state.message = "Employee data edit panding!";
    });

    builder.addCase(editExistStudent.fulfilled, (state, action) => {
      // console.log("editExistEmployee=fulfilled=>", action);
      state.isLoading = false;
      state.allStudentData = [...state.allStudentData, action.payload];
      state.message = "Employee data updated!";
    });

    builder.addCase(editExistStudent.rejected, (state, action) => {
      // console.log("editExistEmployee=rejected=>", action);

      state.isLoading = false;
      state.allStudentData = action.payload;
      state.message = "Something Went Wrong!";
    });

       // delete student/delete
    builder.addCase(deleteAnStudent.pending, (state) => {
      state.isLoading = true;
      state.message = "Delete Student Data panding!";
    });

    builder.addCase(deleteAnStudent.fulfilled, (state, action) => {
      console.log("deleteAnStudent=fulfilled=>", action);
      state.isLoading = false;
      state.allStudentData = [...state.allStudentData, action.payload];
      state.message = "Student data deleted!";
    });

    builder.addCase(deleteAnStudent.rejected, (state, action) => {
      console.log("deleteAnStudent=rejected=>", action);

      state.isLoading = false;
      state.allStudentData = action.payload;
      state.message = "Something Went Wrong!";
    });
      
    },
 });

    export default studentMainSlice.reducer;  