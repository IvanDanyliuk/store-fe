import { render, screen } from '@testing-library/react';
import { LegalInfo } from '../';


describe('Tests for the LegalInfo page', () => {
  test('shouldrender the LegalInfo page', () => {
    render(<LegalInfo />);
    expect(screen.getByRole('heading', { name: 'pageTitle' })).toBeInTheDocument();
  });
});