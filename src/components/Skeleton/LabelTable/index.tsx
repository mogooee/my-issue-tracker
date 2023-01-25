import * as S from '@/components/Skeleton/LabelTable/index.styled';

const LABEL_COUNT = 4;
const skeletonLabelItems = Array.from({ length: LABEL_COUNT }, (_, i) => `skeleton-label-item-${i + 1}`);

const LabelTableSkeleton = () => (
  <S.LabelTable>
    <S.LabelTableHeader>
      <S.SkeletonDiv className="label-num" />
    </S.LabelTableHeader>
    {skeletonLabelItems.map((e) => (
      <S.LabelTableItem key={e}>
        <S.SkeletonLabelItem>
          <S.SkeletonDiv className="label-icon" />
          <S.SkeletonDiv className="label-description" />
          <S.SkeletonDiv className="label-button-tabs" />
        </S.SkeletonLabelItem>
      </S.LabelTableItem>
    ))}
  </S.LabelTable>
);

export default LabelTableSkeleton;
