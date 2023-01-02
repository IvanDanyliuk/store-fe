import { fireEvent, screen, waitFor } from '@testing-library/react';
import { setupReviewsSuccessHandlers } from '../../../../utils/serverMocks/reviews';
import { setupUserSuccessHandlers } from '../../../../utils/serverMocks/user';
import { reviewsMock } from '../../../../utils/testDataMocks';
import { renderWithProviders } from '../../../../utils/testUtils';
import Reviews from '../Reviews';


describe('Test for the Reviews component', () => {
  beforeEach(() => {
    setupUserSuccessHandlers();
    setupReviewsSuccessHandlers();
    renderWithProviders(<Reviews />);
  });

  test('should delete a review by clicking the Delete Review button ', async () => {
    await waitFor(() => {
      const deleteReviewBtn = screen.getByTestId('deleteReviewBtn');
      fireEvent.click(deleteReviewBtn);
    });
    expect(screen.queryByText(reviewsMock[0].comment)).not.toBeInTheDocument();
  });
});