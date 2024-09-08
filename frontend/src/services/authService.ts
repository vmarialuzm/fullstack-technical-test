import axios from 'axios';
import BASE_URL from '../config';

const api = axios.create({
    baseURL: `${BASE_URL}`, // Cambia esto a tu URL base del backend
  });
  
  export const registerUser = (data: any) => {
    return api.post('/users/register/', data);
  };
  
  export const loginUser = (data: any) => {
    return api.post('/users/login/', data);
  };