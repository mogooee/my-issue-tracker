import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import * as S from '@/components/Organisms/LabelTable/LabelItem/index.styles';

import Button from '@/components/Atoms/Button';
import Label from '@/components/Atoms/Label';
import LabelEditForm from '@/components/Molecules/LabelEditForm';
import { LABEL_BTNS_ARGS } from '@/components/Molecules/Dropdown/mock';
import Dropdown from '@/components/Molecules/Dropdown';
import { ModalState } from '@/stores/modal';

import { LabelTypes } from '@/api/issue/types';
import { TABLE_ITEM_BUTTON_INFO } from '@/components/Atoms/Button/options';
import useFilter from '@/hooks/useFilter';

type LabelItemTypes = LabelTypes & { setDeleteLabelId: React.Dispatch<React.SetStateAction<number>> };

const LabelItem = ({ setDeleteLabelId, ...labelProps }: LabelItemTypes) => {
  const { id, title, backgroundColorCode, description, textColor } = labelProps;

  const setIsModal = useSetRecoilState<boolean>(ModalState);
  const [isEditLabel, setIsEditLabel] = useState<boolean>(false);
  const { changeNotEngFilter } = useFilter();

  const handleEditButtonClick = () => {
    setIsEditLabel(true);
  };

  const handleDeleteButtonClick = (deletedLabelId: number) => {
    setIsModal(true);
    setDeleteLabelId(deletedLabelId);
  };

  const clickHandler = {
    editButton: handleEditButtonClick,
    deleteButton: () => handleDeleteButtonClick(id),
  };

  return isEditLabel ? (
    <LabelEditForm id={id} type="EDIT" labelProps={labelProps} setIsEditLabel={setIsEditLabel} />
  ) : (
    <S.LabelItem>
      <Link to={`/issues?page=0&q=label%3A${changeNotEngFilter(title)}`}>
        <Label title={title} backgroundColorCode={backgroundColorCode} textColor={textColor} />
      </Link>
      <span className="label-description">{description}</span>
      <Dropdown {...LABEL_BTNS_ARGS(clickHandler)} />
      <S.EditButton>
        <Button {...TABLE_ITEM_BUTTON_INFO.MODIFY} handleOnClick={handleEditButtonClick} />
        <Button {...TABLE_ITEM_BUTTON_INFO.DELETE} handleOnClick={() => handleDeleteButtonClick(id)} />
      </S.EditButton>
    </S.LabelItem>
  );
};

export default LabelItem;
