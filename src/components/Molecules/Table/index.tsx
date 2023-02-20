/* eslint-disable react/no-array-index-key */
import React from 'react';
import TableHeader from '@/components/Molecules/Table/TableHeader';
import * as S from '@/components/Molecules/Table/index.styles';
import TableItem from '@/components/Molecules/Table/TableItem';

interface TableTypes {
  header: React.ReactNode;
  item: React.ReactNode[];
}

const Table = ({ header, item }: TableTypes) => (
  <S.Table>
    <TableHeader>{header}</TableHeader>
    <ul>
      {item.map((e, i) => (
        <TableItem key={i}>{e}</TableItem>
      ))}
    </ul>
  </S.Table>
);
export default Table;
