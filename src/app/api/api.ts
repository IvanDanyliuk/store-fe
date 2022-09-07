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

export const signin = (userData: any) => API.post('/user/signin', { params: { userData } });
export const signup = (userData: any) => API.post('/user/signup', { params: { userData } });
export const updateUser = (userData: any) => API.patch('/user', { params: { userData } });
export const updatePassword = (passwordData: IPasswordToUpdate) => API.patch('/user/update-password', { params: { passwordData } });
export const deleteUser = (id: any) => API.delete('/user', { params: { id } });
