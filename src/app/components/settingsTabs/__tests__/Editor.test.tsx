import { fireEvent, screen, waitFor } from '@testing-library/react';
import { setupCategoriesSuccessHandlers } from '../../../../utils/serverMocks/categories';
import { setupGallerySuccessHandlers } from '../../../../utils/serverMocks/gallery';
import { setupProductSuccessHandlers } from '../../../../utils/serverMocks/product';
import { setupShippingSuccessHandlers } from '../../../../utils/serverMocks/shipping';
import { setupUserSuccessHandlers } from '../../../../utils/serverMocks/user';
import { setupVacanciesSuccessHandlers } from '../../../../utils/serverMocks/vacancies';
import { galleryUrlsSuccess } from '../../../../utils/testDataMocks';
import { renderWithProviders } from '../../../../utils/testUtils';
import { Editor } from '../';


describe('Tests for the Editor component', () => {
  beforeEach(() => {
    setupProductSuccessHandlers();
    setupCategoriesSuccessHandlers();
    setupVacanciesSuccessHandlers();
    setupShippingSuccessHandlers();
    setupUserSuccessHandlers();
    setupGallerySuccessHandlers();
    renderWithProviders(<Editor />);
  });

  test('should rende the Editor component', () => {
    expect(screen.getAllByRole('heading')).toHaveLength(5);
  });

  test('should open the Edit product modal after clicking the Edit Product button', async () => {
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'editBtn' })[0]);
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('should delete the product after clicking the Delete Product button', async () => {
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'deleteItemBtn' })[0]);
      fireEvent.click(screen.getByRole('button', { name: 'deleteItemYes' }));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  test('should open the Edit vacancy modal after clicking the Edit Vacancy button', async () => {
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'editBtn' })[1]);
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('should delete the vacancy after clicking the Delete Vacancy button', async () => {
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'deleteItemBtn' })[3]);
      fireEvent.click(screen.getByRole('button', { name: 'deleteItemYes' }));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  test('should open the Edit category modal after clicking the Edit Category button', async () => {
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'tableEditBtn' })[0]);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  test('should delete the category after clicking the Delete Category button', async () => {
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'deleteItemBtn' })[1]);
      fireEvent.click(screen.getByRole('button', { name: 'deleteItemYes' }));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  test('should open the Edit shipping modal after clicking the Edit Shipping button', async () => {
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'tableEditBtn' })[1]);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  test('should delete the shipping after clicking the Delete Shipping button', async () => {
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'deleteItemBtn' })[2]);
      fireEvent.click(screen.getByRole('button', { name: 'deleteItemYes' }));
      expect(screen.queryByText('Test Company')).not.toBeInTheDocument();
    });
  });

  test('should delete image from the gallery image list after clicking the Delete button', async () => {
    const deleteGalleryImageBtns = await screen.findAllByTestId('deleteGalleryImageBtn');
    fireEvent.click(deleteGalleryImageBtns[1]);
    await waitFor(() => {
      expect(screen.getAllByTestId('deleteGalleryImageBtn')).toHaveLength(galleryUrlsSuccess.length - 1);
    });
  });
});