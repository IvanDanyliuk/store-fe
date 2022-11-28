import { RootStateType } from "../store";

export const selectReviews = (state: RootStateType) => state.reviews.reviews;
export const selectReviewsStatus = (state: RootStateType) => state.reviews.status;
export const selectReviewsError = (state: RootStateType) => state.reviews.error;