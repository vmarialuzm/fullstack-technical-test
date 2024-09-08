import axios from 'axios';
import BASE_URL from '../config';

const api = axios.create({
    baseURL: `${BASE_URL}/users`,
  });
  
  export const registerUser = (data: any) => {
    return api.post('/register/', data);
  };
  
  export const loginUser = (data: any) => {
    return api.post('/login/', data);
  };