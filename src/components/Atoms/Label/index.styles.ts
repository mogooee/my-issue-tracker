import { LabelType } from '@/components/Atoms/Label';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

type StyledLabelTypes = Pick<LabelType, 'labelStyle' | 'backgroundColorCode' | 'textColor' | 'lineColor'>;

export const Label = styled.div<StyledLabelTypes>`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'center' })};
  ${({ theme }) => theme.FONTSTYLES.TEXT_XSMALL};
  width: fit-content;
  padding: 4px 16px;
  border-radius: 30px;
  border: 1px solid ${({ lineColor }) => lineColor};

  svg {
    margin-right: 6px;
  }

  ${({ labelStyle, backgroundColorCode, textColor }) => {
    if (labelStyle === 'DARK') {
      return css`
        background: ${darken(0.5, backgroundColorCode)};
        color: ${lighten(0.2, backgroundColorCode)};
        border: 1px solid;
        border-color: ${lighten(0.2, backgroundColorCode)};
      `;
    }
    if (labelStyle === 'LIGHT') {
      return css`
        background: ${backgroundColorCode};
        color: ${textColor === 'WHITE' ? '#FFF' : '#000'};
      `;
    }
  }};
`;
