import { RootStateType } from "../store";


export const selectCategories = (state: RootStateType) => state.category.categories;
export const selectCategory = (state: RootStateType) => state.category.category;