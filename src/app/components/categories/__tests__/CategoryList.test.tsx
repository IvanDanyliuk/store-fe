import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../utils/testUtils';
import CategoryList from '../CategoryList';


describe('Tests for the CategoryList component', () => {
  test('should render the CategoryList component with passed category', () => {
    renderWithProviders(<CategoryList category='main-category-title' />);
    expect(screen.getByText(/Sub-category name/)).toBeInTheDocument();
  });

  test('should render the CategoryList component without passed category', () => {
    renderWithProviders(<CategoryList />);
    expect(screen.getByText(/Main Category Name/)).toBeInTheDocument();
  });
});