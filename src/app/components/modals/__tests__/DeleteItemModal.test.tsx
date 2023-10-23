import { fireEvent, screen, render } from '@testing-library/react';
import { DeleteItemModal } from '../';


const deleteHandlerMock = jest.fn();
const messageMock = 'Do you want to delete this item?';


describe('Tests for the DeleteItemModal component', () => {
  beforeEach(() => {
    render(
      <DeleteItemModal 
        deleteHandler={deleteHandlerMock} 
        message={messageMock}
      />
    );
  });

  test('should call the deleteHandler function by clicking on the Yes button', () => {
    fireEvent.click(screen.getByRole('button', { name: 'deleteItemBtn' }));
    fireEvent.click(screen.getByRole('button', { name: 'deleteItemYes' }));
    expect(deleteHandlerMock).toHaveBeenCalled();
  });

  test('should close the modal by clicking the No button', () => {
    fireEvent.click(screen.getByRole('button', { name: 'deleteItemBtn' }));
    fireEvent.click(screen.getByRole('button', { name: 'deleteItemNo' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});