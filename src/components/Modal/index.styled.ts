import styled from 'styled-components';

export const BackGround = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'center', justify: 'center' })};
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
`;

export const ModalBlock = styled.div`
  height: max-content;
  padding: 40px;
  position: absolute;
  border-radius: 20px;
  background: #fff;
`;
