import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../utils/testUtils';
import { Cart } from '../';


describe('Tests for the Cart component', () => {
  test('should submit cart data and close the cart modal component', () => {
    renderWithProviders(<Cart />);
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    fireEvent.click(screen.getByRole('button', { name: 'cartCheckoutBtn' }))
    expect(screen.queryByRole('button', { name: 'cartCheckoutBtn' })).not.toBeInTheDocument();
  });
});