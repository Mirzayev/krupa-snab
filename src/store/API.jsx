import axios from "axios";
import {data} from "autoprefixer";


const API = axios.create({
    baseURL: 'https://dotnet-csharp.uz/api'
})



API.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');

        if (token){
            config.headers['Authorization'] =  `Bearer ${token}`
        }

        return config;

    },

    error => {
        return Promise.reject(error)
    }
)






export default API