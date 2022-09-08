import styled from 'styled-components';
import { Indicator } from '@/components/Molecules/Dropdown/Indicator/index.styles';
import { ReactionResponseTypes } from '@/api/issue/types';

type ReactionType = Pick<ReactionResponseTypes, 'emoji'> & { nickname: string[] };

export const ReactionTab = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'flex-start' })};
  margin-top: 8px;
  gap: 12px;

  svg {
    margin: 0;
  }
  ${Indicator} {
    & > div {
      padding: 4px;
    }
  }
`;

export const Reaction = styled.div<ReactionType>`
  position: relative;

  &:hover {
    cursor: pointer;
  }

  &:hover > div::before {
    position: absolute;
    top: -29px;
    z-index: 99;
    display: block;
    cursor: default;
    content: '${({ nickname, emoji }) => `${nickname.join(',')} reacted with ${emoji} emoji`}';
    background: #000;
    color: #fff;
    border-radius: 6px;
    padding: 2px 6px;
    width: max-content;
  }

  &:hover > div::after {
    content: '';
    position: absolute;
    top: -9px;
    border: 7px solid transparent;
    border-top: 7px solid #000;
  }
`;
