import axios from 'axios';
import { IPasswordToUpdate } from '../features/user/types';


const API = axios.create({ baseURL: 'http://localhost:5000' });

// API.interceptors.request.use((req) => {
//   // if() {

//   // }
//   return req;
// });

export const getProducts = (category?: any) => API.get('/products', { params: { category } });
export const getProduct = (id: any) => API.get(`/products/${id}`);
export const createProduct = (product: any) => API.post('/products', { params: { product } });
export const updateProduct = (updatedProduct: any) => API.patch('/products', { params: { updatedProduct } });
export const deleteProduct = (id: any) => API.delete('/products', { params: { id } });

export const getCategories = () => API.get('/categories');
export const createCategory = (category: any) => API.post('/categories', { params: { category } });
export const updateCategory = (updatedCategory: any) => API.patch('/categories', { params: { updatedCategory } });
export const deleteCategory = (id: any) => API.delete('/categories', { params: { id } });

export const getShipping = () => API.get('/shipping');
export const createShipping = (shipping: any) => API.post('/shipping', { params: { shipping } });
export const updateShipping = (updatedShipping: any) => API.patch('/shipping', { params: { updatedShipping } });
export const deleteShipping = (id: any) => API.delete('/shipping', { params: { id } });

export const getOrders = () => API.get('/orders');
export const getUserOrder = (email: any) => API.get('/orders', { params: { email } });
export const createOrder = (order: any) => API.post('/orders', { params: { order } });
export const updateOrder = (updatedOrder: any) => API.patch('/orders', { params: { updatedOrder } });
export const payOrder = (order: any) => API.post('/orders/payment', { params: { order } });
export const deleteOrder = (id: any) => API.delete('/orders', { params: { id } });

export const signin = (userData: any) => API.post('/user/signin', { params: { userData } });
export const signup = (userData: any) => API.post('/user/signup', { params: { userData } });
export const updateUser = (userData: any) => API.patch('/user', { params: { userData } });
export const updatePassword = (passwordData: IPasswordToUpdate) => API.patch('/user/update-password', { params: { passwordData } });
export const deleteUser = (id: any) => API.delete('/user', { params: { id } });

