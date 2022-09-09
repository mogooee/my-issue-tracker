import styled from 'styled-components';
import { TextAreaContainer } from '@/components/Atoms/TextArea/index.styles';
import { Img } from '@/components/Atoms/UserImage/index.styles';
import { Table } from '@/components/Molecules/Table/index.styled';

export const IssueContent = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'flex-start', justify: 'center' })};
`;

export const Aside = styled.div`
  button {
    margin: 12px 30px 0px auto;
    color: ${({ theme }) => theme.COLORS.ERROR.RED};
  }
`;

export const IssueComments = styled.div`
  margin-right: 32px;

  & > button {
    margin-top: 16px;
    margin-left: auto;
  }
`;

export const Comment = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'flex-start', justify: 'center' })};

  & + & {
    margin-top: 24px;
  }

  ${Table} {
    width: 880px;
  }

  ${Img} {
    margin-right: 16px;
  }
`;

export const NewComment = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'flex-start', justify: 'center' })};
  margin-top: 40px;

  ${TextAreaContainer} {
    width: 880px;
  }

  ${Img} {
    margin-right: 16px;
  }
`;
