import { render, screen } from '@testing-library/react';
import { About } from '../';


describe('Tests for the About page', () => {
  test('should render the About component', () => {
    render(<About />);
    expect(screen.getByText('title')).toBeInTheDocument();
  });
});