import axios from 'axios';

const BASE_URL = 'http://localhost:8000/users/api/v1/';

const userAPI = () => axios.create({
    baseURL: BASE_URL,
});

export const getAllUsers = async () => {
    try {
        const response = await userAPI().get('user/');
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const createUser = async (user) => {
    try {
        const response = await userAPI().post('user/', user);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const updateUsuario = async (user) => {
    try {
        const response = await userAPI().put(`user/${user.id}/`, user);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const deleteUsuario = async (id) => {
    try {
        const response = await userAPI().delete(`user/${id}/`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getUsuario = async (id) => {
    try {
        const response = await userAPI().get(`user/${id}/`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}