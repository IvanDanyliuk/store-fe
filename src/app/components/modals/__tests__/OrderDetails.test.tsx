import { fireEvent, screen } from '@testing-library/react';
import { orderMock } from '../../../../utils/testDataMocks';
import { renderWithProviders } from '../../../../utils/testUtils';
import OrderDetails from '../OrderDetails';


const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));


describe('Tests for the OrderDetails component', () => {
  beforeEach(() => {
    renderWithProviders(<OrderDetails order={orderMock} />);
    fireEvent.click(screen.getByRole('button', { name: '' }));
  });

  test('should navigate to the Order page after clicking the Edit button', () => {
    fireEvent.click(screen.getByRole('button', { name: 'orderDetailsEditBtn' }));
    expect(mockedUsedNavigate).toHaveBeenCalled();
  });

  test('should close the dialog after clicking the Delete button', () => {
    fireEvent.click(screen.getByRole('button', { name: 'orderDetailsDeleteBtn' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});