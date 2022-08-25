import { LabelTypes } from '@/components/Atoms/Label';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

type StyledLabelTypes = Pick<LabelTypes, 'labelStyle' | 'backgroundColor' | 'textColor'>;

export const Label = styled.div<StyledLabelTypes>`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'center' })};
  ${({ theme }) => theme.FONTSTYLES.TEXT_XSMALL};
  width: fit-content;
  padding: 4px 16px;
  border-radius: 30px;

  ${({ labelStyle, backgroundColor, textColor }) => {
    if (labelStyle === 'DARK') {
      return css`
        background: ${darken(0.5, backgroundColor)};
        color: ${lighten(0.2, backgroundColor)};
        border: 1px solid;
        border-color: ${lighten(0.2, backgroundColor)};
      `;
    }
    if (labelStyle === 'LIGHT') {
      return css`
        background: ${backgroundColor};
        color: ${textColor === 'WHITE' ? '#FFF' : '#000'};
      `;
    }
  }}

  svg {
    margin-right: 6px;
  }
`;
