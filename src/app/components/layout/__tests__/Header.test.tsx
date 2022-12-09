import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Modal from 'react-modal';
import Header from '../Header';
import { Provider } from 'react-redux';
import store from '../../../features/store';
import { renderWithProviders } from '../../../../utils/testUtils';


describe('Tests for the Header component', () => {
  beforeEach(() => {
    renderWithProviders(<Header />);
  });

  test('should render the Header component', () => {
    expect(screen.getByText(/eStore/)).toBeInTheDocument();
  });

  test('should redirect to the Auth page after clicking the Signin button', async () => {
    fireEvent.click(screen.getByText(/logout/));
    await waitFor(() => {
      expect(screen.getByText(/signin/)).toBeInTheDocument();
    });
  });
});