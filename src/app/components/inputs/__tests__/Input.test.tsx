import { fireEvent, render, screen } from '@testing-library/react';
import Input from '../Input';


const changeHandler = jest.fn();

const runValueValidation = (value: string | number) => {
  const field = screen.getByRole('textbox');
  fireEvent.change(field, value);
  fireEvent.blur(field);
};

describe('Tests for the Input component', () => {
  test('should render the Input component', () => {
    render(
      <Input 
        name='testName'
        value='Test Value' 
        label='Test Label'
        type='input' 
        isRequired
        onChange={changeHandler}
        minLength={5}
        maxLength={17}
      />
    );
    expect(screen.getByText(/Test Label/)).toBeInTheDocument();
  });

  test('should render the validation error message when an input field is required and has no value', () => {
    render(
      <Input 
        name='testName'
        value='' 
        label='Test Label'
        type='input' 
        isRequired
        onChange={changeHandler}
        minLength={5}
        maxLength={17}
      />
    );
    runValueValidation('');
    expect(screen.getByText(/inputFieldRequired/)).toBeInTheDocument();
  });

  test('should render the validation error message when an input field is required and value length is less than minLength parameter', () => {
    render(
      <Input 
        name='testName'
        value='Test' 
        label='Test Label'
        type='input' 
        isRequired
        onChange={changeHandler}
        minLength={5}
        maxLength={17}
      />
    );
    runValueValidation('');
    expect(screen.getByText(/inputMinLength1 5 inputMinLength2/)).toBeInTheDocument();
  });

  test('should render the validation error message when an input field is required and value length is more than maxLength parameter', () => {
    render(
      <Input 
        name='testName'
        value='Test Value' 
        label='Test Label'
        type='input' 
        isRequired
        onChange={changeHandler}
        minLength={1}
        maxLength={5}
      />
    );
    runValueValidation('');
    expect(screen.getByText(/inputMaxLength1 5 inputMaxLength2/)).toBeInTheDocument();
  });

  test('should render the validation error message when an input field has an email type and the email format is incorrect', () => {
    render(
      <Input 
        name='testName'
        value='testemail' 
        label='Test Label'
        type='email'
        onChange={changeHandler}
      />
    );
    runValueValidation('testemail');
    expect(screen.getByText(/inputInvalidEmail/)).toBeInTheDocument();
  });

  test('should hide the error message after passing the correct value', () => {
    render(
      <Input 
        name='testName'
        value='Test Value' 
        label='Test Label'
        isRequired
        onChange={changeHandler}
      />
    );
    runValueValidation('');
    screen.debug(undefined, 300000)
    runValueValidation('Test Value');
    expect(screen.queryByText(/inputFieldRequired/)).not.toBeInTheDocument();
  });
});