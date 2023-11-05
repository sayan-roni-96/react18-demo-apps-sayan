import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootApi } from '../../RootApi';

export const getAllMainEmployees = createAsyncThunk(
  'employee/get',
  async () => {
    // const response = await axios.get(`${rootBaseUrl}/employees`);
    const response = await RootApi.get(`/employee`);
    console.log('response-get', response);
    return response.data;
  }
);
