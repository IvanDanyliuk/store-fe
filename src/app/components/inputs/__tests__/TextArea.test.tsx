import { fireEvent, render, screen } from '@testing-library/react';
import TextArea from '../TextArea';


describe('Tests for the TextArea component', () => {
  const changeHandler = jest.fn();

const runValueValidation = (value: string | number) => {
  const field = screen.getByRole('textbox');
  fireEvent.change(field, value);
  fireEvent.blur(field);
};

describe('Tests for the TextArea component', () => {
  test('should render the TextArea component', () => {
    render(
      <TextArea 
        name='testName'
        value='Test Value' 
        label='Test Label'
        rows={5} 
        isRequired
        onChange={changeHandler}
        minLength={5}
        maxLength={17}
      />
    );
    expect(screen.getByText(/Test Label/)).toBeInTheDocument();
  });

  test('should render the validation error message when a textarea field is required and has no value', () => {
    render(
      <TextArea 
        name='testName'
        value='' 
        label='Test Label'
        rows={5} 
        isRequired
        onChange={changeHandler}
        minLength={5}
        maxLength={17}
      />
    );
    runValueValidation('');
    expect(screen.getByText(/inputFieldRequired/)).toBeInTheDocument();
  });

  test('should render the validation error message when a textarea field is required and value length is less than minLength parameter', () => {
    render(
      <TextArea 
        name='testName'
        value='Test' 
        label='Test Label'
        rows={5} 
        isRequired
        onChange={changeHandler}
        minLength={5}
        maxLength={17}
      />
    );
    runValueValidation('');
    expect(screen.getByText(/inputMinLength1 5 inputMinLength2/)).toBeInTheDocument();
  });

  test('should render the validation error message when a textarea field is required and value length is more than maxLength parameter', () => {
    render(
      <TextArea 
        name='testName'
        value='Test Value' 
        label='Test Label'
        rows={5} 
        isRequired
        onChange={changeHandler}
        minLength={1}
        maxLength={5}
      />
    );
    runValueValidation('');
    expect(screen.getByText(/inputMaxLength1 5 inputMaxLength2/)).toBeInTheDocument();
  });

  test('should hide the error message after passing the correct value', () => {
    render(
      <TextArea 
        name='testName'
        value='Test Value' 
        label='Test Label'
        isRequired
        onChange={changeHandler}
      />
    );
    runValueValidation('');
    runValueValidation('Test Value');
    expect(screen.queryByText(/inputFieldRequired/)).not.toBeInTheDocument();
  });
});
});