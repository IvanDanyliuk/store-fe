import { fireEvent, render, screen } from '@testing-library/react';
import { productsMock } from '../../../../utils/testDataMocks';
import Pagination from '../Pagination';


const setPageHandler = jest.fn();

describe('Tests for the Pagination component', () => {
  test('should call the setPageHandler function after clicking on the numeration button', () => {
    render(
      <Pagination 
        range={[1]} 
        slice={productsMock} 
        page={1} 
        setPage={setPageHandler} 
      />
    );
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    expect(setPageHandler).toHaveBeenCalled();
  });

  test('should call the setPageHandler function after clicking on the numeration button while the slice is empty', () => {
    render(
      <Pagination 
        range={[1]} 
        slice={[]} 
        page={2} 
        setPage={setPageHandler} 
      />
    );
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    expect(setPageHandler).toHaveBeenCalled();
  });
});