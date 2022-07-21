import styled, { css } from 'styled-components';

import checkBoxInitial from '@/assets/icons/checkBoxInitial.svg?inline';
import checkBoxActive from '@/assets/icons/checkBoxActive.svg?inline';
import checkBoxDisable from '@/assets/icons/checkBoxDisable.svg?inline';

import { CheckboxTypes } from '@/components/Atoms/CheckBox/';

type CheckboxStyleTypes = Pick<CheckboxTypes, 'checkedIssue'>;

export const CheckBox = styled.div<CheckboxStyleTypes>`
  width: 16px;
  height: 16px;
  cursor: pointer;

  #checkbox-ALL {
    & ~ label::after {
      content: ${({ checkedIssue }) =>
        checkedIssue.length && !checkedIssue.includes('ALL') && css`url(${checkBoxDisable});`};
    }
  }

  input {
    display: none;

    &:checked ~ label::after {
      width: 16px;
      height: 16px;
      content: url(${checkBoxActive});
    }
  }

  label {
    display: flex;

    &::after {
      width: 16px;
      height: 16px;
      content: url(${checkBoxInitial});
    }
  }
`;
