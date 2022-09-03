import * as S from '@/components/Organisms/ErrorTable/index.styles';
import Button from '@/components/Atoms/Button';
import { Table as StyledErrorTable } from '@/components/Molecules/Table/index.styled';
import { COLORS } from '@/styles/theme';

const ErrorItem = ({ handleOnClick }: { handleOnClick: () => void }) => (
  <S.ErrorItem>
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
  </S.ErrorItem>
);

const ErrorTable = ({
  type,
  resetErrorBoundary,
}: {
  type: 'milestone' | 'label' | 'issue';
  resetErrorBoundary: (...args: Array<unknown>) => void;
}) => (
  <StyledErrorTable>
    <S.ErrorHeader>
      {type === 'milestone' && (
        <S.TableTab>
          <div>열린 마일스톤 (x)</div>
          <div>닫힌 마일스톤 (x)</div>
        </S.TableTab>
      )}
      {type === 'label' && <div>레이블 (x)</div>}
      {type === 'issue' && (
        <S.TableTab>
          <div>열린 이슈 (x)</div>
          <div>닫힌 이슈 (x)</div>
        </S.TableTab>
      )}
    </S.ErrorHeader>
    <ErrorItem handleOnClick={resetErrorBoundary} />
  </StyledErrorTable>
);

export default ErrorTable;
