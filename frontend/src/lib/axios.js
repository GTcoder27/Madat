import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.BACKEND_URL || "http://localhost:3000/api",
    withCredentials: true,  // to send cookies with requests
}) 


