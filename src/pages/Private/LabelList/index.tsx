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
import { LabelEditState, LabelState } from '@/stores/labelList';
import { labelMilestone } from '@/components/Molecules/NavLink/option';

const LabelList = () => {
  const { addLabel } = useLabelFetch();

  const LoginUserInfoStateValue = useRecoilValue(LoginUserInfoState);
  const labelState = useRecoilValue(LabelState);
  const [labelEditState, setLabelEditState] = useRecoilState(LabelEditState);

  const resetLabelState = useResetRecoilState(LabelState);
  const resetLabelEditState = useResetRecoilState(LabelEditState);

  const initLabelState = () => {
    resetLabelEditState();
    resetLabelState();
  };

  const handleCloseButtonClick = () => {
    initLabelState();
  };

  const handleAddButtonClick = () => {
    setLabelEditState({ type: 'ADD' });
    resetLabelState();
  };

  const handleCompleteButtonClick = () => {
    addLabel(labelState);
    initLabelState();
  };

  return (
    <S.LabelList>
      <Header user={LoginUserInfoStateValue} />
      <S.SubNav>
        <NavLink navData={labelMilestone} navLinkStyle="LINE" />
        {labelEditState.type === 'ADD' ? (
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
        {labelEditState.type === 'ADD' && (
          <AddLabelField type="ADD" onClickCompleteButton={handleCompleteButtonClick} />
        )}
      </S.SubNav>
      <Suspense fallback={<LabelTableSkeleton />}>
        <ErrorBoundary fallback={<div>에러입니다</div>}>
          <LabelTable />
        </ErrorBoundary>
      </Suspense>
    </S.LabelList>
  );
};
export default LabelList;
