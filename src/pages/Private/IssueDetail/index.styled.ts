import styled from 'styled-components';
import { TextAreaContainer } from '@/components/Atoms/TextArea/index.styles';
import { Img } from '@/components/Atoms/UserImage/index.styles';
import { Table } from '@/components/Molecules/Table/index.styled';

export const IssueContent = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'flex-start', justify: 'center' })};
  width: 100%;

  @media ${({ theme }) => theme.DEVICE.MOBILE} {
    flex-direction: column;
  }
`;

export const Aside = styled.div`
  button {
    margin: 12px 30px 0px auto;
    color: ${({ theme }) => theme.COLORS.ERROR.RED};
  }

  @media ${({ theme }) => theme.DEVICE.MOBILE} {
    width: 100%;
  }
`;

export const IssueComments = styled.div`
  margin-right: 32px;
  width: 100%;

  & > button {
    margin-top: 16px;
    margin-left: auto;
  }

  @media ${({ theme }) => theme.DEVICE.MOBILE} {
    margin-bottom: 16px;
  }
`;

export const Comment = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'flex-start', justify: 'center' })};

  & + & {
    margin-top: 24px;
  }

  ${Table} {
    max-width: 880px;
    width: 100%;
  }

  ${Img} {
    margin-right: 16px;
  }

  @media ${({ theme }) => theme.DEVICE.MOBILE} {
    img {
      display: none;
    }
  }
`;

export const NewComment = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'flex-start', justify: 'center' })};
  margin-top: 40px;

  ${TextAreaContainer} {
    width: 100%;
  }

  ${Img} {
    margin-right: 16px;
  }

  @media ${({ theme }) => theme.DEVICE.MOBILE} {
    width: 100%;

    img {
      display: none;
    }

    & > div:nth-child(2) {
      width: 100%;
    }
  }
`;
