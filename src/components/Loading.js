import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
  align-self:center;
  margin-top: 5rem;
  width: 2rem;
  height: 2rem;
  border: 0.3rem solid #34ACB7;
  border-radius: 50%;
  border-top-color: transparent;
  animation: ${spin} 1s linear infinite;
`;

export default Loading;
