import store from '../../store';
import { 
  clearProduct, 
  clearProductError, 
  clearSearchData, 
  setProductToUpdate 
} from '../reducers';
import { 
  getProduct, 
  getProducts, 
  getTopProducts, 
  getBrands, 
  createProduct, 
  findProducts, 
  updateProduct, 
  deleteProduct 
} from '../asyncActions';
import { setupProductErrorHandlers, setupProductSuccessHandlers } from '../../../../utils/serverMocks/product';
import { productItem, productResponseMock, productToUpdate } from '../../../../utils/testDataMocks';


describe('Tests for the Product reducers: success cases', () => {
  beforeEach(() => {
    setupProductSuccessHandlers();
  });

  test('should get a product by dispatching the getProduct action', async () => {
    let state = store.getState().product;
    await store.dispatch(getProduct(productItem._id));
    state = store.getState().product;
    expect(state.product!.title).toBe(productItem.title);
  });

  test('should get products by dispatching the getProducts action', async () => {
    let state = store.getState().product;
    await store.dispatch(getProducts({ page: 1, productsPerPage: 10, category: productItem.category.main.url }));
    state = store.getState().product;
    expect(state.products.data).toHaveLength(productResponseMock.data.length);
  });

  test('should get top products by dispatching the getTopProducts action', async () => {
    let state = store.getState().product;
    await store.dispatch(getTopProducts(1));
    state = store.getState().product;
    expect(state.products.data).toHaveLength(productResponseMock.data.length);
  });

  test('should get brands by dispatching the getBrands action', async () => {
    let state = store.getState().product;
    await store.dispatch(getBrands(productItem.category.main.url));
    state = store.getState().product;
    expect(state.brands).toHaveLength(3);
  });

  test('should create a product by dispatching the createProduct action', async () => {
    let state = store.getState().product;
    await store.dispatch(createProduct(productItem));
    state = store.getState().product;
    expect(state.products.data[0].title).toBe(productItem.title);
  });

  test('should find a product by dispatching the findProducts action', async () => {
    let state = store.getState().product;
    await store.dispatch(findProducts(productItem.title));
    state = store.getState().product;
    expect(state.search[0].title).toBe(productItem.title);
  });
  
  test('should update a product by dispatching the updateProduct action', async () => {
    let state = store.getState().product;
    store.dispatch(setProductToUpdate(productItem._id));
    state = store.getState().product;
    await store.dispatch(updateProduct(productToUpdate));
    state = store.getState().product;
    expect(state.products.data[0].title).toBe(productToUpdate.updatedProduct.title);
  });

  test('should delete a product by dispatching the deleteProduct action', async () => {
    let state = store.getState().product;
    await store.dispatch(deleteProduct(productItem._id));
    state = store.getState().product;
    expect(state.products.data).toHaveLength(productResponseMock.data.length - 1);
  });

  test('should set product to update by dispatching the setProductToUpdate action', async () => {
    let state = store.getState().product;
    await store.dispatch(getProducts({ page: 1, productsPerPage: 10, category: productItem.category.main.url }));
    state = store.getState().product;
    store.dispatch(setProductToUpdate(productItem._id));
    state = store.getState().product;
    expect(state.product).not.toBeNull();
  });

  test('should clear product data by dispatching the clearProduct action', async () => {
    let state = store.getState().product;
    await store.dispatch(getProducts({ page: 1, productsPerPage: 10, category: productItem.category.main.url }));
    state = store.getState().product;
    store.dispatch(setProductToUpdate(productItem._id));
    state = store.getState().product;
    store.dispatch(clearProduct());
    state = store.getState().product;
    expect(state.product).toBeNull();
  });

  test('should clear search data by dispatching the clearSearchData action', async () => {
    let state = store.getState().product;
    await store.dispatch(findProducts(productItem.title));
    state = store.getState().product;
    store.dispatch(clearSearchData());
    state = store.getState().product;
    expect(state.search).toHaveLength(0);
  })
});


describe('Tests for the Product reducers: error cases', () => {
  beforeEach(() => {
    setupProductErrorHandlers();
  });

  test('should get a product by dispatching the getProduct action', async () => {
    let state = store.getState().product;
    await store.dispatch(getProduct(productItem._id));
    state = store.getState().product;
    expect(state.error).toBe('alertGetProductMessage');
  });

  test('should get products by dispatching the getProducts action', async () => {
    let state = store.getState().product;
    await store.dispatch(getProducts({ page: 1, productsPerPage: 10, category: productItem.category.main.url }));
    state = store.getState().product;
    expect(state.error).toBe('alertGetProductsMessage');
  });

  test('should get top products by dispatching the getTopProducts action', async () => {
    let state = store.getState().product;
    await store.dispatch(getTopProducts(1));
    state = store.getState().product;
    expect(state.error).toBe('alertGetTopProductsMessage');
  });

  test('should get brands by dispatching the getBrands action', async () => {
    let state = store.getState().product;
    await store.dispatch(getBrands(productItem.category.main.url));
    state = store.getState().product;
    expect(state.error).toBe('alertGetBrandsMessage');
  });

  test('should create a product by dispatching the createProduct action', async () => {
    let state = store.getState().product;
    await store.dispatch(createProduct(productItem));
    state = store.getState().product;
    expect(state.error).toBe('alertCreateProductMessage');
  });

  test('should find a product by dispatching the findProducts action', async () => {
    let state = store.getState().product;
    await store.dispatch(findProducts(productItem.title));
    state = store.getState().product;
    expect(state.error).toBe('alertFindProductsMessage');
  });
  
  test('should update a product by dispatching the updateProduct action', async () => {
    let state = store.getState().product;
    store.dispatch(setProductToUpdate(productItem._id));
    state = store.getState().product;
    await store.dispatch(updateProduct(productToUpdate));
    state = store.getState().product;
    expect(state.error).toBe('alertUpdateProductMessage');
  });

  test('should delete a product by dispatching the deleteProduct action', async () => {
    let state = store.getState().product;
    await store.dispatch(deleteProduct(productItem._id));
    state = store.getState().product;
    expect(state.error).toBe('alertDeleteProductMessage');
  });

  test('should clear the product error by dispatching the clearProductError message', async () => {
    let state = store.getState().product;
    await store.dispatch(getProduct(productItem._id));
    state = store.getState().product;
    store.dispatch(clearProductError());
    state = store.getState().product;
    expect(state.error).toBeNull();
  });
});