import { render, screen } from '@testing-library/react';
import { Contacts } from '../';


describe('Tests for the Contacts page', () => {
  test('should render the Contacts page', () => {
    render(<Contacts />);
    expect(screen.getByText('title')).toBeInTheDocument();
  });
});