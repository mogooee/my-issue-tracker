import { RadioList } from '@/components/Atoms/Radio/index.styled';
import styled from 'styled-components';

export const LabelEditForm = styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: auto 1fr;
  border-radius: 8px;
  background: ${({ theme }) => theme.COLORS.OFF_WHITE};
  padding: 32px;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.FONTSTYLES.TEXT_LARGE}
`;

export const EditField = styled.div`
  display: grid;
  place-items: center;

  & > div:first-child {
    justify-self: center;
    margin: 10px;
  }

  @media ${({ theme }) => theme.DEVICE.DESKTOP} {
    grid-template-columns: 1fr 2fr;
  }

  @media ${({ theme }) => theme.DEVICE.MOBILE_OR_TABLET} {
    grid-template-rows: 0.5fr 2fr;
    gap: 24px;
  }
`;

export const TextColor = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'flex-start' })};
  flex-wrap: wrap;
  padding: 0px 24px;
  border: none;
  border-radius: 16px;
  background: ${({ theme }) => theme.COLORS.INPUT_BACKGROUND};

  label {
    width: 100px;
  }

  label: first-child {
    width: 80px;
    ${({ theme }) => theme.FONTSTYLES.TEXT_XSMALL}
    color: ${({ theme }) => theme.COLORS.LABEL}
  }

  ${RadioList} {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const EditForm = styled.div`
  display: grid;
  grid-gap: 16px;
  width: 100%;

  form {
    width: inherit;
    height: inherit;

    label {
      ${({ theme }) => theme.FONTSTYLES.TEXT_XSMALL}
      color: ${({ theme }) => theme.COLORS.LABEL}
    }
  }

  @media all and (min-width: ${({ theme }) => `${theme.DEVICE_SIZE.TABLET}px`}) {
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: 266px max-content;

    form:first-child,
    form:nth-child(2) {
      grid-column: 1 / 4;
    }
  }

  @media all and (max-width: ${({ theme }) => `${theme.DEVICE_SIZE.TABLET - 1}px`}) {
    grid-template-rows: repeat(4, 1fr);
  }
`;

export const EditButton = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'center' })};
  flex-wrap: wrap;
  justify-self: end;
  gap: 8px;
`;
