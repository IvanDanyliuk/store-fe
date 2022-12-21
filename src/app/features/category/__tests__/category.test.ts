import store from '../../store';
import { getCategory, clearCategory, clearError } from '../reducers';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../asyncActions';
import { categoriesListMock, categoryToUpdate, newCategoryMock } from '../../../../utils/testDataMocks';
import { setupCategoriesErrorHandlers, setupCategoriesSuccessHandlers } from '../../../../utils/serverMocks/categories';


describe('Tests for the Category reducers: success cases', () => {
  beforeEach(() => {
    setupCategoriesSuccessHandlers();
  });

  test('should get categories from the server by dispatching the getCategories action', async () => {
    let state = store.getState().category;
    await store.dispatch(getCategories());
    state = store.getState().category;
    expect(state.categories[0].main.title).toBe(categoriesListMock[0].main.title);
  });

  test('should get a category by dispatching the getCategory action', async () => {
    let state = store.getState().category;
    await store.dispatch(getCategories());
    state = store.getState().category;
    store.dispatch(getCategory(categoriesListMock[0]._id));
    state = store.getState().category;
    expect(state.category?.main.title).toBe(categoriesListMock[0].main.title);
  });

  test('should clear the Category store value by dispatching the clearCategory action', async () => {
    let state = store.getState().category;
    await store.dispatch(getCategories());
    state = store.getState().category;
    store.dispatch(clearCategory());
    state = store.getState().category;
    expect(state.category).toBeNull();
  });

  test('should clear the Error store value by dispatching the clearError action', async () => {
    let state = store.getState().category;
    await store.dispatch(getCategories());
    state = store.getState().category;
    store.dispatch(clearError());
    state = store.getState().category;
    expect(state.error).toBeNull();
  });

  test('should add a new category to the store by dispatching the createCategory action', async () => {
    let state = store.getState().category;
    await store.dispatch(createCategory(newCategoryMock));
    state = store.getState().category;
    expect(state.categories[0].main.title).toBe(newCategoryMock.main.title);
  });

  test('should not add a new category while category data has no title', async () => {
    let state = store.getState().category;
    await store.dispatch(createCategory({
      ...newCategoryMock,
      main: {
        ...newCategoryMock.main,
        title: ''
      }
    }));
    state = store.getState().category;
    expect(state.error).toBe('alertCreateCategoryMessage');
  });

  test('should update a category item by dispatching the updateCategory action', async () => {
    let state = store.getState().category;
    await store.dispatch(getCategories());
    state = store.getState().category;
    await store.dispatch(updateCategory(categoryToUpdate));
    state = store.getState().category;
    expect(state.categories[0].main.title).toBe(categoryToUpdate.updatedCategory.main.title);
  });

  test('should delete a category item by dispatching the deleteCategory action', async () => {
    let state = store.getState().category;
    await store.dispatch(createCategory(newCategoryMock));
    state = store.getState().category;
    state = store.getState().category;
    await store.dispatch(getCategories());
    state = store.getState().category;
    await store.dispatch(deleteCategory(categoriesListMock[0]._id!));
    state = store.getState().category;
    expect(state.categories).toHaveLength(categoriesListMock.length - 1);
  });
});


describe('Tests for the Category reducers: error cases', () => {
  beforeEach(() => {
    setupCategoriesErrorHandlers();
  });

  test('should get an error from the server by dispatching the getCategories action', async () => {
    let state = store.getState().category;
    await store.dispatch(getCategories());
    state = store.getState().category;
    expect(state.error).toBe('alertGetCategoriesMessage');
  });

  test('should get an error from the server by dispatching the createCategory action', async () => {
    let state = store.getState().category;
    await store.dispatch(createCategory(newCategoryMock));
    state = store.getState().category;
    expect(state.error).toBe('alertCreateCategoryMessage');
  });

  test('should get an error from the serverby dispatching the updateCategory action', async () => {
    let state = store.getState().category;
    await store.dispatch(getCategories());
    state = store.getState().category;
    await store.dispatch(updateCategory(categoryToUpdate));
    state = store.getState().category;
    expect(state.error).toBe('alertUpdateCategoryMessage');
  });

  test('should get an error from the server by dispatching the deleteCategory action', async () => {
    let state = store.getState().category;
    await store.dispatch(getCategories());
    state = store.getState().category;
    await store.dispatch(deleteCategory('product_category_id_7'));
    state = store.getState().category;
    expect(state.error).toBe('alertDeleteCategoryMessage');
  });
});