import axios from "axios";
import { getToken } from "./AuthService"

const baseUrl: string = "http://localhost:8080/api/checkout";

axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export const getLoanCount = async() =>{
    const response = await axios.get(`${baseUrl}/loanCountByUsername`);
    return response.data;
}

export const isBookCheckout = async(bookId: number | undefined) =>{
    const response = await axios.get(`${baseUrl}/isBookCheckout?bookId=${bookId}`);
    return response.data;
}

export const addCheckout = async(bookId: number | undefined) =>{
  const response = await axios.post(`${baseUrl}?bookId=${bookId}`);
  return response.data;
}

export const getLoansByUsername = async() =>{
  const response = await axios.get(`${baseUrl}/loansByUsername`);
  return response.data;
}

export const returnBook = async(checkoutId: number) => {
  const response = await axios.delete(`${baseUrl}?checkoutId=${checkoutId}`);
  return response.data;
}

export const renewLoan = async(checkoutId: number) => {
  const response = await axios.put(`${baseUrl}?checkoutId=${checkoutId}`);
  return response.data;
}

