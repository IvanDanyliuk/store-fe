import { fireEvent, render, screen } from '@testing-library/react';
import { vacanciesListMock } from '../../../../utils/testDataMocks';
import { IVacancy } from '../../../features/vacancies/types';
import VacanciesTable from '../VacanciesTable';


const emptyVacanciesListMock: IVacancy[] = [];

const editHandler = jest.fn();
const deleteHandler = jest.fn();


describe('Tests for the VacanciesTable: successfull cases', () => {
  beforeEach(() => {
    render(
      <VacanciesTable 
        vacancies={vacanciesListMock} 
        status='succeeded' 
        onEdit={editHandler} 
        onDelete={deleteHandler}
      />
    );
  });

  test('should render passed categories data with the status value succeeded', () => {
    expect(screen.getAllByRole('row')).toHaveLength(vacanciesListMock.length + 1);
  });

  test('should call the editHandler function after clicking on the Edit button', () => {
    fireEvent.click(screen.getByRole('button', { name: 'editBtn' }));
    expect(editHandler).toHaveBeenCalled();
  });

  test('should call the deleteHandler function after clicking on the Delete button', () => {
    fireEvent.click(screen.getByRole('button', { name: 'deleteItemBtn' }));
    fireEvent.click(screen.getByRole('button', { name: 'deleteItemYes' }));
    expect(deleteHandler).toHaveBeenCalled();
  });
});


describe('Tests for the VacanciesTable: no data cases', () => {
  test('should render the loader while the status value is loading', () => {
    render(
      <VacanciesTable 
        vacancies={vacanciesListMock} 
        status='loading' 
        onEdit={editHandler} 
        onDelete={deleteHandler}
      />
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('should show the empty vacancies list message while the vacancies list is empty', () => {
    render(
      <VacanciesTable 
        vacancies={emptyVacanciesListMock} 
        status='succeeded' 
        onEdit={editHandler} 
        onDelete={deleteHandler}
      />
    );
    expect(screen.getByText('vacanciesNoDataMessage')).toBeInTheDocument();
  });
});