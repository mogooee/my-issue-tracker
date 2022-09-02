import { useRecoilState, useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { COLORS } from '@/styles/theme';
import * as S from '@/components/Organisms/LabelTable/index.styled';

import Label from '@/components/Atoms/Label';
import Button from '@/components/Atoms/Button';
import Table from '@/components/Molecules/Table';
import TableItem from '@/components/Molecules/Table/TableItem';
import AddLabelField from '@/components/Molecules/AddLabelField';

import { LabelState, LabelTypes } from '@/stores/labelList';

import useLabelFetch from '@/hooks/useLabelFetch';
import Modal, { ModalState } from '@/components/Modal';
import ModalPortal from '@/Portal';
import DeleteCheck from '@/components/Modal/DeleteCheck';

const [HEADER_COLUMNS, ITEM_COLUMNS] = ['120px', '240px auto 240px'];

const LabelTable = () => {
  const { getLabel, replaceLabel } = useLabelFetch();

  const { data: labelContents } = getLabel();

  const labelNum = labelContents!.length;

  const navigate = useNavigate();
  const [labelState, setLabelState] = useRecoilState(LabelState);
  const [isModal, setIsModal] = useRecoilState(ModalState);

  const resetLabelState = useResetRecoilState(LabelState);

  const handleEditButtonClick = (props: LabelTypes) => {
    setLabelState({ type: 'EDIT', label: props });
  };

  const handleCompleteButtonClick = (id: number) => {
    replaceLabel({ id, replacedLabel: labelState.label });
    resetLabelState();
  };

  const handleDeleteButtonClick = (id: number) => {
    setLabelState((prev) => ({ type: 'DELETE', label: { ...prev.label, id } }));
    setIsModal(true);
  };

  const handleCancleButtonClick = () => {
    resetLabelState();
  };

  const handleLabelClick = (title: string) => {
    navigate(`/issues?q=label%3A"${title}"`);
  };

  return (
    <S.LabelTable>
      <Table
        header={<span>{`${labelNum}개의 레이블`}</span>}
        headerTemplateColumns={HEADER_COLUMNS}
        item={labelContents!.map(({ id, title, backgroundColorCode, description, textColor }) => (
          <TableItem key={id}>
            {labelState.type === 'EDIT' && labelState.label.id === id ? (
              <AddLabelField
                type="EDIT"
                onClickCancleButton={handleCancleButtonClick}
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
      <ModalPortal>
        {isModal && (
          <Modal>
            <DeleteCheck id={labelState.label.id} />
          </Modal>
        )}
      </ModalPortal>
    </S.LabelTable>
  );
};

export default LabelTable;
