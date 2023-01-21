import { fireEvent, render, screen } from '@testing-library/react';
import PageListPagination from '../PageListPagination';


const clickHandler = jest.fn();

describe('Tests for the PageListPagination component', () => {
  beforeEach(() => {
    render(
      <PageListPagination 
        currentPage={1} 
        pageCount={10} 
        setPage={clickHandler} 
      />
    );
  });

  test('the pageCount value should be equal to the number of navigation buttons', () => {
    expect(screen.getAllByRole('button')).toHaveLength(12);
  });

  test('should call the clickHandler function when clicking on the page number button', () => {
    fireEvent.click(screen.getByRole('button', { name: /2/ }));
    expect(clickHandler).toHaveBeenCalled();
  });
});