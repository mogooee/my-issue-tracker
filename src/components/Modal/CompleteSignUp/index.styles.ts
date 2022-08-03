import styled from 'styled-components';

export const Title = styled.h1`
  ${({ theme }) => theme.FONTSTYLES.TEXT_LARGE};
`;

export const Comment = styled.p`
  ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL};
  margin: 18px 0px;
`;

export const MoveComment = styled.p`
  ${({ theme }) => theme.FONTSTYLES.TEXT_XSMALL};
  margin: 18px 0px;
`;
