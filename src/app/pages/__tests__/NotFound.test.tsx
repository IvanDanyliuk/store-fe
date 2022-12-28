import { render, screen } from '@testing-library/react';
import NotFound from '../NotFound';


describe('Tests for the NotFound page', () => {
  test('should render the error message', () => {
    render(<NotFound />);
    expect(screen.getByText('notFoundMessage')).toBeInTheDocument();
  });
});