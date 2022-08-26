import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import styled from 'styled-components';
import { COLORS } from '@/styles/theme';
import * as StyledAddLabelField from '@/components/Molecules/AddLabelField/index.styled';

import Button from '@/components/Atoms/Button';
import NavLink from '@/components/Molecules/NavLink';
import AddLabelField from '@/components/Molecules/AddLabelField';
import Header from '@/components/Organisms/Header';
import LabelTable from '@/components/Organisms/LabelTable';

import { LoginUserInfoState } from '@/stores/loginUserInfo';
import { LabelContentsTypes, LabelEditState, LabelListState } from '@/stores/labelList';
import { labelMilestone } from '@/components/Molecules/NavLink/option';
import { addNewLabel, getLabelData } from '@/api/labelList';

const SubNav = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

  div {
    overflow: hidden;
  }
`;

const StyledLabelList = styled.div`
  & > ${StyledAddLabelField.AddLabelField} {
    margin-bottom: 24px;
    border: 1px solid ${({ theme }) => theme.COLORS.LINE};
  }
`;

const LabelList = () => {
  const { data: labelData } = useQuery<LabelContentsTypes[]>(['labels'], getLabelData);

  const [labelNum, milestoneNum] = [labelData!.length, 3];

  const queryClient = useQueryClient();
  const LoginUserInfoStateValue = useRecoilValue(LoginUserInfoState);
  const labelListState = useRecoilValue(LabelListState);
  const [labelEditState, setLabelEditState] = useRecoilState(LabelEditState);

  const resetLabelListState = useResetRecoilState(LabelListState);
  const resetLabelEditState = useResetRecoilState(LabelEditState);

  const { mutate: addLabelMutate } = useMutation(addNewLabel, {
    onSuccess: () => {
      queryClient.invalidateQueries(['labels']);
    },
  });

  const initLabelEditState = () => {
    resetLabelEditState();
    resetLabelListState();
  };

  const handleCloseButtonClick = () => {
    initLabelEditState();
  };

  const handleAddButtonClick = () => {
    setLabelEditState({ type: 'ADD' });
    resetLabelListState();
  };

  const handleCompleteButtonClick = () => {
    addLabelMutate(labelListState);
  };

  return (
    <StyledLabelList>
      <Header user={LoginUserInfoStateValue} />
      <SubNav>
        <NavLink navData={labelMilestone(labelNum, milestoneNum)} navLinkStyle="LINE" />
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
      </SubNav>
      {labelEditState.type === 'ADD' && <AddLabelField type="ADD" onClickCompleteButton={handleCompleteButtonClick} />}
      <LabelTable labelContents={labelData!} />
    </StyledLabelList>
  );
};

export default LabelList;
