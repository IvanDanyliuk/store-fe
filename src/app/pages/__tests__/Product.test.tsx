import {fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProvidersForUpdation } from '../../../utils/testUtils';
import { setupProductSuccessHandlers } from '../../../utils/serverMocks/product';
import { setupReviewsSuccessHandlers } from '../../../utils/serverMocks/reviews';
import { reviewsMock } from '../../../utils/testDataMocks';
import { Product } from '../';


describe('Tests for the Product page', () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null)
      },
      writable: true
    });
    setupProductSuccessHandlers();
    setupReviewsSuccessHandlers();
    renderWithProvidersForUpdation(<Product />);
  });

  test('should render the Product page', async () => {  
    await waitFor(() => {
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });
  });

  test('should add the product to the cart after clicking the Buy button', async () => {
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'buyBtn' }));
    });
    expect(window.localStorage.setItem).toHaveBeenCalled();
  });

  test('should increase likes count after clicking the Like button', async () => {
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('likeBtn'));
      expect(screen.getByTestId('likeCounter')).toHaveTextContent('1');
    });
  });

  test('should decrease likes count after clicking the Dislike button', async () => {
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('dislikeBtn'));
      expect(screen.getByTestId('dislikesCounter')).toHaveTextContent('1');
    });
  });

  test('should increase likes count while the review has been disliked after clicking the Like button', async () => {
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('dislikeBtn'));
      fireEvent.click(screen.getByTestId('likeBtn'));
      expect(screen.getByTestId('likeCounter')).toHaveTextContent('1');
    });
  });

  test('should decrease likes count while the review has been liked after clicking the Dislike button', async () => {
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('likeBtn'));
      fireEvent.click(screen.getByTestId('dislikeBtn'));
      expect(screen.getByTestId('dislikesCounter')).toHaveTextContent('1');
    });
  });

  test('should delete a review after clicking the Delete Review button', async () => {
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('deleteReview'));
    });
    expect(await screen.findAllByTestId('reviewItem')).toHaveLength(reviewsMock.length);
  });
});