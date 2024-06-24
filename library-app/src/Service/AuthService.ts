import axios from "axios";

const baseUrl: string = "http://localhost:8080/api/auth";

export const loginAPI = async (loginPayload: any) => {
    const response = await axios.post(`${baseUrl}/login`, loginPayload);
    const token = response.data.accessToken;
    const role = response.data.role;
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    return response.data;
}

export const register = async (registerPayload: any) => {
    const response = await axios.post(`${baseUrl}/register`, registerPayload);
    return response;
}

export const getToken = () => {
    return localStorage.getItem('token');
}
export const getRole = () => {
    return localStorage.getItem('role');
}

export const isUserLoggedIn = () => {
    const token = getToken();
    if (token === null) {
        return false;
    }
    else {
        return true;
    }
}

export const logoutAPI = () => {
    localStorage.clear();
}



