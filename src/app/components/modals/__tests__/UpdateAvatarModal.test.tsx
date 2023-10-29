import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../../utils/testUtils';
import { UpdateAvatarModal } from '../';


describe('Tests for the UpdateAvatarModal component', () => {
  test('should close the form after updloading a new image', async () => {
    const file = new File(["(⌐□_□)"], "user_photo.png", { type: "image/png" });
    renderWithProviders(<UpdateAvatarModal />);
    fireEvent.click(screen.getByRole('button', { name: 'updateAvatarTitle' }));
    const fileInput = screen.getByTestId('fileInput');
    await waitFor(() => {
      userEvent.upload(fileInput, file);
    });
    fireEvent.click(screen.getByRole('button', { name: 'updateAvatarSubmitBtn' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});