import { render, screen } from '@testing-library/react';
import Refund from '../Refund';


describe('Tests for the Redund page', () => {
  test('should render the Refund page', () => {
    render(<Refund />);
    expect(screen.getByRole('heading', { name: 'pageTitle' })).toBeInTheDocument();
  });
});