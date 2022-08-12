import styled from 'styled-components';

import checkBoxInitial from '@/assets/icons/checkBoxInitial.svg?inline';
import checkBoxActive from '@/assets/icons/checkBoxActive.svg?inline';
import checkBoxDisable from '@/assets/icons/checkBoxDisable.svg?inline';

export const CheckBox = styled.div`
  width: 16px;
  height: 16px;

  input {
    display: none;

    &:checked ~ label::after {
      width: 16px;
      height: 16px;
      content: url(${checkBoxActive});
    }

    &:indeterminate ~ label::after {
      content: url(${checkBoxDisable});
    }
  }

  label {
    display: flex;
    cursor: pointer;

    &::after {
      width: 16px;
      height: 16px;
      content: url(${checkBoxInitial});
    }
  }
`;
