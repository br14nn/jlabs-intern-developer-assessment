import axios from "axios";

export const ipInfoAPI = axios.create({
  baseURL: "https://ipinfo.io",
});

export const backendAPI = axios.create({
  baseURL: "https://jlabs-intern-developer-assessment-backend.onrender.com",
});
