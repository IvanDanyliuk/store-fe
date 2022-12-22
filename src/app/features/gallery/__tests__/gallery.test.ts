import store from '../../store';
import { clearGalleryError } from '../reducers';
import { getGalleryImages, addGalleryImage, deleteGalleryImage } from '../asyncActions';
import { setupGalleryErrorHandlers, setupGallerySuccessHandlers } from '../../../../utils/serverMocks/gallery';
import { galleryImage, galleryUrlsSuccess } from '../../../../utils/testDataMocks';


describe('Tests for the Gallery reducers: success cases', () => {
  beforeEach(() => {
    setupGallerySuccessHandlers();
  });

  test('should get the gallery data from the server by dispatching the getGalleryImages action', async () => {
    let state = store.getState().gallery;
    await store.dispatch(getGalleryImages());
    state = store.getState().gallery;
    expect(state.imageUrls).toHaveLength(galleryUrlsSuccess.length);
  });

  test('should add the image url to the imageUrls field at the store by dispatching the addGalleryImage action', async () => {
    let state = store.getState().gallery;
    await store.dispatch(addGalleryImage(galleryImage));
    state = store.getState().gallery;
    expect(state.imageUrls[0].url).toBe(galleryImage.url);
  });

  test('should delete the image url by dispatching the deleteGalleryImage action', async () => {
    let state = store.getState().gallery;
    await store.dispatch(getGalleryImages());
    state = store.getState().gallery;
    await store.dispatch(deleteGalleryImage(galleryImage._id!));
    state = store.getState().gallery;
    expect(state.imageUrls).toHaveLength(galleryUrlsSuccess.length - 1);
  });
});


describe('Tests for the Gallery reducers: error cases', () => {
  beforeEach(() => {
    setupGalleryErrorHandlers();
  });

  test('should get the error message by dispatching the getGalleryImages action', async () => {
    let state = store.getState().gallery;
    await store.dispatch(getGalleryImages());
    state = store.getState().gallery;
    expect(state.error).toBe('alertGetGalleryImagesMessage');
  });

  test('should get an error message by dispatching the addGalleryImage action', async () => {
    let state = store.getState().gallery;
    await store.dispatch(addGalleryImage(galleryImage));
    state = store.getState().gallery;
    expect(state.error).toBe('alertAddGalleryImageMessage');
  });

  test('should get an error message by dispatching the deleteGalleryImage action', async () => {
    let state = store.getState().gallery;
    await store.dispatch(getGalleryImages());
    state = store.getState().gallery;
    await store.dispatch(deleteGalleryImage(galleryImage._id!));
    state = store.getState().gallery;
    expect(state.error).toBe('alertDeleteGalleryImageMessage');
  });

  test('should clear the galley error by dispatching the clearGalleryError action', async () => {
    let state = store.getState().gallery;
    await store.dispatch(getGalleryImages());
    state = store.getState().gallery;
    store.dispatch(clearGalleryError());
    state = store.getState().gallery;
    expect(state.error).toBeNull();
  });
});