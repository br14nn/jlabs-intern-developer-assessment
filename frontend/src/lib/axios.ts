import axios from "axios";

export const backendAPI = axios.create({
  baseURL: "http://backend:8000",
});
