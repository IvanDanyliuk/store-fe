import { waitFor } from '@testing-library/react';
import { renderWithProviders, renderWithProvidersErrorCase } from '../../../utils/testUtils';
import Careers from '../Careers';


describe('Tests for the Careers page', () => {
  test('should render the Careers page', async () => {
    const { getByText } = renderWithProviders(<Careers />);
    await waitFor(() => {
      expect(getByText('Test Title')).toBeInTheDocument();
    });
  });

  test('should render the error message', async () => {
    const { getByText } = renderWithProvidersErrorCase(<Careers />);
    await waitFor(() => {
      expect(getByText('vacanciesErrorMessage')).toBeInTheDocument();
    });
  });
});