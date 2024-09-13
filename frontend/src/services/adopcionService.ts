import axios from 'axios';
import BASE_URL from '../config';

const API_URL = `${BASE_URL}/adopciones`; 

// Función para obtener el token del localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const getAllAdopciones = async () => {
  const token = getAuthToken();
  return await axios.get(`${API_URL}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};


export const createAdopcion = async (adopcion: any) => {
  const token = getAuthToken();
  try {
    const response = await axios.post(`${API_URL}/`, adopcion, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    alert('Adopcion solicitada correctamente')

  } catch (error) {
    alert(error)
  }
};

export const updateAdopcion = async (id: string, adopcion: any) => {
  const token = getAuthToken();
  return await axios.put(`${API_URL}/${id}/`, adopcion, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};

export const deleteAdopcion = async (id: string) => {
  const token = getAuthToken();
  return await axios.delete(`${API_URL}/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};