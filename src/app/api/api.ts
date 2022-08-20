import axios from 'axios';


const API = axios.create({ baseURL: 'http://localhost:5000' });

// API.interceptors.request.use((req) => {
//   // if() {

//   // }
//   return req;
// });

export const getProducts = () => API.get('/products');
export const createProduct = (product: any) => API.post('/products', product);
export const updateProduct = (id: any, updatedProduct: any) => API.patch('/products', { id, updatedProduct });
export const deleteProduct = (id: any) => API.delete('/products', id);

export const signin = (userData: any) => API.post('/user/signin', userData);
export const signup = (userData: any) => API.post('/user/signup', userData);
export const updateUser = (id: any, updatedUser: any) => API.patch('/user', { id, updatedUser });