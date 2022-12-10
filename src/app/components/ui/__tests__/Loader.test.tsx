import { render, screen } from '@testing-library/react';
import Loader from '../Loader';


describe('Tests for the Loader component', () => {
  test('should render the Loader component', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});