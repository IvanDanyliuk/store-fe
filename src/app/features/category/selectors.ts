import { RootStateType } from "../store";


export const selectCategories = (state: RootStateType) => state.category.categories;