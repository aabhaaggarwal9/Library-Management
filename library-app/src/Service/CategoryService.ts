import axios from "axios";
import CategoryModel from "../Models/CategoryModel";
import { getToken } from "./AuthService";

const baseUrl: string = "http://localhost:8080/api/categories";

axios.interceptors.request.use(function (config) {
     config.headers['Authorization'] = getToken();
     return config;
   }, function (error) {
     // Do something with request error
     return Promise.reject(error);
   });

export const fetchCategories = async() =>{
     const response = await axios.get(baseUrl);
     return response.data;
}

export const addCategory = async(categoryName: string) => {
     const response = await axios.post(`${baseUrl}?categoryName=${categoryName}`);
     return response.data;
}

export const updateCategory = async(category: CategoryModel) => {
     const response = await axios.put(baseUrl,category);
     return response.data;
}

export const deleteCategory = async(categoryId: number) => {
     const response = await axios.delete(`${baseUrl}?categoryId=${categoryId}`);
     return response.data;
}
