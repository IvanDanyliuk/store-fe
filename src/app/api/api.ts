import axios from 'axios';


const API = axios.create({ baseURL: 'http://localhost:5000' });

// API.interceptors.request.use((req) => {
//   // if() {

//   // }
//   return req;
// });

export const getProducts = (category?: any) => API.get('/products', { params: { category } });
export const getProduct = (id: any) => API.get(`/products/${id}`);
export const createProduct = (product: any) => API.post('/products', { params: { product } });
export const updateProduct = (id: any, updatedProduct: any) => API.patch('/products', { id, updatedProduct });
export const deleteProduct = (id: any) => API.delete('/products', id);

export const getCategories = () => API.get('/categories');
export const createCategory = (category: any) => API.post('/categories', { params: { category } });
export const updateCategory = (updatedCategory: any) => API.patch('/categories', { params: { updatedCategory } });
export const deleteCategory = (id: any) => API.delete('/categories', { params: { id } });

export const signin = (userData: any) => API.post('/user/signin', userData);
export const signup = (userData: any) => API.post('/user/signup', userData);
export const updateUser = (id: any, updatedUser: any) => API.patch('/user', { id, updatedUser });