import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, renderWithProvidersForUpdation } from '../../../../utils/testUtils';
import CreateShippingForm from '../CreateShippingForm';


describe('Tests for the CreateShippingForm components: creation cases', () => {
  beforeEach(() => {
    renderWithProviders(<CreateShippingForm />);
    fireEvent.click(screen.getByRole('button', { name: 'shippingBtn' }));
  });

  test('should add city to the cities list after clicking the Add New City button', () => {
    const cityInput = screen.getByLabelText('shippingCity');
    const addNewCityBtn = screen.getByRole('button', { name: 'shipingAddNewCityBtn' });
    userEvent.type(cityInput, 'London');
    fireEvent.click(addNewCityBtn);

    expect(screen.getByText('London')).toBeInTheDocument();
  });

  test('should remove the added city name after clicking the Delete City button', () => {
    const cityInput = screen.getByLabelText('shippingCity');
    const addNewCityBtn = screen.getByRole('button', { name: 'shipingAddNewCityBtn' });
    userEvent.type(cityInput, 'London');
    fireEvent.click(addNewCityBtn);

    const deleteCityBtn = screen.getByTestId('deleteCityBtn');
    fireEvent.click(deleteCityBtn);
    
    expect(screen.queryByText('London')).not.toBeInTheDocument();
  });

  test('should submit form after passing all the data needed', () => {
    const shippingNameInput = screen.getByLabelText('shippingCompany');
    const shippingCountryInput = screen.getByLabelText('shippingCountry');

    const cityInput = screen.getByLabelText('shippingCity');
    const addNewCityBtn = screen.getByRole('button', { name: 'shipingAddNewCityBtn' });
    const submitBtn = screen.getByRole('button', { name: 'shippingSubmitBtn' });
    userEvent.type(cityInput, 'London');

    userEvent.type(shippingNameInput, 'Test Company');
    userEvent.type(shippingCountryInput, 'United Kingdom');
    fireEvent.click(addNewCityBtn);
    fireEvent.click(submitBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('should show an error message after passing wrong data', () => {
    const submitBtn = screen.getByRole('button', { name: 'shippingSubmitBtn' });
    fireEvent.click(submitBtn);
    expect(screen.queryByText('shippingValidationCompanyRequired')).toBeInTheDocument();

    const closeDialogBtn = screen.getByTestId('closeDialogBtn');
    fireEvent.click(closeDialogBtn);
    fireEvent.click(screen.getByRole('button', { name: 'shippingBtn' }));
    expect(screen.queryByText('shippingValidationCompanyRequired')).not.toBeInTheDocument();
  });
});

describe('Tests for the CreateShippingForm components: updation cases', () => {
  beforeEach(() => {
    renderWithProvidersForUpdation(<CreateShippingForm />);
  });

  test('should show an error message after passing wrong updating data', () => {
    const shippingNameInput = screen.getByLabelText('shippingCompany');
    userEvent.type(shippingNameInput, '');
    const submitBtn = screen.getByRole('button', { name: 'shippingSubmitBtn' });
    fireEvent.click(submitBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});