import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../../utils/testUtils';
import EditReviewModal from '../EditReviewModal';


const reviewMock = {
  _id: 'review_id_1',
  productId: 'product_id_1',
  productImageUrl: 'https://www.storage.com/products/product_1.png',
  userFirstName: 'Test User First Name',
  userLastName: 'Test User Last Name',
  userEmail: 'test@test.com',
  userAvatarUrl: 'https://www.storage.com/users/user_1.png',
  advantages: 'Test Advantages',
  disadvantages: 'Test Disadvantages',
  comment: 'Test Comment',
  rate: 5,
  likes: [],
  dislikes: [],
  date: new Date()
};

const reviewErrorMock = {
  _id: 'review_id_1',
  productId: 'product_id_1',
  productImageUrl: 'https://www.storage.com/products/product_1.png',
  userFirstName: 'Test User First Name',
  userLastName: 'Test User Last Name',
  userEmail: 'test@test.com',
  userAvatarUrl: 'https://www.storage.com/users/user_1.png',
  advantages: 'Test Advantages',
  disadvantages: 'Test Disadvantages',
  comment: '',
  rate: 5,
  likes: [],
  dislikes: [],
  date: new Date()
};


describe('Tests for the EditReviewModal component', () => {
  beforeEach(() => {
    renderWithProviders(<EditReviewModal review={reviewMock} />);
    fireEvent.click(screen.getByRole('button', { name: '' }));
  });

  test('should submit the form after passing a correct data', () => {
    const advantagesInput = screen.getByLabelText('editReviewAdvantages');
    userEvent.type(advantagesInput, '');
    userEvent.type(advantagesInput, 'Updated Test Advantages');
    fireEvent.click(screen.getByRole('button', { name: 'editReviewSubmitBtn' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('should update the rating value after clicking the rating star button', () => {
    fireEvent.click(screen.getAllByRole('radio')[3]);
    fireEvent.click(screen.getByRole('button', { name: 'editReviewSubmitBtn' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('Tests for the EditReviewModal component', () => {
  beforeEach(() => {
    renderWithProviders(<EditReviewModal review={reviewErrorMock} />);
    fireEvent.click(screen.getByRole('button', { name: '' }));
  });

  test('should show the error message after passing wrong data', () => {
    fireEvent.click(screen.getByRole('button', { name: 'editReviewSubmitBtn' }));
    expect(screen.getByText('commentValidationCommentRequired')).toBeInTheDocument();
  });

  test('should show the error message after passing wrong data', () => {
    fireEvent.click(screen.getByRole('button', { name: 'editReviewSubmitBtn' }));
    fireEvent.click(screen.getByTestId('closeBtn'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});