import axios from "axios";
import authHeader from "./authHeader";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: authHeader(),
});

export default api;
