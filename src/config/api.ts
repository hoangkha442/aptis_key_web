import axios from 'axios';
import { userLocalStorage } from './userLocal';
const token = userLocalStorage?.get()?.token
const api = axios.create({
  baseURL: 'http://localhost:8080/', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`, 
  },
});

export default api;
