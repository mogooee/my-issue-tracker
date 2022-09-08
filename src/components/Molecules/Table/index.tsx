/* eslint-disable react/no-array-index-key */
import React from 'react';
import TableHeader from '@/components/Molecules/Table/TableHeader';
import * as S from '@/components/Molecules/Table/index.styled';
import TableItem from '@/components/Molecules/Table/TableItem';

interface TableTypes {
  header: React.ReactNode;
  item: React.ReactNode[];
}

const Table = ({ header, item }: TableTypes) => (
  <S.Table>
    <TableHeader>{header}</TableHeader>
    {item.map((e, i) => (
      <TableItem key={i}>{e}</TableItem>
    ))}
  </S.Table>
);
export default Table;
