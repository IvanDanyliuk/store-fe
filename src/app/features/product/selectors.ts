import { RootStateType } from "../store";

export const selectProducts = (state: RootStateType) => state.product.products;