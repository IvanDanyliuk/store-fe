import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../../utils/testUtils';
import SearchField from '../SearchField';


const runProductSearch = (productName: string) => {
  userEvent.type(screen.getByRole('textbox'), productName)
  fireEvent.click(screen.getByRole('button'));
};

describe('Tests for the SearchField component', () => {
  beforeEach(() => {
    renderWithProviders(<SearchField />);
  });

  test('should render the product title passed to the search field', () => {
    runProductSearch('Test Title');
    expect(screen.getByText(/Test Title/)).toBeInTheDocument();
  });

  test('should clear the search field value after clicking on the searched product name', () => {
    runProductSearch('Test Title');
    fireEvent.click(screen.getByText(/Test Title/));
    expect(screen.queryByText(/Test Title/)).not.toBeInTheDocument();
  });
});