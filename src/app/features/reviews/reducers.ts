import { createSlice } from '@reduxjs/toolkit';
import { 
  getUserReviews, 
  getProductReviews, 
  createReview, 
  updateReview, 
  deleteReview 
} from './asyncActions';
import { IReview, IReviewState } from './types';


const initialState: IReviewState = {
  status: 'idle',
  reviews: [],
  error: null,
}

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearReviewError: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserReviews.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getUserReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(getUserReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'alertGetReviewsMessage';
      })
      .addCase(getProductReviews.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'alertGetReviewsMessage';
      })
      .addCase(createReview.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'alertCreateReivewMessage';
      })
      .addCase(updateReview.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = state.reviews.map(review => review._id === action.meta.arg.id ? action.meta.arg.updatedReview : review)
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'alertUpdateReviewMessage'
      })
      .addCase(deleteReview.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = state.reviews.filter((item: IReview) => item._id !== action.meta.arg)
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'alertDeleteReviewMessage';
      })
  }
});

export const { clearReviewError } = reviewSlice.actions;

export default reviewSlice.reducer;