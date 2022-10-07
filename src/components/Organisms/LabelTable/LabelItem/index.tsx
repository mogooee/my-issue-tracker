import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import * as S from '@/components/Organisms/LabelTable/LabelItem/index.styled';

import Button from '@/components/Atoms/Button';
import Label from '@/components/Atoms/Label';
import LabelEditForm from '@/components/Molecules/LabelEditForm';
import { ModalState } from '@/components/Modal';

import { LabelTypes } from '@/api/issue/types';
import { TABLE_ITEM_BUTTON_INFO } from '@/components/Atoms/Button/options';

type LabelItemTypes = LabelTypes & { setDeleteLabelId: React.Dispatch<React.SetStateAction<number>> };

const LabelItem = ({ setDeleteLabelId, ...labelProps }: LabelItemTypes) => {
  const { id, title, backgroundColorCode, description, textColor } = labelProps;

  const navigate = useNavigate();
  const setIsModal = useSetRecoilState<boolean>(ModalState);
  const [isEditLabel, setIsEditLabel] = useState<boolean>(false);

  const handleEditButtonClick = () => {
    setIsEditLabel(true);
  };

  const handleDeleteButtonClick = (deletedLabelId: number) => {
    setIsModal(true);
    setDeleteLabelId(deletedLabelId);
  };
  const handleLabelClick = (filterdLabelTitle: string) => {
    navigate(`/issues?q=label%3A"${filterdLabelTitle}"`);
  };

  return isEditLabel ? (
    <LabelEditForm type="EDIT" labelProps={labelProps} setIsEditLabel={setIsEditLabel} />
  ) : (
    <S.LabelItem>
      <Label
        title={title}
        backgroundColorCode={backgroundColorCode}
        textColor={textColor}
        onClick={() => handleLabelClick(title)}
      />
      <S.Description>{description}</S.Description>
      <S.EditButton>
        <Button {...TABLE_ITEM_BUTTON_INFO.MODIFY} handleOnClick={handleEditButtonClick} />
        <Button {...TABLE_ITEM_BUTTON_INFO.DELETE} handleOnClick={() => handleDeleteButtonClick(id)} />
      </S.EditButton>
    </S.LabelItem>
  );
};

export default LabelItem;
