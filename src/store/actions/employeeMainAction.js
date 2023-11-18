import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootApi } from "../../RootApi";

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
    // console.log("newAddData=>", newAddData);
    const response = await RootApi.post(`/employee`, newAddData);
    // console.log("response@@-add=>", response);
    return response.data;
  }
);

export const editExistEmployee = createAsyncThunk(
  "employee/edit",
  async ({ eid, newFormData }) => {
    // console.log("newFormData=>", newFormData);
    // console.log("eid=>", eid);
    const response = await RootApi.put(`/employee/${eid}`, newFormData);
    // console.log("response@@-edit=>", response);
    return response.data;
  }
);

export const deleteAnEmployee = createAsyncThunk(
  "employee/delete",
  async (did) => {
    console.log("did=>", did);
    const response = await RootApi.delete(`/employee/${did}`);
    // console.log("response@@-edit=>", response);
    return response.data;
  }
);
