import { render, screen } from '@testing-library/react';
import OrderForm from '../OrderForm';


const dataMock = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'test@test.com',
  phone: '777 777 77 77'
};

const changeHandler = jest.fn();

describe('Tests for the OrderForm component', () => {
  test('should render the OrderForm component', () => {
    render(
      <OrderForm 
        data={dataMock} 
        onChange={changeHandler} 
      />
    );
    expect(screen.getAllByRole('textbox')).toHaveLength(4);
  });
});