import Button from '@/components/Atoms/Button';
import Label from '@/components/Atoms/Label';
import * as S from '@/components/Organisms/LabelTable/LabelItem/index.styled';
import { COLORS } from '@/styles/theme';
import { LabelState } from '@/stores/label';
import { LabelTypes } from '@/api/issue/types';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { ModalState } from '@/components/Modal';

import { TABLE_ITEM_BUTTON_INFO } from '@/components/Atoms/Button/options';

const LabelItem = ({ id, title, backgroundColorCode, description, textColor }: LabelTypes) => {
  const navigate = useNavigate();
  const setLabelState = useSetRecoilState(LabelState);
  const setIsModal = useSetRecoilState(ModalState);

  const handleEditButtonClick = (props: LabelTypes) => {
    setLabelState({ type: 'EDIT', label: props });
  };
  const handleDeleteButtonClick = (deletedLabelId: number) => {
    setLabelState((prev) => ({ type: 'DELETE', label: { ...prev.label, id: deletedLabelId } }));
    setIsModal(true);
  };
  const handleLabelClick = (filterdLabelTitle: string) => {
    navigate(`/issues?q=label%3A"${filterdLabelTitle}"`);
  };

  return (
    <S.LabelItem>
      <Label
        title={title}
        backgroundColorCode={backgroundColorCode}
        textColor={textColor}
        onClick={() => handleLabelClick(title)}
      />
      <S.Description>{description}</S.Description>
      <S.EditButton>
        <Button
          {...TABLE_ITEM_BUTTON_INFO.MODIFY}
          handleOnClick={() => handleEditButtonClick({ id, title, backgroundColorCode, description, textColor })}
        />
        <Button {...TABLE_ITEM_BUTTON_INFO.DELETE} handleOnClick={() => handleDeleteButtonClick(id)} />
      </S.EditButton>
    </S.LabelItem>
  );
};

export default LabelItem;
