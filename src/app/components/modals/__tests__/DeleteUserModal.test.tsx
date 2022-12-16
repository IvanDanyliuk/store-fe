import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../utils/testUtils';
import DeleteUserModal from '../DeleteUserModal';


describe('Tests for the DeleteUserModal component', () => {
  test('should close a dialog ater clicking the Yes button', () => {
    renderWithProviders(<DeleteUserModal />);
    fireEvent.click(screen.getByRole('button', { name: 'deleteUserBtn' }));
    fireEvent.click(screen.getByRole('button', { name: 'deleteUserYes' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});