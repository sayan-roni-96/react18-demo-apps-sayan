import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootNewApi } from "../../RootApi";
import axios from "axios";
import { rootNewBaseUrl } from "../../config";
export const getAllMainStudents = createAsyncThunk("student/get", async () => {
    // const response = await axios.get(`${rootBaseUrl}/employees`);
    // const response = await RootNewApi.get(`/student`);
    const response = await axios.get(`${rootNewBaseUrl}/student`);
    console.log('response-get=>', response);
    return response.data;
  });

  export const getSingleStudent = createAsyncThunk(
    "student/view",
    async (viewId) => {
      // console.log('viewId=>', viewId);
      const response = await axios.get(`${rootNewBaseUrl}/student/${viewId}`);
      // console.log('response-view=>', response);
      return response.data;
    }
  );

  export const postNewStudent = createAsyncThunk(
    "student/post",
    async (newAddStudent) => {
      console.log("newAddData=>", newAddStudent);
      const response = await axios.post(`${rootNewBaseUrl}/student/`,newAddStudent);
      //const response = await RootApi.post(`/employee`, newAddStudent);
      console.log("response@@-add=>", response);
      return response.data;
    }
  );

  