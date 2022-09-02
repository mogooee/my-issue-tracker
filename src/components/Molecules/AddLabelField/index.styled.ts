import styled from 'styled-components';

export const AddLabelField = styled.div`
  width: 1280px;
  height: 345px;
  background: ${({ theme }) => theme.COLORS.OFF_WHITE};
  border: 1px solid ${({ theme }) => theme.COLORS.LINE};
  border-radius: 16px;
  padding: 32px;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(6, 1fr);
`;

export const Title = styled.h1`
  ${({ theme }) => theme.FONTSTYLES.TEXT_LARGE}
  margin-bottom:24px;
  grid-column: 1/7;
`;

export const EditField = styled.div`
  grid-column: 1/7;
  grid-row: 2/3;
  display: grid;
  grid-template-columns: 344px auto;
  align-items: center;

  & > div:first-child {
    justify-self: center;
    margin: 10px;
  }
`;

export const TextColor = styled.div`
  label {
    width: 100px;
  }
`;

export const BackgroundColor = styled.div`
  input {
    ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL};
    color: ${({ theme }) => theme.COLORS.TITLE_ACVITE};
    width: 80px;
    border: none;
    background: transparent;

    &:focus {
      outline: none;
    }
  }

  svg {
    cursor: pointer;
  }
`;

export const EditForm = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: 240px 352px auto;
  grid-auto-columns: 940px;

  form {
    &:first-child,
    &:nth-child(2) {
      width: 904px;
      width: inherit;
      grid-column: 1/4;
    }
    &:nth-child(3) {
      grid-row: 3/4;
      grid-column: 1/2;
      width: 240px;
    }
    &:nth-child(4) {
      grid-row: 3/4;
      grid-column: 2/3;
      width: 352px;
    }

    label {
      ${({ theme }) => theme.FONTSTYLES.TEXT_XSMALL}
      color: ${({ theme }) => theme.COLORS.LABEL}
    }
  }

  ${TextColor}, ${BackgroundColor} {
    ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'flex-start' })};
    padding: 0px 24px;
    border: none;
    border-radius: 16px;
    background: ${({ theme }) => theme.COLORS.INPUT_BACKGROUND};

    &>label: first-child {
      width: 80px;
      ${({ theme }) => theme.FONTSTYLES.TEXT_XSMALL}
      color: ${({ theme }) => theme.COLORS.LABEL}
    }
  }
`;

export const EditButton = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'center' })};
  grid-column: 6/6;
  grid-row: 3/3;
  justify-self: end;

  button + button {
    margin-left: 8px;
  }
`;
