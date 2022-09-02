import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import useLabelFetch from '@/hooks/useLabelFetch';

import * as S from '@/pages/Private/LabelList/index.styled';
import { COLORS } from '@/styles/theme';

import Button from '@/components/Atoms/Button';
import AddLabelField from '@/components/Molecules/AddLabelField';
import NavLink from '@/components/Molecules/NavLink';
import Header from '@/components/Organisms/Header';
import LabelTable from '@/components/Organisms/LabelTable';
import LabelTableSkeleton from '@/components/Skeleton/LabelTable';

import { LoginUserInfoState } from '@/stores/loginUserInfo';
import { LabelState } from '@/stores/labelList';
import { labelMilestone } from '@/components/Molecules/NavLink/option';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

const LabelTableFallback = ({ error, resetErrorBoundary }: any) => (
  <div>
    <p> 에러: {error.message}</p>
    <Button
      buttonStyle="SECONDARY"
      iconInfo={{
        icon: 'RefreshCcw',
        stroke: COLORS.LABEL,
      }}
      label="다시 시도"
      size="SMALL"
      handleOnClick={() => resetErrorBoundary()}
    />
  </div>
);

const LabelList = () => {
  const { addLabel } = useLabelFetch();

  const LoginUserInfoStateValue = useRecoilValue(LoginUserInfoState);
  const [labelState, setLabelState] = useRecoilState(LabelState);

  const resetLabelState = useResetRecoilState(LabelState);

  const handleCloseButtonClick = () => {
    resetLabelState();
  };

  const handleAddButtonClick = () => {
    resetLabelState();
    setLabelState((prev) => ({ ...prev, type: 'ADD' }));
  };

  const handleCompleteButtonClick = () => {
    addLabel(labelState.label);
    resetLabelState();
  };

  const { reset } = useQueryErrorResetBoundary();

  return (
    <S.LabelList>
      <Header user={LoginUserInfoStateValue} />
      <S.SubNav>
        <NavLink navData={labelMilestone} navLinkStyle="LINE" />
        {labelState.type === 'ADD' ? (
          <Button
            buttonStyle="SECONDARY"
            iconInfo={{
              icon: 'XSquare',
              stroke: COLORS.LABEL,
            }}
            label="닫기"
            size="SMALL"
            handleOnClick={handleCloseButtonClick}
          />
        ) : (
          <Button
            buttonStyle="STANDARD"
            iconInfo={{
              icon: 'Plus',
              fill: '#FEFEFE',
              stroke: '#FEFEFE',
            }}
            label="추가"
            size="SMALL"
            handleOnClick={handleAddButtonClick}
          />
        )}
      </S.SubNav>
      {labelState.type === 'ADD' && <AddLabelField type="ADD" onClickCompleteButton={handleCompleteButtonClick} />}
      <ErrorBoundary onReset={reset} FallbackComponent={LabelTableFallback}>
        <Suspense fallback={<LabelTableSkeleton />}>
          <LabelTable />
        </Suspense>
      </ErrorBoundary>
    </S.LabelList>
  );
};
export default LabelList;
