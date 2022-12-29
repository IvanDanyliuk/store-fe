import { screen, waitFor } from '@testing-library/react';
import { setupVacanciesSuccessHandlers } from '../../../utils/serverMocks/vacancies';
import { renderWithProviders } from '../../../utils/testUtils';
import Vacancy from '../Vacancy';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 'vacancy_id_1',
  }),
}));

describe('Tests for the Vacancy page', () => {
  beforeEach(() => {
    setupVacanciesSuccessHandlers();
    renderWithProviders(<Vacancy />);
  });
  
  test('should render the Vacancy page', async () => {
    await waitFor(() => {
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });
  });
});