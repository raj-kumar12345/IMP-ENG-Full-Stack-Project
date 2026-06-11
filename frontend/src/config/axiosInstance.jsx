import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://imp-eng-full-stack-project-1.onrender.com',
    withCredentials: true,   
})

