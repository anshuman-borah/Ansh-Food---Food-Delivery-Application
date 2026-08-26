import axios from "axios";
export const API_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://ansh-food-backend.onrender.com" // <-- REPLACE THIS WITH YOUR REAL DEPLOYED BACKEND URL (NO trailing slash)
    : "http://localhost:5454");

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
