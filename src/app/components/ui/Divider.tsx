import React from 'react';
import styled from 'styled-components';
import { IDivider } from '../../../types/types';


const HorizontalLine = styled.div<IDivider>`
  margin-top: ${({ mTop }) => typeof mTop === 'string' ? mTop : `${mTop}px`};
  margin-bottom: ${({ mBottom }) => typeof mBottom === 'string' ? mBottom : `${mBottom}px`};
  margin-left: ${({ mLeft }) => typeof mLeft === 'string' ? mLeft : `${mLeft}px`};
  margin-right: ${({ mRight }) => typeof mRight === 'string' ? mRight : `${mRight}px`};
  display: flex;
  width: ${({ length }) => typeof length === 'number' ? `${length}%` : `${length}px`};
  height: 1px;
  background: #a2a2a2;
`;

const VerticalLine = styled.div<IDivider>`
  margin-top: ${({ mTop }) => typeof mTop === 'string' ? mTop : `${mTop}px`};
  margin-bottom: ${({ mBottom }) => typeof mBottom === 'string' ? mBottom : `${mBottom}px`};
  margin-left: ${({ mLeft }) => typeof mLeft === 'string' ? mLeft : `${mLeft}px`};
  margin-right: ${({ mRight }) => typeof mRight === 'string' ? mRight : `${mRight}px`};
  display: flex;
  width: 1px;
  height: ${({ length }) => typeof length === 'number' ? `${length}%` : `${length}px`};
  background: #a2a2a2;
`;

const Divider: React.FC<IDivider> = ({ 
  direction, 
  length, 
  mTop, 
  mBottom, 
  mLeft, 
  mRight 
}) => {
  return direction === 'horizontal' ? (
      <HorizontalLine 
        length={length} 
        mTop={mTop} 
        mBottom={mBottom} 
        mLeft={mLeft} 
        mRight={mRight} 
      />
    ) : (
      <VerticalLine 
        length={length} 
        mTop={mTop} 
        mBottom={mBottom} 
        mLeft={mLeft} 
        mRight={mRight} 
      />
    );
};

export default Divider;