import * as S from '@/components/Organisms/MilestoneTable/Error/index.styles';
import Button from '@/components/Atoms/Button';
import { StyledIssueTable as StyledErrorMilestoneTable } from '@/components/Organisms/IssueTable/index.styles';
import { COLORS } from '@/styles/theme';

const ErrorMilestoneItem = ({ handleOnClick }: { handleOnClick: () => void }) => (
  <S.ErrordMilestoneItem>
    <span>앗! 데이터를 불러오는데 실패했어요...</span>
    <Button
      buttonStyle="STANDARD"
      iconInfo={{
        icon: 'RefreshCcw',
        stroke: COLORS.OFF_WHITE,
      }}
      label="다시 시도"
      size="SMALL"
      handleOnClick={handleOnClick}
    />
  </S.ErrordMilestoneItem>
);

const ErrorMilestoneTable = ({ resetErrorBoundary }: { resetErrorBoundary: (...args: Array<unknown>) => void }) => (
  <StyledErrorMilestoneTable>
    <S.ErrorMilestoneHeader>
      <div>열린 마일스톤 (x)</div>
      <div>닫힌 마일스톤 (x)</div>
    </S.ErrorMilestoneHeader>
    <ErrorMilestoneItem handleOnClick={resetErrorBoundary} />
  </StyledErrorMilestoneTable>
);

export default ErrorMilestoneTable;
