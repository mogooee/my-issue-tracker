import * as S from '@/components/Skeleton/MilestoneTable/index.styles';

const SkeletonMilestoneItem = (): JSX.Element => (
  <S.SkeletonMilestoneItem>
    <S.SkeletonMilestoneItemInfo>
      <div className="skeleton_milestone__item" />
      <div className="skeleton_milestone__desc" />
    </S.SkeletonMilestoneItemInfo>
    <S.SkeletonMilestoneItemStates>
      <div className="skeleton_milestone__buttons" />
      <div className="skeleton_milestone__progress" />
    </S.SkeletonMilestoneItemStates>
  </S.SkeletonMilestoneItem>
);

const SkeletonMilestoneTable = () => {
  const MilestoneItems = Array.from(['item1', 'item2', 'item3', 'items4']).map((key) => (
    <SkeletonMilestoneItem key={`skeletonItems-${key}`} />
  ));

  return (
    <S.MilestoneTable>
      <S.MilestoneHeader>
        <S.SkeletonNavLink />
      </S.MilestoneHeader>
      {MilestoneItems}
    </S.MilestoneTable>
  );
};

export default SkeletonMilestoneTable;
