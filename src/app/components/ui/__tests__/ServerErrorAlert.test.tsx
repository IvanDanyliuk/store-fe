import { screen } from '@testing-library/react';
import { renderWithProvidersErrorCase } from '../../../../utils/testUtils';
import { ServerErrorAlert } from '../';


describe('Tests for the ServerErrorAlert component', () => {
  test('should render the ServerErrorAlert component', async () => {
    renderWithProvidersErrorCase(<ServerErrorAlert />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});