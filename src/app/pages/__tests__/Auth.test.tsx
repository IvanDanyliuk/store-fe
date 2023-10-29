import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../utils/testUtils';
import { Auth } from '../';


const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));


describe('Tests for the Auth page: signin cases', () => {
  beforeEach(() => {
    renderWithProviders(<Auth />);
  });
  
  test('should switch the page mode by clicking the Switch Mode button', () => {
    fireEvent.click(screen.getByRole('button', { name: 'noAccount' }));
    expect(screen.getByRole('heading', { name: 'signUp' })).toBeInTheDocument();
  });

  test('should submit the Sign Up form with correct data', async () => {
    const file = new File(["(⌐□_□)"], "user_photo.png", { type: "image/png" });
    fireEvent.click(screen.getByRole('button', { name: 'noAccount' }));
    const firstNameField = screen.getByLabelText('firstName');
    const lastNameField = screen.getByLabelText('lastName');
    const emailField = screen.getByLabelText('email');
    const passwordField = screen.getByLabelText('password');
    const confirmPasswordField = screen.getByLabelText('confirmPassword');
    const phoneField = screen.getByLabelText('phone');
    const cityField = screen.getByLabelText('city');
    const avatarField = screen.getByLabelText('avatarImg');
    userEvent.type(firstNameField, 'John');
    userEvent.type(lastNameField, 'Doe');
    userEvent.type(emailField, 'testemail@test.com');
    userEvent.type(passwordField, 'testpassword');
    userEvent.type(confirmPasswordField, 'testpassword');
    userEvent.type(phoneField, '7777777777');
    userEvent.type(cityField, 'London');
    await waitFor(() => {
      userEvent.upload(avatarField, file);
    });
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'signUp' }));
    });
    expect(mockedUsedNavigate).toHaveBeenCalled();
  });

  test('should not submit the Sign Up form with incorrect data', async () => {
    const file = new File(["(⌐□_□)"], "user_photo.png", { type: "image/png" });
    fireEvent.click(screen.getByRole('button', { name: 'noAccount' }));
    const firstNameField = screen.getByLabelText('firstName');
    const lastNameField = screen.getByLabelText('lastName');
    const emailField = screen.getByLabelText('email');
    const passwordField = screen.getByLabelText('password');
    const confirmPasswordField = screen.getByLabelText('confirmPassword');
    const phoneField = screen.getByLabelText('phone');
    const cityField = screen.getByLabelText('city');
    const avatarField = screen.getByLabelText('avatarImg');
    userEvent.type(firstNameField, 'John');
    userEvent.type(lastNameField, 'Doe');
    userEvent.type(emailField, '');
    userEvent.type(passwordField, 'testpassword');
    userEvent.type(confirmPasswordField, 'testpassword');
    userEvent.type(phoneField, '7777777777');
    userEvent.type(cityField, 'London');
    await waitFor(() => {
      userEvent.upload(avatarField, file);
    });
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'signUp' }));
    });
    expect(screen.getByText('Email is required!')).toBeInTheDocument();
  });
});


describe('Tests for the Auth page: signin cases', () => {
  beforeEach(() => {
    renderWithProviders(<Auth />);
  });

  test('should show the error message after passing the incorrect data', () => {
    const emailField = screen.getByLabelText('email');
    const passwordField = screen.getByLabelText('password');
    userEvent.type(emailField, 'incorrect.email.com');
    userEvent.type(passwordField, 'testpassword');
    fireEvent.click(screen.getByRole('button', { name: 'signIn' }));
    expect(screen.getByText('authValidationIcorrectEmail')).toBeInTheDocument();
  });

  test('should show the error message after passing the incorrect data', () => {
    const emailField = screen.getByLabelText('email');
    const passwordField = screen.getByLabelText('password');
    userEvent.type(emailField, 'test@test.com');
    userEvent.type(passwordField, 'testpassword');
    fireEvent.click(screen.getByRole('button', { name: 'signIn' }));
    screen.debug(undefined, 300000)
  });
});

describe('Tests for the Auth page: validation success mocks', () => {
  jest.mock('../../helpers/formValidation', () => ({
    isSigninDataValid: jest.fn(() => true),
    isSignupDataValid: jest.fn(() => true)
  }));

  beforeEach(() => {
    renderWithProviders(<Auth />);
  });

  test('should accept form data by dispatching the signin action', async () => {
    const emailField = screen.getByLabelText('email');
    const passwordField = screen.getByLabelText('password');
    userEvent.type(emailField, 'test@test.com');
    userEvent.type(passwordField, '123456');
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'signIn' }));
    });
    expect(mockedUsedNavigate).toHaveBeenCalled();
  });

  test('should accept form data by dispatching the signup action', async () => {
    const file = new File(["(⌐□_□)"], "user_photo.png", { type: "image/png" });
    fireEvent.click(screen.getByRole('button', { name: 'noAccount' }));
    const firstNameField = screen.getByLabelText('firstName');
    const lastNameField = screen.getByLabelText('lastName');
    const emailField = screen.getByLabelText('email');
    const passwordField = screen.getByLabelText('password');
    const confirmPasswordField = screen.getByLabelText('confirmPassword');
    const phoneField = screen.getByLabelText('phone');
    const cityField = screen.getByLabelText('city');
    const avatarField = screen.getByLabelText('avatarImg');
    userEvent.type(firstNameField, 'John');
    userEvent.type(lastNameField, 'Doe');
    userEvent.type(emailField, 'testemail@test.com');
    userEvent.type(passwordField, '123456');
    userEvent.type(confirmPasswordField, '123456');
    userEvent.type(phoneField, '7777777777');
    userEvent.type(cityField, 'London');
    await waitFor(() => {
      userEvent.upload(avatarField, file);
    });
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'signUp' }));
    });
    expect(mockedUsedNavigate).toHaveBeenCalled();
  });
});
