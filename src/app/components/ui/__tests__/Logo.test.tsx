import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Logo from '../Logo';


describe('Tests for the Logo component', () => {
  test('should render the Logo component', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /eStore/i })).toBeInTheDocument();
  });
});