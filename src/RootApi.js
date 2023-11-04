import axios from 'axios';
import { rootBaseUrl } from './config';
export const RootApi = axios.create({
  baseURL: rootBaseUrl,
});
