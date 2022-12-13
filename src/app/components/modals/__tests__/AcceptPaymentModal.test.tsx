import { fireEvent, render, screen } from '@testing-library/react';
import AcceptPaymentModal from '../AcceptPaymentModal';


const closeModalHandler = jest.fn();

describe('Tests for the AcceptPaymentModal component', () => {
  test('should call the closeHandler function after clicking on the close button', () => {
    render(
      <AcceptPaymentModal 
        isOpen={true}
        onClose={closeModalHandler}
      />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(closeModalHandler).toHaveBeenCalled();
  });
});