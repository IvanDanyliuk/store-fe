import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, renderWithProvidersForUpdation } from '../../../../utils/testUtils';
import { CreateVacancyModal } from '../';


describe('Tests for the CreateVacancyModal component: creation cases', () => {
  beforeEach(() => {
    renderWithProviders(<CreateVacancyModal />);
    fireEvent.click(screen.getByRole('button', { name: 'vacanciesOpenFormBtn' }));
  });

  test('should submit the form after passing all data needed', () => {
    userEvent.type(screen.getByLabelText('vacanciesTitle'), 'Test Title');
    fireEvent.change(screen.getByRole('option', { name: 'vacanciesFullTime' }));
    fireEvent.change(screen.getByRole('option', { name: 'vacantciesOffice' }));
    userEvent.type(screen.getByLabelText('vacanciesResponsibilities'), 'Test Responsibilities');
    userEvent.type(screen.getByLabelText('vacanciesMustHaves'), 'Test Must Haves');
    userEvent.type(screen.getByLabelText('vacanciesExperience'), 'Test Experience');
    userEvent.type(screen.getByLabelText('vacanciesSalary'), '1000');
    userEvent.type(screen.getByLabelText('vacanciesContactPerson'), 'Test Contact Person');
    userEvent.type(screen.getByLabelText('vacanciesContactPhone'), '777 777 77 77');
    userEvent.type(screen.getByLabelText('vacanciesContactEmail'), 'test@test.com');
    fireEvent.click(screen.getByRole('button', { name: 'vacanciesSubmitBtn' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('should show an error message after passing an incorrect data', () => {
    fireEvent.click(screen.getByRole('button', { name: 'vacanciesSubmitBtn' }));
    expect(screen.getByText('vacanciesValidationTitleRequired')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('closeModalBtn'));
    fireEvent.click(screen.getByRole('button', { name: 'vacanciesOpenFormBtn' }));
    expect(screen.queryByText('vacanciesValidationTitleRequired')).not.toBeInTheDocument();
  });
});

describe('Tests for the CreateVacancyModal component: updating cases', () => {
  beforeEach(() => {
    renderWithProvidersForUpdation(<CreateVacancyModal />);
  });

  test('should clear an error after passing wrong data while closing the component', () => {
    userEvent.type(screen.getByLabelText('vacanciesTitle'), '');
    fireEvent.click(screen.getByRole('button', { name: 'vacanciesSubmitBtn' }));
    fireEvent.click(screen.getByTestId('closeModalBtn'));
    fireEvent.click(screen.getByRole('button', { name: 'vacanciesOpenFormBtn' }));
    expect(screen.queryByText('vacanciesTitleCreate')).toBeInTheDocument();
  });

  test('should submit the form after passing a correct data', async () => {
    userEvent.type(screen.getByLabelText('vacanciesResponsibilities'), 'Test Updated Responsibilities');
    userEvent.type(screen.getByLabelText('vacanciesMustHaves'), 'Test Updated Must Haves');
    userEvent.type(screen.getByLabelText('vacanciesExperience'), 'Test Updated Experience');
    userEvent.type(screen.getByLabelText('vacanciesSalary'), '1000');
    userEvent.type(screen.getByLabelText('vacanciesContactPerson'), 'Test Updated Contact Person');
    userEvent.type(screen.getByLabelText('vacanciesContactPhone'), '777 777 77 77');
    userEvent.type(screen.getByLabelText('vacanciesContactEmail'), 'test@test.com');
    fireEvent.click(screen.getByRole('button', { name: 'vacanciesSubmitBtn' }));
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});