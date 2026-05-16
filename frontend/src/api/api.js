import axios from "axios";

console.log(">>> API CONFIG VERSION 3.0 ACTIVE <<<");
console.log("VITE_API_URL value:", import.meta.env.VITE_API_URL);


const rawBaseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Ensure we have a clean base URL without trailing slash, then append /api if missing
const sanitizedBaseURL = rawBaseURL.replace(/\/+$/, "");
const baseURL = sanitizedBaseURL.endsWith("/api") ? sanitizedBaseURL : `${sanitizedBaseURL}/api`;

console.log("Connect to API at:", baseURL);

const API = axios.create({
  baseURL,
});

// IMPORTANT: attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN:", token); // debug line

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;