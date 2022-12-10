import { render, screen } from '@testing-library/react';
import Divider from '../Divider';


describe('Tests for the Divider component', () => {
  test('should render horizontally oriented Divider component using relative units of measurement', () => {
    render(
      <Divider 
        direction='horizontal' 
        length={20} 
        mTop={10}
        mLeft={10}
      />
    );
    expect(screen.getByTestId('horizontal-divider')).toBeInTheDocument();
  });
  test('should render vertically oriented Divider component using relative units of measurement', () => {
    render(
      <Divider 
        direction='vertical' 
        length={25} 
        mBottom={10}
        mRight={10}
      />
    );
    expect(screen.getByTestId('vertical-divider')).toBeInTheDocument();
  });
  test('should render the Divider component using absolute units of measurement', () => {
    render(
      <Divider 
        direction='horizontal' 
        length={'20%'} 
        mTop={'10px'}
        mLeft={'10px'}
      />
    );
    expect(screen.getByTestId('horizontal-divider')).toBeInTheDocument();
  });
  test('should render the Divider component using absolute units of measurement', () => {
    render(
      <Divider 
        direction='vertical' 
        length={'25%'} 
        mBottom={'10px'}
        mRight={'10px'}
      />
    );
    expect(screen.getByTestId('vertical-divider')).toBeInTheDocument();
  });
});