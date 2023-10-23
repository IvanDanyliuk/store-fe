import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, renderWithProvidersForUpdation } from '../../../../utils/testUtils';
import { CreateCategoryForm } from '../';


const openForm = () => {
  fireEvent.click(screen.getByRole('button', { name: 'categoryBtn' }));
};

const submitForm = () => {
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
};

const closeForm = () => {
  fireEvent.click(screen.getByRole('button', { name: '' }));
};

describe('Tests for the CreateCategoryForm component: creation case', () => {
  let file: any;
  beforeEach(() => {
    file = new File(["(⌐□_□)"], "category_photo.png", { type: "image/png" });
    renderWithProviders(<CreateCategoryForm />);
  });

  test('should submit form after passing the correct data', async () => {
    openForm();
    const inputs = screen.getAllByRole('textbox');
    const addSubCategoryBtn = screen.getByRole('button', { name: 'categoryCreateSubBtn' });
    userEvent.type(inputs[0], 'Test Category');
    userEvent.type(inputs[1], 'Test Sub-Category');
    userEvent.click(addSubCategoryBtn);
    const fileInput = screen.getByLabelText('categoryImage');
    await waitFor(() => {
      userEvent.upload(fileInput, file);
    });
    submitForm();
    expect(screen.queryByLabelText('categoryImage')).not.toBeInTheDocument();
  });

  test('should not submit form after passing the incorrect data', () => {
    openForm();
    const inputs = screen.getAllByRole('textbox');
    const addSubCategoryBtn = screen.getByRole('button', { name: 'categoryCreateSubBtn' });
    userEvent.type(inputs[0], '');
    userEvent.type(inputs[1], '');
    userEvent.click(addSubCategoryBtn);
    submitForm();
    closeForm();
    expect(screen.queryByText('categoryValidationMainCategoryRequired')).not.toBeInTheDocument();
  });
});

describe('Tests for the CreateCategoryForm component: updation case', () => {
  

  test('should submit form after passing the correct data', async () => {
    renderWithProvidersForUpdation(<CreateCategoryForm />);
    const inputs = screen.getAllByRole('textbox');
    const addSubCategoryBtn = screen.getByRole('button', { name: 'categoryCreateSubBtn' });
    userEvent.type(inputs[0], 'Updated Test Category');
    userEvent.type(inputs[1], 'Updated Test Sub-Category');
    userEvent.click(addSubCategoryBtn);
    submitForm();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('should delete sub-category after clicking the delete button', () => {
    renderWithProvidersForUpdation(<CreateCategoryForm />);
    const inputs = screen.getAllByRole('textbox');
    const addNewSubCategoryBtn = screen.getByRole('button', { name: 'categoryCreateSubBtn' });
    userEvent.type(inputs[0], '');
    userEvent.type(inputs[1], 'New Test Sub-Category');
    fireEvent.click(addNewSubCategoryBtn);
    const deleteIcons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(deleteIcons[1]);
    submitForm();
    expect(screen.queryByText('New Test Sub-Category')).not.toBeInTheDocument();
  });

  test('should not update form with empty data', () => {
    renderWithProvidersForUpdation(<CreateCategoryForm />);
    openForm();
    openForm();
    closeForm();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  })
});