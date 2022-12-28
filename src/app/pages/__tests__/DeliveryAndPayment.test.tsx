import { screen } from '@testing-library/react';
import { renderWithProviders, renderWithProvidersErrorCase } from '../../../utils/testUtils';
import DeliveryAndPayment from '../DeliveryAndPayment';


describe('Tests for the DeliveryAndPayment page', () => {
  test('should render the shipping company name', () => {
    renderWithProviders(<DeliveryAndPayment />);
    expect(screen.getByText('Test Company')).toBeInTheDocument();
  });

  test('should render the shipping error message', () => {
    renderWithProvidersErrorCase(<DeliveryAndPayment />);
    expect(screen.getByText('shippingMethodsNotFoundMessage')).toBeInTheDocument();
  });
});