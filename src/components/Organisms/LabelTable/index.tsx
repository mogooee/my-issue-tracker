import { useRecoilState, useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { COLORS } from '@/styles/theme';
import * as S from '@/components/Organisms/LabelTable/index.styled';

import Label from '@/components/Atoms/Label';
import Button from '@/components/Atoms/Button';
import Table from '@/components/Molecules/Table';
import TableItem from '@/components/Molecules/Table/TableItem';
import AddLabelField from '@/components/Molecules/AddLabelField';

import { LabelContentsTypes, LabelEditState, LabelListState } from '@/stores/labelList';

import { useNavigate } from 'react-router-dom';

const [HEADER_COLUMNS, ITEM_COLUMNS] = ['120px', '240px auto 240px'];

interface LabelTableTypes {
  labelContents: LabelContentsTypes[];
}

const LabelTable = ({ labelContents }: LabelTableTypes) => {
  const labelNum = labelContents.length;

  const navigate = useNavigate();
  const [labelEditState, setLabelEditState] = useRecoilState(LabelEditState);

  const resetLabelListState = useResetRecoilState(LabelListState);
  const resetLabelEditState = useResetRecoilState(LabelEditState);

  const { mutate: replaceLabelMutate } = useMutation(replaceLabel, {
    onSuccess: () => {
      queryClient.invalidateQueries(['labels']);
    },
  });

  const { mutate: deleteLabelMutate } = useMutation(deleteLabel, {
    onSuccess: () => {
      queryClient.invalidateQueries(['labels']);
    },
  });

  const initLabelEditState = () => {
    resetLabelEditState();
    resetLabelListState();
  };

  const handleEditButtonClick = (props: LabelContentsTypes) => {
    setLabelEditState({ type: 'EDIT' });
    setLabelListState(props);
  };

  const handleCompleteButtonClick = (id: number) => {
    replaceLabelMutate({ id, replacedLabel: labelListState });
  };

  const handleDeleteButtonClick = (id: number) => {

  const handleLabelClick = (title: string) => {
    navigate(`/issues?q=label%3A"${title}"`);
  };

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
                onClickCancleButton={initLabelEditState}
                onClickCompleteButton={() => handleCompleteButtonClick(id)}
              />
            ) : (
              <S.LabelItem templateColumns={ITEM_COLUMNS}>
                <Label
                  title={title}
                  backgroundColor={backgroundColorCode}
                  textColor={textColor}
                  onClick={() => handleLabelClick(title)}
                />
                <S.Description>{description}</S.Description>
                <S.EditButton>
                  <Button
                    buttonStyle="NO_BORDER"
                    iconInfo={{
                      icon: 'Edit',
                      stroke: COLORS.LABEL,
                    }}
                    label="편집"
                    size="SMALL"
                    handleOnClick={() =>
                      handleEditButtonClick({ id, title, backgroundColorCode, description, textColor })
                    }
                  />
                  <Button
                    buttonStyle="NO_BORDER"
                    iconInfo={{
                      icon: 'Trash',
                      stroke: COLORS.ERROR.RED,
                    }}
                    label="삭제"
                    size="SMALL"
                    handleOnClick={() => handleDeleteButtonClick(id)}
                  />
                </S.EditButton>
              </S.LabelItem>
            )}
          </TableItem>
        ))}
      />
    </S.LabelTable>
  );
};

export default LabelTable;
