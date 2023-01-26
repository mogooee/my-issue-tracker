import styled, { css } from 'styled-components';
import { DropdownIndicatorTypes } from '@/components/Molecules/Dropdown/types';

type StyledDropdownIndicatorTypes = Pick<DropdownIndicatorTypes, 'indicatorStyle' | 'isActive'>;

export const Indicator = styled.summary<StyledDropdownIndicatorTypes>`
.indicator__container {
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center' })};
}

  position: relative;
  width: fit-content;
  height: fit-content;
  list-style: none;
  cursor: pointer;
  color: ${({ theme }) => theme.COLORS.LABEL};
  ${({ theme }) => theme.FONTSTYLES.LINK_SMALL};

  ${({ indicatorStyle }) =>
    indicatorStyle !== 'BTN_GROUP' &&
    css`
      span {
        margin-right: 4px;
      }
    `}

  &:hover {
    span {
      color: ${({ theme }) => theme.COLORS.BODY};
    }

    svg {
      stroke: ${({ theme }) => theme.COLORS.BODY};
    }
  }

  ${({ indicatorStyle }) =>
    indicatorStyle === 'FILTERBAR' &&
    css`
      padding: 6px 24px;
      border: 1px solid ${({ theme }) => theme.COLORS.LINE};
      border-radius: 11px 0px 0px 11px;
      background: ${({ theme }) => theme.COLORS.BACKGROUND};

      span {
        margin-right: 24px;
      }

      &:hover {
        background: ${({ theme }) => theme.COLORS.LINE};
      }
    `};

  ${({ indicatorStyle }) =>
    indicatorStyle === 'SIDEBAR' &&
    css`
      span {
        width: 224px;
      }
    `};

  ${({ indicatorStyle }) =>
    indicatorStyle === 'BTN_GROUP' &&
    css`
      border: 1px solid ${({ theme }) => theme.COLORS.LINE};
      border-radius: 6px;
      padding: 3px 12px;

      &:hover {
        background: ${({ theme }) => theme.COLORS.PRIMARY.BLUE};
        span {
          color: ${({ theme }) => theme.COLORS.OFF_WHITE};
        }
      }
    `};

  ${({ indicatorStyle, isActive }) =>
    indicatorStyle &&
    isActive &&
    css`
      background: ${({ theme }) => theme.COLORS.OFF_WHITE};
      border: 1px solid ${({ theme }) => theme.COLORS.TITLE_ACTIVE};
      border-right: none;
    `}
    &::marker,
    &::-webkit-details-marker {
      display: none;
    }
  }
}
`;
