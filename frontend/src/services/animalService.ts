import axios from 'axios';
import BASE_URL from '../config';

const API_URL = `${BASE_URL}/animales`; 

// Función para obtener el token del localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const getAllAnimals = async () => {
  const token = getAuthToken();
  return await axios.get(`${API_URL}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};

export const createAnimal = async (animal: any) => {
  const token = getAuthToken();
  return await axios.post(`${API_URL}/`, animal, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};

export const updateAnimal = async (id: string, animal: any) => {
  const token = getAuthToken();
  return await axios.put(`${API_URL}/${id}/`, animal, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};

export const deleteAnimal = async (id: string) => {
  const token = getAuthToken();
  return await axios.delete(`${API_URL}/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};
