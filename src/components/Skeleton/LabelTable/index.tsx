import * as S from '@/components/Skeleton/LabelTable/index.styled';

const LABEL_COUNT = 4;

const LabelTableSkeleton = () => {
  const mapping = new Array(LABEL_COUNT).fill(true);

  return (
    <S.LabelTable>
      <S.LabelTableHeader>
        <S.LabelTableTitle />
      </S.LabelTableHeader>
      <S.LabelTableItem key={e}>
      </S.LabelTableItem>

export default LabelTableSkeleton;
