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

  export const editExistStudent = createAsyncThunk(
    "student/edit",
    async ({ sid, newFormData }) => {
      // console.log("newFormData=>", newFormData);
      // console.log("eid=>", eid);
      const response = await axios.put(`${rootNewBaseUrl}/student/${sid}`, newFormData);
      // console.log("response@@-edit=>", response);
      return response.data;
    }
  );

  export const deleteAnStudent = createAsyncThunk(
    "student/delete",
    async (studid) => {
      console.log("did=>", studid);
      //const response = await RootApi.delete(`/employee/${studid}`);
      const response = await axios.delete(`${rootNewBaseUrl}/student/${studid}`);
      // console.log("response@@-edit=>", response);
      return response.data;
    }
  );
  