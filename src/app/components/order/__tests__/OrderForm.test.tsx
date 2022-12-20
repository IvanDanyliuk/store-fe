import { render, screen } from '@testing-library/react';
import { orderCustomerDataMock } from '../../../../utils/testDataMocks';
import OrderForm from '../OrderForm';


const changeHandler = jest.fn();


describe('Tests for the OrderForm component', () => {
  test('should render the OrderForm component', () => {
    render(
      <OrderForm 
        data={orderCustomerDataMock} 
        onChange={changeHandler} 
      />
    );
    expect(screen.getAllByRole('textbox')).toHaveLength(4);
  });
});