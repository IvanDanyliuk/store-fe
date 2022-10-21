import { RootStateType } from "../store";

export const selectReviews = (state: RootStateType) => state.reviews.reviews;