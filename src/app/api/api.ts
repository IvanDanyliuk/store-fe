import axios from 'axios';
import { ICategoryToUpdate, IProductCategory } from '../features/category/types';
import { IGalleryImage } from '../features/gallery/types';
import { IOrder, IOrderToUpdate } from '../features/order/types';
import { IProductData, IProductToUpdate } from '../features/product/types';
import { IReview, IReviewToUpdate } from '../features/reviews/types';
import { IShipping, IShippingToUpdate } from '../features/shipping/types';
import { IAuthData, IPasswordToUpdate, IUser, IUserToUpdate } from '../features/user/types';
import { IVacancy, IVacancyToUpdate } from '../features/vacancies/types';


const API = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });

export const getProducts = (page: number, productsPerPage: number, filterData?: any) => API.get('/products', { params: { page, productsPerPage, filterData } });
export const getTopProducts = (productsNumber: number) => API.get('/products/top-rated', { params: { productsNumber } });
export const getProduct = (id: string) => API.get(`/products/${id}`);
export const getBrands = (category: string) => API.get('/products/brands', { params: { category } });
export const findProducts = (title: string) => API.get('/products/search', { params: { title } });
export const createProduct = (product: IProductData) => API.post('/products', { params: { product } });
export const updateProduct = (updatedProduct: IProductToUpdate) => API.patch('/products', { params: { updatedProduct } });
export const deleteProduct = (id: string) => API.delete('/products', { params: { id } });

export const getUserReviews = (email: string) => API.get('/reviews/user', { params: { email } });
export const getProductReviews = (productId: string) => API.get('/reviews/product', { params: { productId } });
export const createReview = (review: IReview) => API.post('/reviews', { params: { review } });
export const updateReview = (updatedReview: IReviewToUpdate) => API.patch('/reviews', { params: { updatedReview } });
export const deleteReview = (id: string) => API.delete('/reviews', { params: { id } });

export const getCategories = () => API.get('/categories');
export const createCategory = (category: IProductCategory) => API.post('/categories', { params: { category } });
export const updateCategory = (updatedCategory: ICategoryToUpdate) => API.patch('/categories', { params: { updatedCategory } });
export const deleteCategory = (id: string) => API.delete('/categories', { params: { id } });

export const getShipping = () => API.get('/shipping');
export const createShipping = (shipping: IShipping) => API.post('/shipping', { params: { shipping } });
export const updateShipping = (updatedShipping: IShippingToUpdate) => API.patch('/shipping', { params: { updatedShipping } });
export const deleteShipping = (id: string) => API.delete('/shipping', { params: { id } });

export const getOrders = (page: number, ordersPerPage: number, filterData?: string) => API.get('/orders/admin', { params: { page, ordersPerPage, filterData } });
export const getUserOrder = (page: number, ordersPerPage: number, email: string) => API.get('/orders/user', { params: { page, ordersPerPage, email } });
export const createOrder = (order: IOrder) => API.post('/orders', { params: { order } });
export const updateOrder = (updatedOrder: IOrderToUpdate) => API.patch('/orders', { params: { updatedOrder } });
export const payOrder = (order: any) => API.post('/orders/payment', { params: { order } });
export const deleteOrder = (id: any) => API.delete('/orders', { params: { id } });

export const getVacancies = (page: number, itemsPerPage: number) => API.get('/vacancies', { params: { page, itemsPerPage }});
export const getVacancy = (id: string) => API.get(`/vacancies/${id}`);
export const createVacancy = (vacancy: IVacancy) => API.post('/vacancies', { params: { vacancy } });
export const updateVacancy = (updatedVacancy: IVacancyToUpdate) => API.patch('/vacancies', { params: { updatedVacancy } });
export const deleteVacancy = (id: string) => API.delete('/vacancies', { params: { id } });

export const signin = (userData: IAuthData) => API.post('/user/signin', { params: { userData } });
export const signup = (userData: IUser) => API.post('/user/signup', { params: { userData } });
export const updateUser = (userData: IUserToUpdate) => API.patch('/user', { params: { userData } });
export const updatePassword = (passwordData: IPasswordToUpdate) => API.patch('/user/update-password', { params: { passwordData } });
export const deleteUser = (id: string) => API.delete('/user', { params: { id } });

export const getGalleryImages = () => API.get('/gallery');
export const addGalleryImage = (imageUrl: IGalleryImage) => API.post('/gallery', { params: { imageUrl } });
export const deleteGalleryImage = (id: string) => API.delete('/gallery', { params: { id } });