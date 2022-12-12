import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../utils/testUtils';
import NavMenu from '../NavMenu';


describe('Tests for the NavMenu component', () => {
  test('should render the NavMenu component with the main category name from the store', () => {
    renderWithProviders(<NavMenu />);
    expect(screen.getByText(/Main Category Name/)).toBeInTheDocument();
  });
});