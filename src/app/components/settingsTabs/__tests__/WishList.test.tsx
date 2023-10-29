import { screen } from '@testing-library/react';
import { setupProductSuccessHandlers } from '../../../../utils/serverMocks/product';
import { setupUserSuccessHandlers } from '../../../../utils/serverMocks/user';
import { renderWithProviders } from '../../../../utils/testUtils';
import { productStateSuccess } from '../../../../utils/testDataMocks'
import { WishList } from '../';


describe('Tests for the WishList component', () => {
  test('should render product data from the wish list', () => {
    setupProductSuccessHandlers();
    setupUserSuccessHandlers();
    renderWithProviders(<WishList />);
    expect(screen.getByText(productStateSuccess.products.data[0].title)).toBeInTheDocument();
  });
});