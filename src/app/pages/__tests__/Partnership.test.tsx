import { render, screen } from '@testing-library/react';
import { Partnership } from '../';


describe('Tests for the Partnership page', () => {
  test('should render the Partnership page', () => {
    render(<Partnership />);
    expect(screen.getByRole('heading', { name: 'pageTitle' })).toBeInTheDocument();
  });
});