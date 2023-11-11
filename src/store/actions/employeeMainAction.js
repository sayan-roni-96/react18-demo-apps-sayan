import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootApi, RootNewApi } from "../../RootApi";

export const getAllMainEmployees = createAsyncThunk(
  "employee/get",
  async () => {
    // const response = await axios.get(`${rootBaseUrl}/employees`);
    const response = await RootApi.get(`/employee`);
    // console.log('response-get=>', response);
    return response.data.reverse();
  }
);

export const getSingleEmployee = createAsyncThunk(
  "employee/view",
  async (viewId) => {
    // console.log('viewId=>', viewId);
    const response = await RootApi.get(`/employee/${viewId}`);
    // console.log('response-view=>', response);
    return response.data;
  }
);

export const postNewEmployee = createAsyncThunk(
  "employee/post",
  async (newAddData) => {
    console.log("newAddData=>", newAddData);
    const response = await RootApi.post(`/employee`, newAddData);
    console.log("response@@-add=>", response);
    return response.data;
  }
);

//this is for new user
export const getAllMainUsers = createAsyncThunk("users/get", async () => {
  // const response = await axios.get(`${rootBaseUrl}/employees`);
  const response = await RootNewApi.get(`/users`);
  // console.log('response-get=>', response);
  return response.data.reverse();
});
