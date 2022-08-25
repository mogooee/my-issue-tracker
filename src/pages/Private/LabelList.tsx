import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { COLORS } from '@/styles/theme';

import Button from '@/components/Atoms/Button';
import Label from '@/components/Atoms/Label';
import Table from '@/components/Molecules/Table';
import TableItem from '@/components/Molecules/Table/TableItem';
import NavLink from '@/components/Molecules/NavLink';
import Header from '@/components/Organisms/Header';

import { LoginUserInfoState } from '@/stores/loginUserInfo';

import { labelMilestone } from '@/components/Molecules/NavLink/option';
import { labelContents } from '@/components/Molecules/Table/mock';

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

  return (
    <div>
      <Header user={LoginUserInfoStateValue} />
      <SubNav>
        <NavLink navData={labelMilestone(labelNum, milestoneNum)} navLinkStyle="LINE" />
        <Button
          buttonStyle="STANDARD"
          iconInfo={{
            icon: 'Plus',
            fill: '#FEFEFE',
            stroke: '#FEFEFE',
          }}
          label="추가"
          size="SMALL"
        />
      </SubNav>
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
    </div>
  );
};

export default LabelList;
