import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../../utils/testUtils';
import EditUserDataModal from '../EditUserDataModal';


describe('Tests for the EditUserDataModal component', () => {
  test('should submit the form after passing data', async () => {
    renderWithProviders(<EditUserDataModal />);
    fireEvent.click(screen.getByRole('button', { name: 'editUserDataBtn' }));
    const userFirstNameField = screen.getByLabelText('editUserDataFirstName');
    const submitBtn = screen.getByRole('button', { name: 'Submit' });
    userEvent.type(userFirstNameField, '');
    userEvent.type(userFirstNameField, 'Johnny');
    fireEvent.click(submitBtn);
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});