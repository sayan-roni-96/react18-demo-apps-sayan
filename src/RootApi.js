import axios from 'axios';
import { rootBaseUrl, rootNewBaseUrl } from './config';
export const RootApi = axios.create({
  baseURL: rootBaseUrl,
});
export const RootNewApi = axios.create({
  baseNewURL: rootNewBaseUrl,
});