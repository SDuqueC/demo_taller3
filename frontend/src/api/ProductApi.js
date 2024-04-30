import axios from 'axios';

const BASE_URL = 'http://localhost:8000/products/api/v1/';

const productApi = () => axios.create({
    baseURL: BASE_URL,
});

export const getAllProducts = async () => {
    try {
        const response = await productApi().get('product/');
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const createProduct = async (product) => {
    try {
        const response = await productApi().post('product/', product);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const updateProduct = async (product) => {
    try {
        const response = await productApi().put(`product/${product.id}/`, product);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await productApi().delete(`product/${id}/`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getProduct = async (id) => {
    try {
        const response = await productApi().get(`product/${id}/`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getProductsByBrand = async (product) => {
    try {
        const response = await productApi().get(`por_marca/, params: { product.brand }`);
        return response.data;
    } catch (error) {
        console.error(error)
        return null;
    }
}

export const getProductsByCategory = async (product) => {
    try {
        const response = await productApi().get(`por_categoria/, params: { product.category }`);
        return response.data;
    } catch (error) {
        console.error(error)
        return null;
    }
}

export const getQuantityByBrand = async () => {
    try {
        const response = await productApi().get('product/quantity_by_brand/');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getQuantityByCategory = async () => {
    try {
        const response = await productApi().get('product/quantity_by_category/');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getQuantityByPrice = async () => {
    try {
        const response = await productApi().get('product/quantity_by_price/');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getQuantityByStock = async () => {
    try {
        const response = await productApi().get('product/quantity_by_stock/');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}