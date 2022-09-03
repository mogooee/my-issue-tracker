import React from 'react';
import TableHeader from '@/components/Molecules/Table/TableHeader';
import * as S from '@/components/Molecules/Table/index.styled';

interface TableTypes {
  header: React.ReactNode;
  item: React.ReactNode;
}

const Table = ({ header, item }: TableTypes) => (
  <S.Table>
    <TableHeader>{header}</TableHeader>
    {item}
  </S.Table>
);
export default Table;
