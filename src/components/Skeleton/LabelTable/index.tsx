import * as S from '@/components/Skeleton/LabelTable/index.styled';

const LABEL_COUNT = 4;

const LabelTableSkeleton = () => {
  const mapping = new Array(LABEL_COUNT).fill(true);

  return (
    <S.LabelTable>
      <S.LabelTableHeader>
        <S.LabelTableTitle />
      </S.LabelTableHeader>
      {mapping.map((e, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <S.LabelItem key={i}>
          <S.Label />
          <S.Description />
          <S.ButtonTabs>
            <S.EditButton />
            <S.DelteButton />
          </S.ButtonTabs>
        </S.LabelItem>
      ))}
    </S.LabelTable>
  );
};

export default LabelTableSkeleton;
