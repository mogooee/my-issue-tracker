import checkOffCircle from '@/assets/icons/checkOffCircle.svg?inline';
import checkOnCircle from '@/assets/icons/checkOnCircle.svg?inline';
import styled from 'styled-components';

export const RadioList = styled.div<{ totalNum: number }>`
  display: grid;
  grid-template-columns: repeat(${({ totalNum }) => totalNum}, 100px);
`;

export const Radio = styled.div`
  input {
    display: none;

    &:checked ~ label::after {
      width: 16px;
      height: 16px;
      content: url(${checkOnCircle});
    }
  }

  label {
    ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'flex-end' })};
    flex-direction: row-reverse;
    cursor: pointer;
    color: ${({ theme }) => theme.COLORS.BODY};
    ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL}

    &:after {
      width: 16px;
      height: 16px;
      margin: -6px 10px 0 0;
      content: url(${checkOffCircle});
    }
  }
`;
