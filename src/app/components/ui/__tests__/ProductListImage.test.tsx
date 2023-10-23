import { render, screen } from '@testing-library/react';
import { ProductListImage } from '../';


describe('Tests for the ProductListImage component', () => {
  test('should render the ProductListImage component', () => {
    render(
      <ProductListImage 
        url='https://www.storage.com/images/image_1.png' 
        altText='image_1' 
      />
    );
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});