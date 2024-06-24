import axios from "axios";
import { getToken } from "./AuthService";


const baseUrl: string = `http://localhost:8080/api/history`;

axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export const getHistoryByUsername = async(currentPage: number) => {
    const response = await axios.get(`${baseUrl}/historyByUsername?&page=${currentPage - 1}&size=5`);
    return response.data;
}