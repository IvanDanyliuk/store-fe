import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/testUtils';
import Categories from '../Categories';


describe('Tests for the Categories page', () => {
  test('should render the Categories page', async () => {
    renderWithProviders(<Categories />);
    expect(screen.getByText('Main Category Name')).toBeInTheDocument();
  });
});