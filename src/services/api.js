import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.DEV ? "/api" : "http://67.211.219.18/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
