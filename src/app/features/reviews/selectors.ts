import { RootStateType } from "../store";

export const selectReviews = (state: RootStateType) => state.reviews.reviews;
export const selectReviewsStatus = (state: RootStateType) => state.reviews.status;