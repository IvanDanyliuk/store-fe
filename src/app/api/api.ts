import axios from 'axios';
import { IPasswordToUpdate } from '../features/user/types';


const API = axios.create({ baseURL: 'http://localhost:5000' });

// API.interceptors.request.use((req) => {
//   // if() {

//   // }
//   return req;
// });

export const getProducts = (page: number, productsPerPage: number, category?: string | undefined, filterData?: any) => API.get('/products', { params: { page, productsPerPage, category, filterData } });
export const getTopProducts = () => API.get('/products/top-rated');
export const getProduct = (id: any) => API.get(`/products/${id}`);
export const getBrands = (category: any) => API.get('/products/brands', { params: { category } });
export const createProduct = (product: any) => API.post('/products', { params: { product } });
export const updateProduct = (updatedProduct: any) => API.patch('/products', { params: { updatedProduct } });
export const deleteProduct = (id: any) => API.delete('/products', { params: { id } });

export const getUserReviews = (email: any) => API.get('/reviews/user', { params: { email } });
export const getProductReviews = (productId: any) => API.get('/reviews/product', { params: { productId } });
export const createReview = (review: any) => API.post('/reviews', { params: { review } });
export const updateReview = (updatedReview: any) => API.patch('/reviews', { params: { updatedReview } });
export const deleteReview = (id: any) => API.delete('/reviews', { params: { id } });

export const getCategories = () => API.get('/categories');
export const createCategory = (category: any) => API.post('/categories', { params: { category } });
export const updateCategory = (updatedCategory: any) => API.patch('/categories', { params: { updatedCategory } });
export const deleteCategory = (id: any) => API.delete('/categories', { params: { id } });

export const getShipping = () => API.get('/shipping');
export const createShipping = (shipping: any) => API.post('/shipping', { params: { shipping } });
export const updateShipping = (updatedShipping: any) => API.patch('/shipping', { params: { updatedShipping } });
export const deleteShipping = (id: any) => API.delete('/shipping', { params: { id } });

export const getOrders = (page: number, ordersPerPage: number, filterData?: string) => API.get('/orders/admin', { params: { page, ordersPerPage, filterData } });
export const getUserOrder = (page: number, ordersPerPage: number, email: string) => API.get('/orders/user', { params: { page, ordersPerPage, email } });
export const createOrder = (order: any) => API.post('/orders', { params: { order } });
export const updateOrder = (updatedOrder: any) => API.patch('/orders', { params: { updatedOrder } });
export const payOrder = (order: any) => API.post('/orders/payment', { params: { order } });
export const deleteOrder = (id: any) => API.delete('/orders', { params: { id } });

export const getVacancies = (page: number, itemsPerPage: number) => API.get('/vacancies', { params: { page, itemsPerPage }});
export const getVacancy = (id: any) => API.get(`/vacancies/${id}`);
export const createVacancy = (vacancy: any) => API.post('/vacancies', { params: { vacancy } });
export const updateVacancy = (updatedVacancy: any) => API.patch('/vacancies', { params: { updatedVacancy } });
export const deleteVacancy = (id: any) => API.delete('/vacancies', { params: { id } });

export const signin = (userData: any) => API.post('/user/signin', { params: { userData } });
export const signup = (userData: any) => API.post('/user/signup', { params: { userData } });
export const updateUser = (userData: any) => API.patch('/user', { params: { userData } });
export const updatePassword = (passwordData: IPasswordToUpdate) => API.patch('/user/update-password', { params: { passwordData } });
export const deleteUser = (id: any) => API.delete('/user', { params: { id } });

