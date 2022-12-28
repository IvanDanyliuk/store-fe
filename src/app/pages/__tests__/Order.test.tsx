import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupOrderErrorHandlers, setupOrderSuccessHandlers } from '../../../utils/serverMocks/order';
import { renderWithProviders, renderWithProvidersErrorCase, renderWithProvidersForUpdation } from '../../../utils/testUtils';
import Order from '../Order';


const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

describe('Tests for the Order page: placing an order', () => {
  beforeEach(() => {
    setupOrderSuccessHandlers();
    renderWithProviders(<Order />);
  });

  test('should change customer data', async () => {
    userEvent.type(screen.getAllByLabelText('firstName')[0], 'ny');
    expect(screen.getAllByLabelText('firstName')[0]).toHaveValue('Johnny');
  });

  test('should change recepient data', () => {
    userEvent.type(screen.getAllByLabelText('firstName')[1], 'ny');
    expect(screen.getAllByLabelText('firstName')[1]).toHaveValue('Johnny');
  });

  test('should change the city option', () => {
    const selectedOption = screen.getByRole('option', { name: 'Test City 3' }) as HTMLOptionElement;
    userEvent.selectOptions(screen.getAllByRole('combobox')[0], selectedOption);
    expect(selectedOption.selected).toBe(true);
  });

  test('should change the shipping company option: not a self-pickup', () => {
    const companyRadio = screen.getAllByRole('radio')[1] as HTMLInputElement;
    fireEvent.click(companyRadio);
    expect(companyRadio.checked).toBe(true);
  });

  test('should change the shipping company option: self-pickup', () => {
    const companyRadio = screen.getAllByRole('radio')[2] as HTMLInputElement;
    fireEvent.click(companyRadio);
    expect(companyRadio.checked).toBe(true);
  });

  test('should change the payment method option', () => {
    const paymentRadio = screen.getAllByRole('radio')[4] as HTMLInputElement;
    fireEvent.click(paymentRadio);
    expect(paymentRadio.checked).toBe(true);
  });

  test('should submit an order after clicking the Submit Order button', async () => {
    fireEvent.click(screen.getByRole('button', { name: 'submitOrder' }));
    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalled();
    });
  });
});


describe('Tests for the Order page: updating an order', () => {
  beforeEach(() => {
    setupOrderSuccessHandlers();
    renderWithProvidersForUpdation(<Order />);
  });

  test('should change the customer name and submit an order', async () => {
    userEvent.type(screen.getAllByLabelText('firstName')[0], 'ny');
    fireEvent.click(screen.getByRole('button', { name: 'submitOrder' }));
    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalled();
    });
  });
});


describe('Tests for the Order page: error cases', () => {
  beforeEach(() => {
    setupOrderErrorHandlers();
    renderWithProvidersErrorCase(<Order />);
  });

  test('should not submit an order after clicking the Submit Order button', async () => {
    fireEvent.click(screen.getByRole('button', { name: 'submitOrder' }));
    await waitFor(() => {
      expect(mockedUsedNavigate).not.toHaveBeenCalled();
    });
  });
});