import React from 'react';
import TableHeader from '@/components/Molecules/Table/TableHeader';
import * as S from '@/components/Molecules/Table/index.styled';

interface TableTypes {
  header: React.ReactNode;
  headerTemplateColumns: string;
  item: React.ReactNode;
}

const DEFAULT_HEADER_COLUMNS = '240px';

const Table = ({ header, headerTemplateColumns = DEFAULT_HEADER_COLUMNS, item }: TableTypes) => (
  <S.Table>
    <TableHeader templateColumns={headerTemplateColumns}>{header}</TableHeader>
    {item}
  </S.Table>
);
export default Table;
