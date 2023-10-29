import { render, screen } from '@testing-library/react';
import { ButtonColor, ButtonType } from '../../../../types/types';
import { Button } from '../';


const clickHandler = jest.fn();

describe('Tests for the Button component', () => {
  test('should render the Button component', () => {
    render(
      <Button 
        type={ButtonType.Button} 
        color={ButtonColor.Primary} 
        onClick={clickHandler}
      >
        Submit
      </Button>
    );
    expect(screen.getByText(/Submit/)).toBeInTheDocument();
  });
});