import axios from "axios";
import { getToken } from "./AuthService";

const baseUrl: string = `http://localhost:8080/api/reviews`;

axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export const fetchReviewsByBook = async (bookId: number) => {
    const url: string = `${baseUrl}/findByBook?bookId=${bookId}`;
    const response = await axios.get(url);
    return response.data.content;
}

export const fetchReviewsByBookWithPagination = async (bookId: number, page: number, size: number) => {
    const url: string = `${baseUrl}/findByBook?bookId=${bookId}&page=${page}&size=${size}`;
    const response = await axios.get(url);
    return response.data;
}

export const addReview = async(reviewPayload: any) => {
    const response = await axios.post(baseUrl,reviewPayload);
    return response.data; 
}

export const reviewBookByUser = async(bookId: any) => {
    const response = await axios.get(`${baseUrl}/reviewBookByUser?bookId=${bookId}`);
    return response.data; 
}