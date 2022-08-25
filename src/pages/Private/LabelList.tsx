import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/styles/theme';

import Button from '@/components/Atoms/Button';
import Label from '@/components/Atoms/Label';
import Table from '@/components/Molecules/Table';
import TableItem from '@/components/Molecules/Table/TableItem';
import NavLink from '@/components/Molecules/NavLink';
import Header from '@/components/Organisms/Header';
import AddLabelField from '@/components/Molecules/AddLabelField';

import { LoginUserInfoState } from '@/stores/loginUserInfo';

import { labelMilestone } from '@/components/Molecules/NavLink/option';
import { labelContents } from '@/components/Molecules/Table/mock';

import * as StyledAddLabelFeild from '@/components/Molecules/AddLabelField/index.styled';

const SubNav = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

  div {
    overflow: hidden;
  }
`;

export const Description = styled.span`
  width: 800px;
`;

export const EditButton = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'center' })};

  button {
    &:first-child {
      color: ${({ theme }) => theme.COLORS.LABEL};
    }
    &:nth-child(2) {
      color: ${({ theme }) => theme.COLORS.ERROR.RED};
    }
  }

  button + button {
    margin-left: 24px;
  }
`;

const LabelItem = styled.div<{ templateColumns: string }>`
  display: grid;
  grid-template-columns: ${({ templateColumns }) => templateColumns};
  align-items: center;
  padding: 36px 32px;
`;

const StyledLabelList = styled.div<{ isAddButtonClicked: boolean; editLabelId: number | null }>`
  & > ${StyledAddLabelFeild.AddLabelField} {
    ${({ isAddButtonClicked }) => isAddButtonClicked && 'margin-bottom: 24px;'}
    border:1px solid ${({ theme }) => theme.COLORS.LINE};
  }
`;

export interface LabelContentsTypes {
  id: number;
  title: string;
  backgroundColorCode: string;
  description: string;
  textColor: 'WHITE' | 'BLACK';
}

const [HEADER_COLUMNS, ITEM_COLUMNS] = ['120px', '240px auto 240px'];

const LabelList = () => {
  const LoginUserInfoStateValue = useRecoilValue(LoginUserInfoState);
  const [labelNum, milestoneNum] = [labelContents.length, 3];
  const [isAddButtonClicked, setIsAddButtonClicked] = useState<boolean>(false);

  return (
    <StyledLabelList isAddButtonClicked={isAddButtonClicked} editLabelId={editLabelId}>
      <Header user={LoginUserInfoStateValue} />
      <SubNav>
        <NavLink navData={labelMilestone(labelNum, milestoneNum)} navLinkStyle="LINE" />
        {isAddButtonClicked ? (
          <Button
            buttonStyle="SECONDARY"
            iconInfo={{
              icon: 'XSquare',
              stroke: COLORS.LABEL,
            }}
            label="닫기"
            size="SMALL"
            handleOnClick={() => setIsAddButtonClicked(false)}
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
            handleOnClick={() => setIsAddButtonClicked(true)}
        />
        )}
      </SubNav>
      {isAddButtonClicked && <AddLabelField type="NEW" />}
      <Table
        header={<span>{`${labelNum}개의 레이블`}</span>}
        headerTemplateColumns={HEADER_COLUMNS}
        item={labelContents.map(({ id, title, backgroundColorCode, description, textColor }) => (
          <TableItem key={id} templateColumns={ITEM_COLUMNS}>
            <Label title={title} backgroundColor={backgroundColorCode} textColor={textColor} />
            <Description>{description}</Description>
            <EditButton>
              <Button
                buttonStyle="NO_BORDER"
                iconInfo={{
                  icon: 'Edit',
                  stroke: COLORS.LABEL,
                }}
                label="편집"
                size="SMALL"
              />
              <Button
                buttonStyle="NO_BORDER"
                iconInfo={{
                  icon: 'Trash',
                  stroke: COLORS.ERROR.RED,
                }}
                label="삭제"
                size="SMALL"
              />
            </EditButton>
          </TableItem>
        ))}
      />
    </StyledLabelList>
  );
};

export default LabelList;
