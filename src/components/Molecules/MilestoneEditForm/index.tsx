import React, { useState } from 'react';

import * as S from '@/components/Molecules/MilestoneEditForm/index.styles';
import Button from '@/components/Atoms/Button';
import EditInput from '@/components/Molecules/MilestoneEditForm/EditInput';
import { EDIT_FORM_INFO } from '@/components/Molecules/MilestoneEditForm/constants';
import { BUTTON_PROPS } from '@/components/Atoms/Button/options';

import useFetchMilestone from '@/api/milestone/useFetchMilestone';
import { RequestMilestoneTypes } from '@/api/milestone';

interface MilestoneEditFormType {
  id?: number;
  editMode: 'ADD' | 'MODIFY';
  milestoneInfo?: RequestMilestoneTypes;
  setOpenState: React.Dispatch<React.SetStateAction<boolean>>;
}

const INIT_FORM_STATE = {
  title: '',
  description: '',
  dueDate: '',
};

const MilestoneEditForm = ({ editMode, milestoneInfo, id, setOpenState }: MilestoneEditFormType) => {
  const { createMilestoneMutate, patchMilestoneDataMutate } = useFetchMilestone();
  const [milestoneForm, setMilestoneForm] = useState<RequestMilestoneTypes>(milestoneInfo || INIT_FORM_STATE);

  const isDisabled = () => {
    if (editMode === 'ADD') {
      return milestoneForm.title === '';
    }

    if (editMode === 'MODIFY') {
      return JSON.stringify(milestoneForm) === JSON.stringify(milestoneInfo) || milestoneForm.title === '';
    }
  };

  const onClickSaveButton = () => {
    if (editMode === 'ADD') {
      createMilestoneMutate(milestoneForm);
      setOpenState((open) => !open);
    }

    if (editMode === 'MODIFY') {
      patchMilestoneDataMutate({ milestoneData: milestoneForm, id: id! });
      setOpenState((open) => !open);
    }
  };

  const onClickCancelButton = () => {
    setMilestoneForm(milestoneInfo!);
    setOpenState((open) => !open);
  };

  return (
    <S.MilestoneEditForm editMode={editMode}>
      <h2>{editMode === 'ADD' ? '새로운 마일스톤 추가' : '마일스톤 편집'}</h2>
      <S.EditForm>
        {EDIT_FORM_INFO.map((info) => (
          <EditInput
            key={info.formKey}
            {...info}
            value={(milestoneInfo && milestoneForm[info.formKey]) || ''}
            state={milestoneForm}
            setState={setMilestoneForm}
          />
        ))}
      </S.EditForm>
      <S.EditButtons>
        {editMode === 'MODIFY' && <Button {...BUTTON_PROPS.CANCEL} handleOnClick={onClickCancelButton} />}
        <Button {...BUTTON_PROPS.SAVE} disabled={isDisabled()} handleOnClick={onClickSaveButton} />
      </S.EditButtons>
    </S.MilestoneEditForm>
  );
};

export default MilestoneEditForm;
