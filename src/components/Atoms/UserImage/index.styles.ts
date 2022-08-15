import styled, { css } from 'styled-components';
import { UserImageTypes } from '@/components/Atoms/UserImage';

type UserImageStyleTypes = Pick<UserImageTypes, 'imgSize'>;

export const Img = styled.img<UserImageStyleTypes>`
  border: 1px solid ${({ theme }) => theme.COLORS.LINE};
  border-radius: 50%;

  ${({ imgSize }) => {
    if (imgSize === 'MEDIUM')
      return css`
        width: 44px;
        height: 44px;
      `;
    if (imgSize === 'SMALL') {
      return css`
        width: 20px;
        height: 20px;
      `;
    }
  }}
`;
