import axios from "axios";
import BookModel from "../Models/BookModel";
import { getToken } from "./AuthService";

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = getToken();
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

const baseUrl: string = "http://localhost:8080/api/books";

export const fetchBooksForCarousel = async () => {
    
    const url: string = `${baseUrl}?page=0&size=9`;
    const response = await axios.get(url);
    const responseData = response.data.content;
    return responseData;  
}

export const fetchBooksForSearch = async (searchUrl: string, currentPage: number, booksPerPage: number) => {
  let url: string = '';
  if (searchUrl === '') {
      url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
  }
  else {
      let searchWithPage = searchUrl.replace('<pageNumber>',`${currentPage - 1}`);
      url = `${baseUrl}${searchWithPage}`;
  }
  const response = await axios.get(url);
  const responseData = response.data;
  return responseData;
  
}

export const fetchBookById = async(bookId: number) => {

  const url: string = `${baseUrl}/${bookId}`;
  const response = await axios.get(url);
  return response.data;

}

export const addBook = async(book: any) => {
  const response = await axios.post(baseUrl,book);
  return response.data;
}

export const updateBook = async(book: BookModel) => {
  const response = await axios.put(baseUrl,book);
  return response.data;
}

export const deleteBook = async(bookId: number) => {
  const response = await axios.delete(`${baseUrl}?bookId=${bookId}`);
  return response.data;
}


