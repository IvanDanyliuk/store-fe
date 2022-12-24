import store from '../../store';
import { clearReviewError } from '../reducers';
import { 
  getProductReviews, 
  getUserReviews, 
  createReview, 
  updateReview, 
  deleteReview 
} from '../asyncActions';
import { setupReviewsErrorHandlers, setupReviewsSuccessHandlers } from '../../../../utils/serverMocks/reviews';
import { reviewItemMock, reviewItemToUpdate } from '../../../../utils/testDataMocks';


describe('Tests for the Reviews reducers: success cases', () => {
  beforeEach(() => {
    setupReviewsSuccessHandlers();
  });

  test('should get reviews of the particular product by dispatching the getProductsReviews action', async () => {
    let state = store.getState().reviews;
    await store.dispatch(getProductReviews(reviewItemMock.productId));
    state = store.getState().reviews;
    expect(state.reviews).toHaveLength(1);
  });

  test('should get reviews of the particular user by dispatching the getUserReviews action', async () => {
    let state = store.getState().reviews;
    await store.dispatch(getUserReviews(reviewItemMock.userEmail));
    state = store.getState().reviews;
    expect(state.reviews).toHaveLength(1);
  });

  test('should create a new review by dispatching the createReview action', async () => {
    let state = store.getState().reviews;
    await store.dispatch(createReview(reviewItemMock));
    state = store.getState().reviews;
    expect(state.reviews).toHaveLength(2);
  });

  test('should update the review by dispatching the updateReview action', async () => {
    let state = store.getState().reviews;
    await store.dispatch(updateReview(reviewItemToUpdate));
    state = store.getState().reviews;
    expect(state.reviews[0].comment).toBe(reviewItemToUpdate.updatedReview.comment);
  });

  test('should delete the review by dispatching the deleteReview action', async () => {
    let state = store.getState().reviews;
    await store.dispatch(deleteReview(reviewItemMock._id!));
    state = store.getState().reviews;
    expect(state.reviews).toHaveLength(0);
  });
});


describe('Tests for the Reviews reducers: error cases', () => {
  beforeEach(() => {
    setupReviewsErrorHandlers();
  });

  test('should show the getting product review error by dispatching the getProductsReviews action', async () => {
    let state = store.getState().reviews;
    await store.dispatch(getProductReviews(reviewItemMock.productId));
    state = store.getState().reviews;
    expect(state.error).toBe('alertGetReviewsMessage');
  });

  test('should show the getting user reviews error by dispatching the getUserReviews action', async () => {
    let state = store.getState().reviews;
    await store.dispatch(getUserReviews(reviewItemMock.userEmail));
    state = store.getState().reviews;
    expect(state.error).toBe('alertGetReviewsMessage');
  });

  test('should show the creating review error by dispatching the createReview action', async () => {
    let state = store.getState().reviews;
    await store.dispatch(createReview(reviewItemMock));
    state = store.getState().reviews;
    expect(state.error).toBe('alertCreateReivewMessage');
  });

  test('should show the updating review error by dispatching the updateReview action', async () => {
    let state = store.getState().reviews;
    await store.dispatch(updateReview(reviewItemToUpdate));
    state = store.getState().reviews;
    expect(state.error).toBe('alertUpdateReviewMessage');
  });

  test('should the deleting review error by dispatching the deleteReview action', async () => {
    let state = store.getState().reviews;
    await store.dispatch(deleteReview(reviewItemMock._id!));
    state = store.getState().reviews;
    expect(state.error).toBe('alertDeleteReviewMessage');
  });

  test('should clear the review error by dispatching the clearReviewError action', async () => {
    let state = store.getState().reviews;
    await store.dispatch(getProductReviews(reviewItemMock.productId));
    state = store.getState().reviews;
    store.dispatch(clearReviewError());
    state = store.getState().reviews;
    expect(state.error).toBeNull();
  });
});