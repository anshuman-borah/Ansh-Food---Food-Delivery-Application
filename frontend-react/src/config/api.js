import axios from 'axios';

export const API_URL = "https://ansh-food-frontend.vercel.app";


export const api = axios.create({
  baseURL: API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});


