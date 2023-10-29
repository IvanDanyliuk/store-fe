import { render, screen } from '@testing-library/react';
import { FormErrorMessage } from '../';


describe('Tests for the FormErrorMessage component', () => {
  test('should render the FormErrorMessage component', () => {
    render(<FormErrorMessage error='Error' />);
    expect(screen.getByText(/Error/)).toBeInTheDocument();
  });
});