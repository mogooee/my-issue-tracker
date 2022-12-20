import * as S from '@/components/Skeleton/IssueTable/index.styles';

const SkeletonIssueItem = () => (
  <S.IssueItem>
    <S.IssueCheckbox />
    <div className="skeleton-issue__item">
      <div className="item__title" />
      <div className="item__desc" />
    </div>
    <div className="skeleton-issue__user" />
  </S.IssueItem>
);

const SkeletonIssueTable = () => {
  const IssueItems = Array.from(['item1', 'item2', 'item3', 'items4']).map((key) => (
    <SkeletonIssueItem key={`skeletonItems-${key}`} />
  ));

  return (
    <S.IssueTable>
      <S.IssueHeader>
        <S.IssueCheckbox />
        <div className="skeleton-issue__nav-link" />
        <div className="skeleton-issue__filter" />
      </S.IssueHeader>
      <SkeletonIssueItem />
      {IssueItems}
    </S.IssueTable>
  );
};

export default SkeletonIssueTable;
