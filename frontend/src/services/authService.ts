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

  interface JwtPayload {
    user_id: string;
    exp: number; 
  }
  
  export function parseJwt(token: string): JwtPayload | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error parsing JWT:', error);
      return null;
    }
  }
  
