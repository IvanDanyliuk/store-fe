import { render, screen } from '@testing-library/react';
import { ButtonColor, ButtonType } from '../../../../types/types';
import { RoundedButton } from '../';


const clickHandler = jest.fn();

describe('Tests for the RoundedButton component', () => {
  test('should render the RoundedButton component', () => {
    render(
      <RoundedButton
        type={ButtonType.Button}
        color={ButtonColor.Primary}
        onClick={clickHandler}
      >
        i
      </RoundedButton>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});