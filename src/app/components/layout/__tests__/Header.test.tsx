import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Modal from 'react-modal';
import Header from '../Header';
import { Provider } from 'react-redux';
import store from '../../../features/store';


describe('Tests for the Header component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>
    );
  });

  test('should render the Header component', () => {
    expect(screen.getByText('eStore')).toBeInTheDocument();
  });

  test('should redirect to the Auth page after clicking the Signin button', async () => {
    const signinBtn = screen.getByText('signin');
    fireEvent.click(signinBtn);
    await waitFor(() => {
      screen.debug(undefined, 300000);
    })
  })
});