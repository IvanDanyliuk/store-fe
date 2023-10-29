import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../utils/testUtils';
import { AddCommentForm } from '../';


const fillForm = (advantages: string, disadvantages: string, comment: string) => {
  fireEvent.click(screen.getByRole('button', { name: 'commentBtnComment' }));
  const stars = screen.getAllByRole('radio');
  fireEvent.click(stars[3]);
  const inputs = screen.getAllByRole('textbox');
  fireEvent.change(inputs[0], { target: { value: advantages } });
  fireEvent.change(inputs[1], { target: { value: disadvantages } });
  fireEvent.change(inputs[2], { target: { value: comment } });
};

const submitForm = () => {
  const submitBtn = screen.getByRole('button', { name: 'commentBtnSubmit' });
  fireEvent.click(submitBtn);
};

const closeForm = () => {
  const closeBtn = screen.getByRole('button', { name: '' });
  fireEvent.click(closeBtn);
};

describe('Tests for the AddCommentForm component', () => {
  beforeEach(() => {
    renderWithProviders(<AddCommentForm />);
  });

  test('should render the AddCommentForm component and close it after filling and submitting the form', () => {
    fillForm('Test Advantages', 'Test Disadvantages', 'Test Comment');
    submitForm();
    expect(screen.queryByRole('button', { name: 'commentBtnSubmit' })).not.toBeInTheDocument();
  });

  test('should not submit the form after passing wrong data', () => {
    fillForm('', '', '');
    submitForm();
    closeForm();
    expect(screen.queryByRole('button', { name: 'commentBtnSubmit' })).not.toBeInTheDocument();
  });
});