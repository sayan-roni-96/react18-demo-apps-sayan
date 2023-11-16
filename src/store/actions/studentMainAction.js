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