import { render, screen } from '@testing-library/react';
import { Tradein } from '../';


describe('Tests for the Tradein page', () => {
  test('should render the Tradein page', () => {
    render(<Tradein />);
    expect(screen.getByRole('heading', { name: 'pageTitle' }));
  });
});