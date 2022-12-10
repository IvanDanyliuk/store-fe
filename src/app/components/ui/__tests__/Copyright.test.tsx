import { render, screen } from '@testing-library/react';
import Copyright from '../Copyright';


describe('Tests for the Copyright component', () => {
  test('should render the Copyright component', () => {
    render(<Copyright />);
    expect(screen.getByText(/All Rights Reserved/)).toBeInTheDocument();
  });
});