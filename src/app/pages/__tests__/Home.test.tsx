import { screen, waitFor } from '@testing-library/react';
import { setupGallerySuccessHandlers } from '../../../utils/serverMocks/gallery';
import { galleryStateSuccess } from '../../../utils/testDataMocks';
import { renderWithProviders } from '../../../utils/testUtils';
import { Home } from '../';


describe('Tests for the Home page', () => {
  test('should render the Home page', async () => {
    setupGallerySuccessHandlers();
    renderWithProviders(<Home />);
    await waitFor(() => {
      expect(screen.getAllByTestId('galleryImage')).toHaveLength(galleryStateSuccess.imageUrls.length + 2);
    });
  });
});