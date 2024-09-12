import axios from 'axios';
import BASE_URL from '../config';

const API_URL = `${BASE_URL}/users`; 

// Función para obtener el token del localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const getUsersByType = async (tipo: string) => {
  const token = getAuthToken();
  return await axios.get(`${API_URL}/list/`, {
    params: { tipo },
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};

export const updateUser = async (id: string, userData: any) => {
  const token = getAuthToken();
  return await axios.put(`${API_URL}/list/${id}/`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};

export const deleteUser = async (id: string) => {
const token = getAuthToken();
  return await axios.delete(`${API_URL}/list/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};



