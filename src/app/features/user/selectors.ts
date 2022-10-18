import { RootStateType } from '../store';

export const selectUser = (state: RootStateType) => state.user.user;
export const selectUserStatus = (state: RootStateType) => state.user.status;
export const selectError = (state: RootStateType) => state.user.error;
export const selectWishList = (state: RootStateType) => state.user.user?.wishList!;
export const selectReviews = (state: RootStateType) => state.user.reviews;