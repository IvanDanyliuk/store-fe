import { render, screen } from '@testing-library/react';
import { PaymentSystemIcon } from '../';


describe('Tests for the PaymentSystemIcon component', () => {
  test('should render the Payment component after passing a Visa card number', () => {
    render(<PaymentSystemIcon cardNumber='4012888888881881' />);
    expect(screen.getByTestId('cardIcon')).toBeInTheDocument();
  });

  test('should render the Payment component after passing a MasterCard card number', () => {
    render(<PaymentSystemIcon cardNumber='5105105105105100' />);
    expect(screen.getByTestId('cardIcon')).toBeInTheDocument();
  });
});