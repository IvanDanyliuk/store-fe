import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, renderWithProvidersForUpdation } from '../../../../utils/testUtils';
import { CreateProductForm } from '../';


describe('Tests for the CreateProductForm component: creation case', () => {
  test('should submit a form after passing the correct data', async () => {
    const file = new File(["(⌐□_□)"], "category_photo.png", { type: "image/png" });
    renderWithProviders(<CreateProductForm />);
    fireEvent.click(screen.getByRole('button', { name: 'productBtn' }));
    const textFields = screen.getAllByRole('textbox');
    const priceInput = screen.getByRole('spinbutton');
    const fileInput = screen.getByLabelText('productImage');
    const addPromotionBtn = screen.getByRole('button', { name: 'productAddPromotionBtn' });
    const submitFormBtn = screen.getByRole('button', { name: 'productSubmitBtn' });
    fireEvent.change(screen.getByRole('option', { name: 'Main Category Name' }));
    fireEvent.change(screen.getByRole('option', { name: 'Sub-category name' }));
    fireEvent.change(screen.getByRole('option', { name: '5' }));
    userEvent.type(textFields[0], 'Test Product Title');
    userEvent.type(textFields[1], 'Test Product Brand');
    userEvent.type(textFields[2], 'Test Product Short Information');
    await waitFor(() => {
      userEvent.upload(fileInput, file);
    });
    userEvent.type(textFields[3], 'Test Product Description');
    fireEvent.click(screen.getByRole('checkbox'));
    userEvent.type(textFields[4], 'TOP');
    fireEvent.click(addPromotionBtn);
    const deletePromotionBtn = screen.getByTestId('deletePromotionBtn');
    fireEvent.click(deletePromotionBtn);
    fireEvent.change(priceInput, { target: { value: '1000' } });
    fireEvent.click(submitFormBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('should not submit a form after passing incorrect data', () => {
    renderWithProviders(<CreateProductForm />);
    fireEvent.click(screen.getByRole('button', { name: 'productBtn' }));
    const submitFormBtn = screen.getByRole('button', { name: 'productSubmitBtn' });
    fireEvent.click(submitFormBtn);
    expect(screen.getByText('productValidationNameRequired')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('Tests for the CreateProductForm component: updation case', () => {
  test('should submit a form after passing the correct data', () => {
    renderWithProvidersForUpdation(<CreateProductForm />);
    const textFields = screen.getAllByRole('textbox');
    const addPromotionBtn = screen.getByRole('button', { name: 'productAddPromotionBtn' });
    const submitFormBtn = screen.getByRole('button', { name: 'productSubmitBtn' });
    userEvent.type(textFields[0], 'Updated Test Product Title');
    userEvent.type(textFields[1], 'Test Product Brand');
    userEvent.type(textFields[2], 'Test Product Short Information');
    userEvent.type(textFields[3], 'Test Product Description');
    fireEvent.click(screen.getByRole('checkbox'));
    userEvent.type(textFields[4], 'TOP');
    fireEvent.click(addPromotionBtn);
    fireEvent.click(submitFormBtn);
  });

  test('should submit a form after passing the incorrect data', () => {
    renderWithProvidersForUpdation(<CreateProductForm />);
    const textFields = screen.getAllByRole('textbox');
    const submitFormBtn = screen.getByRole('button', { name: 'productSubmitBtn' });
    userEvent.type(textFields[0], '');
    fireEvent.click(submitFormBtn);
    const closeFormBtn = screen.getAllByRole('button', { name: '' })[0];
    fireEvent.click(closeFormBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});