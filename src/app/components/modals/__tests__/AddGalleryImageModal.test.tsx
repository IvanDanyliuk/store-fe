import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../../utils/testUtils';
import AddGalleryImageModal from '../AddGalleryImageModal';


const openForm = () => {
  const openBtn = screen.getByRole('button', { name: 'galleryBtn' });
  fireEvent.click(openBtn);
};


describe('Testsfor the AddGalleryImageModal component', () => {
  let file: any;
  beforeEach(() => {
    file = new File(["(⌐□_□)"], "profile_photo.png", { type: "image/png" });
  });

  test('should upload an image and close dialog after submitting', async () => {
    renderWithProviders(<AddGalleryImageModal />);
    openForm();
    const fileInput = screen.getByTestId('input');
    await waitFor(() => {
      userEvent.upload(fileInput, file);
    });
    const submitBtn = screen.getByRole('button', { name: 'gallerySubmitBtn' });
    fireEvent.click(submitBtn);
    screen.debug(undefined, 300000)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});