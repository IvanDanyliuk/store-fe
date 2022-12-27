import store from '../../store';
import { clearVacancy, clearVacancyError, setVacancyToUpdate } from '../reducers';
import { getVacancies, getVacancy, createVacancy, updateVacancy, deleteVacancy } from '../asyncActions';
import { setupVacanciesErrorHandlers, setupVacanciesSuccessHandlers } from '../../../../utils/serverMocks/vacancies';
import { vacancyItemMock, vacancyResponseMock, vacancyToUpdateMock } from '../../../../utils/testDataMocks';


describe('Tests for the Vacancies reducers: success cases', () => {
  beforeEach(() => {
    setupVacanciesSuccessHandlers();
  });

  test('should get vacancies by dispatching the getVacancies action', async () => {
    let state = store.getState().vacancies;
    await store.dispatch(getVacancies({ page: 1, itemsPerPage: 10 }));
    state = store.getState().vacancies;
    expect(state.vacancies.data).toHaveLength(vacancyResponseMock.data.length);
  });

  test('should get a vacancy by dispatching the getVacancy action', async () => {
    let state = store.getState().vacancies;
    await store.dispatch(getVacancy(vacancyResponseMock.data[0]._id));
    state = store.getState().vacancies;
    expect(state.vacancy).not.toBeNull();
  });

  test('should add a new vacancy by dispatching the createVacancy action', async () => {
    let state = store.getState().vacancies;
    await store.dispatch(createVacancy(vacancyItemMock));
    state = store.getState().vacancies;
    expect(state.vacancies.data).toHaveLength(vacancyResponseMock.data.length + 1);
  });

  test('should update the vacancy by dispatching the updateVacancy action', async () => {
    let state = store.getState().vacancies;
    await store.dispatch(getVacancies({ page: 1, itemsPerPage: 10 }));
    state = store.getState().vacancies;
    await store.dispatch(updateVacancy(vacancyToUpdateMock));
    state = store.getState().vacancies;
    expect(state.vacancies.data[0].title).toBe(vacancyToUpdateMock.updatedVacancy.title);
  });

  test('should delete the vacancy item by dispatching the deleteVacancy action', async () => {
    let state = store.getState().vacancies;
    await store.dispatch(getVacancies({ page: 1, itemsPerPage: 10 }));
    state = store.getState().vacancies;
    await store.dispatch(deleteVacancy(vacancyResponseMock.data[0]._id));
    state = store.getState().vacancies;
    expect(state.vacancies.data).toHaveLength(0);
  });

  test('should set a vacancy to the vacancy field by dispatching the setVacancyToUpdate action', async () => {
    let state = store.getState().vacancies;
    await store.dispatch(getVacancies({ page: 1, itemsPerPage: 10 }));
    state = store.getState().vacancies;
    store.dispatch(setVacancyToUpdate(vacancyResponseMock.data[0]._id));
    state = store.getState().vacancies;
    expect(state.vacancy).not.toBeNull();
  });

  test('should clear the vacancy field by dispatching the clearVacancy action', async () => {
    let state = store.getState().vacancies;
    await store.dispatch(getVacancies({ page: 1, itemsPerPage: 10 }));
    state = store.getState().vacancies;
    store.dispatch(setVacancyToUpdate(vacancyResponseMock.data[0]._id));
    state = store.getState().vacancies;
    store.dispatch(clearVacancy());
    state = store.getState().vacancies;
    expect(state.vacancy).toBeNull();
  });
});


describe('Tests for the Vacancies reducers: error cases', () => {
  beforeEach(() => {
    setupVacanciesErrorHandlers();
  });

  test('should get vacancies by dispatching the getVacancies action', async () => {
    let state = store.getState().vacancies;
    await store.dispatch(getVacancies({ page: 1, itemsPerPage: 10 }));
    state = store.getState().vacancies;
    expect(state.error).toBe('alertGetVacanciesMessage');
  });

  test('should get a vacancy by dispatching the getVacancy action', async () => {
    let state = store.getState().vacancies;
    await store.dispatch(getVacancy(vacancyResponseMock.data[0]._id));
    state = store.getState().vacancies;
    expect(state.error).toBe('alertGetVacancyMessage');
  });

  test('should add a new vacancy by dispatching the createVacancy action', async () => {
    let state = store.getState().vacancies;
    await store.dispatch(createVacancy(vacancyItemMock));
    state = store.getState().vacancies;
    expect(state.error).toBe('alertCreateVacancyMessage');
  });

  test('should update the vacancy by dispatching the updateVacancy action', async () => {
    let state = store.getState().vacancies;
    await store.dispatch(getVacancies({ page: 1, itemsPerPage: 10 }));
    state = store.getState().vacancies;
    await store.dispatch(updateVacancy(vacancyToUpdateMock));
    state = store.getState().vacancies;
    expect(state.error).toBe('alertUpdateVacancyMessage');
  });

  test('should delete the vacancy item by dispatching the deleteVacancy action', async () => {
    let state = store.getState().vacancies;
    await store.dispatch(getVacancies({ page: 1, itemsPerPage: 10 }));
    state = store.getState().vacancies;
    await store.dispatch(deleteVacancy(vacancyResponseMock.data[0]._id));
    state = store.getState().vacancies;
    expect(state.error).toBe('alertDeleteVacancyMessage');
  });

  test('should set the error value as null by dispatching the clearVacancyError action', async () => {
    let state = store.getState().vacancies;
    await store.dispatch(getVacancies({ page: 1, itemsPerPage: 10 }));
    state = store.getState().vacancies;
    store.dispatch(clearVacancyError());
    state = store.getState().vacancies;
    expect(state.error).toBeNull();
  });
});