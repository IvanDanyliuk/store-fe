import { render, screen } from '@testing-library/react';
import { Checkbox } from '../';


const clickHandler = jest.fn();

describe('Tests for the Checkbox component', () => {
  test('should render the Checkbox component', () => {
    render(
      <Checkbox 
        name='testName'
        label='Test Label' 
        checked
        onChange={clickHandler}
      />
    );
    expect(screen.getByText(/Test Label/)).toBeInTheDocument();
  });
});