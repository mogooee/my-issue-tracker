import { useRecoilState } from 'recoil';

import styled from 'styled-components';
import { COLORS } from '@/styles/theme';
import * as S from '@/components/Organisms/LabelTable/index.styled';

import Label from '@/components/Atoms/Label';
import Button from '@/components/Atoms/Button';
import Table from '@/components/Molecules/Table';
import TableItem from '@/components/Molecules/Table/TableItem';
import AddLabelField from '@/components/Molecules/AddLabelField';

import { initLabelListState, LabelContentsTypes, LabelEditState, LabelListState } from '@/stores/labelList';

const LabelItem = styled.div<{ templateColumns: string }>`
  display: grid;
  grid-template-columns: ${({ templateColumns }) => templateColumns};
  align-items: center;
  padding: 36px 32px;
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

const [HEADER_COLUMNS, ITEM_COLUMNS] = ['120px', '240px auto 240px'];

interface LabelTableTypes {
  labelContents: LabelContentsTypes[];
}

const LabelTable = ({ labelContents }: LabelTableTypes) => {
  const [labelListState, setLabelListState] = useRecoilState(LabelListState);
  const [labelEditState, setLabelEditState] = useRecoilState(LabelEditState);
  const labelNum = labelContents.length;

  return (
    <S.LabelTable>
      <Table
        header={<span>{`${labelNum}개의 레이블`}</span>}
        headerTemplateColumns={HEADER_COLUMNS}
        item={labelContents.map(({ id, title, backgroundColorCode, description, textColor }) => (
          <TableItem key={id}>
            {labelEditState.type === 'EDIT' && labelListState.id === id ? (
              <AddLabelField
                type="EDIT"
                onClickCancleButton={() => {
                  setLabelEditState({ type: null });
                  setLabelListState(initLabelListState);
                }}
                onClickCompleteButton={async () => setLabelListState(initLabelListState)}
              />
            ) : (
              <LabelItem templateColumns={ITEM_COLUMNS}>
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
                    handleOnClick={() => {
                      setLabelEditState({ type: 'EDIT' });
                      setLabelListState({
                        id,
                        title,
                        backgroundColorCode: backgroundColorCode.toUpperCase(),
                        description,
                        textColor,
                      });
                    }}
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
              </LabelItem>
            )}
          </TableItem>
        ))}
      />
    </S.LabelTable>
  );
};

export default LabelTable;
