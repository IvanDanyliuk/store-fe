import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, renderWithProvidersPasswordError } from '../../../../utils/testUtils';
import { UpdatePasswordModal } from '../';


describe('Tests for the UpdatePasswordModal component', () => {

  test('should submit the form after passing correct data', () => {
    renderWithProviders(<UpdatePasswordModal />);
    fireEvent.click(screen.getByRole('button', { name: 'updatePasswordBtn' }));

    const currenPasswordField = screen.getByLabelText('updatePasswordCurrentPassword');
    const newPasswordField = screen.getByLabelText('updatePasswordNewPassowrd');
    const confirmNewPasswordField = screen.getByLabelText('updatePasswordConfirmNewPassword');

    userEvent.type(currenPasswordField, '123456');
    userEvent.type(newPasswordField, '777777');
    userEvent.type(confirmNewPasswordField, '777777');
    
    fireEvent.click(screen.getByRole('button', { name: 'updatePasswordSubmitBtn' }));
    
    expect(screen.queryByRole('dialog')).toBeInTheDocument();
  });

  test('should show the error message after passing incorrect data', () => {
    renderWithProvidersPasswordError(<UpdatePasswordModal />);
    fireEvent.click(screen.getByRole('button', { name: 'updatePasswordBtn' }));
    
    const currenPasswordField = screen.getByLabelText('updatePasswordCurrentPassword');
    const newPasswordField = screen.getByLabelText('updatePasswordNewPassowrd');
    const confirmNewPasswordField = screen.getByLabelText('updatePasswordConfirmNewPassword');

    userEvent.type(currenPasswordField, '');
    userEvent.type(newPasswordField, '');
    userEvent.type(confirmNewPasswordField, '777777');
    
    fireEvent.click(screen.getByRole('button', { name: 'updatePasswordSubmitBtn' }));
    
    expect(screen.getByText('updatePasswordErrorMessage')).toBeInTheDocument();
  });
});