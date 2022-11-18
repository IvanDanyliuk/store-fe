import { RootStateType } from "../store";

export const selectProducts = (state: RootStateType) => state.product.products.data;
export const selectSearchData = (state: RootStateType) => state.product.search;
export const selectBrands = (state: RootStateType) => state.product.brands;
export const selectPagesCount = (state: RootStateType) => state.product.products.pages;
export const selectProduct = (state: RootStateType) => state.product.product;
export const selectProductStatus = (state: RootStateType) => state.product.status;
export const selectProductError = (state: RootStateType) => state.product.error;
