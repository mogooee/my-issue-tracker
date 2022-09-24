import styled from 'styled-components';
import { LabelEditForm } from '@/components/Molecules/LabelEditForm/index.styled';
import { Table } from '@/components/Molecules/Table/index.styled';

export const LabelTable = styled.div`
  ${LabelEditForm} {
    border: none;
    padding: 0px 64px 0px 0px;
  }

  ${Table} {
    & > div {
      overflow: hidden;
    }
  }
`;
