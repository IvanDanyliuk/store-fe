import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Payment } from '../';


describe('The Payment component tests', () => {
  test('should render the card form', () => {
    render(<Payment />);
    const cardFields = screen.getAllByRole('textbox');
    userEvent.type(cardFields[0], '7777777777777777');
    userEvent.type(cardFields[1], '01');
    userEvent.type(cardFields[2], '12');
    userEvent.type(cardFields[3], '777');
    fireEvent.click(screen.getByRole('button', { name: 'paymentPayBtn' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});