import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupOrderSuccessHandlers } from '../../../../utils/serverMocks/order';
import { setupUserSuccessHandlers } from '../../../../utils/serverMocks/user';
import { renderWithProviders } from '../../../../utils/testUtils';
import { ordersMock } from '../../../../utils/testDataMocks';
import Orders from '../Orders';


describe('Tests for the Orders component', () => {
  beforeEach(() => {
    setupUserSuccessHandlers();
    setupOrderSuccessHandlers();
    renderWithProviders(<Orders />);
  });

  test('should find an order by passing the customer last name to the search field', async () => {
    userEvent.type(screen.getByRole('textbox'), ordersMock.data[0].customer.lastName);
    fireEvent.click(screen.getByRole('button', { name: 'searchBtn' }));
    await waitFor(() => {
      expect(screen.getByText(ordersMock.data[0]._id)).toBeInTheDocument();
    });
  });
});