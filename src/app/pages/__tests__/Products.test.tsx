import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupProductSuccessHandlers } from '../../../utils/serverMocks/product';
import { renderWithProviders } from '../../../utils/testUtils';
import Products from '../Products';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    category: 'main-category-title',
  }),
}));

describe('Tests for the Products page', () => {
  beforeEach(() => {
    setupProductSuccessHandlers();
    renderWithProviders(<Products />);
  });

  test('should render the Products page', async () => {
    await waitFor(() => {
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });
  });

  test('should check a brand on the filters panel', async () => {
    await waitFor(() => {
      const brandCheckbox = screen.getByRole('checkbox') as HTMLInputElement;
      fireEvent.click(brandCheckbox);
      expect(brandCheckbox.checked).toBe(false);
    });
  });

  test('should set the price range for the product', async () => {
    const minPriceField = screen.getByTestId('minPrice') as HTMLInputElement;
    userEvent.type(minPriceField, '0');
    userEvent.type(minPriceField, '100');
    expect(minPriceField).toHaveValue(100);
  });

  test('should clear filters after clicking the Clear Filters button', async () => {
    const brandCheckbox = screen.getByRole('checkbox') as HTMLInputElement;
    fireEvent.click(brandCheckbox);
    fireEvent.click(screen.getByRole('button', { name: 'clearBtn' }));
    expect(brandCheckbox.checked).toBe(true);
  });

  test('should submit the filter form after clicking the Find button', async () => {
    const maxPriceField = screen.getByTestId('maxPrice') as HTMLInputElement;
    userEvent.type(maxPriceField, '0');
    userEvent.type(maxPriceField, '1500');
    fireEvent.click(screen.getByRole('button', { name: 'findBtn' }));
    await waitFor(() => {
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });
  });
});