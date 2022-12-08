import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../Footer';


describe('Tests for the Footer component', () => {
  test('should render the footer component', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText('ESTORE')).toBeInTheDocument();
  })
});