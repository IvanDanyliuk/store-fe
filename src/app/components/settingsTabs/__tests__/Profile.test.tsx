import { fireEvent, screen, waitFor } from '@testing-library/react';
import { setupUserSuccessHandlers } from '../../../../utils/serverMocks/user';
import { userMock } from '../../../../utils/testDataMocks';
import { renderWithProviders } from '../../../../utils/testUtils';
import Profile from '../Profile';


describe('Tests for the Profile component', () => {
  beforeEach(() => {
    setupUserSuccessHandlers();
    renderWithProviders(<Profile />);
  });

  test('should render user data', async () => {
    await waitFor(() => {
      expect(screen.getByText(userMock.firstName)).toBeInTheDocument();
    });
  });

  test('should open the user data updation form after clicking the Change User Data button', async () => {
    const editBtn = screen.getByRole('button', { name: 'editUserDataBtn' });
    await waitFor(() => {
      fireEvent.click(editBtn);
    });
    expect(screen.queryByText(userMock.firstName)).not.toBeInTheDocument();
  });

  test('should set the language by selecting the language option', async () => {
    const languageSelect = screen.getByRole('combobox')
    await waitFor(() => {
      fireEvent.change(languageSelect, { target: { value: 'ua' } })
    });
    expect(languageSelect).toHaveValue('ua');
  });
});
