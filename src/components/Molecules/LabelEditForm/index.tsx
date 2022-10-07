/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import { LabelTypes } from '@/api/issue/types';

import * as S from '@/components/Molecules/LabelEditForm/index.styled';

import Button from '@/components/Atoms/Button';
import Input from '@/components/Atoms/Input';
import Label from '@/components/Atoms/Label';
import Radio from '@/components/Atoms/Radio';
import ColorCode from '@/components/Atoms/ColorCode';

import debounce from '@/utils/debounce';
import useInput from '@/hooks/useInput';
import useFetchLabel from '@/api/label/useFetchLabel';
import { BUTTON_PROPS } from '@/components/Atoms/Button/options';
import { initLabelState, LABEL_EDIT_FORM_PROPS } from '@/components/Molecules/LabelEditForm/constants';

type LabelEditFormTypes = {
  type: 'ADD' | 'EDIT';
  labelProps: LabelTypes;
  setIsEditLabel?: React.Dispatch<React.SetStateAction<boolean>>;
};

const DEBOUNCE_DELAY = 200;

const LabelEditForm = ({ type, labelProps, setIsEditLabel }: LabelEditFormTypes) => {
  const [labelState, setLabelState] = useState<LabelTypes>(labelProps);
  const { title, backgroundColorCode, description, textColor } = labelState;

  const timerId = useRef(0);
  const { addLabel, replaceLabel } = useFetchLabel();
  const { isTyping: IsTitleTyping, onChangeInput: onChangeTitleInput } = useInput();
  const { isTyping: IsDescriptionTyping, onChangeInput: onChangeDescriptionInput } = useInput();

  const formTitle = type === 'ADD' ? '새로운 레이블 추가' : '레이블 편집';

  const resetLabelState = () => {
    setLabelState(initLabelState);
    setIsEditLabel?.(false);
  };

  const handleCompleteButtonClick = () => {
    if (type === 'ADD') {
      addLabel(labelState);
    }

    if (type === 'EDIT') {
      replaceLabel({ id: labelProps.id, replacedLabel: labelState });
    }

    resetLabelState();
  };

  const handleCancelButtonClick = () => {
    resetLabelState();
  };

  const handleTitleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: newTitle } = event.target;

    onChangeTitleInput(event);
    setLabelState((prev) => ({ ...prev, title: newTitle }));
  };

  const handleDescriptionTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: newDescription } = event.target;

    onChangeDescriptionInput(event);
    setLabelState((prev) => ({ ...prev, description: newDescription }));
  };

  const hanldeRadioChange = (text: string) => {
    const newTextColor = text === '어두운 색' ? 'BLACK' : 'WHITE';
    setLabelState((prev) => ({ ...prev, textColor: newTextColor }));
  };

  const hasUniqueLabel: boolean = JSON.stringify(labelProps) !== JSON.stringify(labelState) && !!labelState.title;

  return (
    <S.LabelEditForm>
      <S.Title>{formTitle}</S.Title>
      <S.EditField>
        <Label {...LABEL_EDIT_FORM_PROPS.LABEL({ backgroundColorCode, textColor, title })} />
        <S.EditForm>
          <Input
            {...LABEL_EDIT_FORM_PROPS.LABEL_TITLE({
              inputValue: title,
              onChange: debounce(timerId, handleTitleTyping, DEBOUNCE_DELAY),
              isTyping: IsTitleTyping,
            })}
          />
          <Input
            {...LABEL_EDIT_FORM_PROPS.LABEL_DESCRIPTION({
              inputValue: description,
              onChange: debounce(timerId, handleDescriptionTyping, DEBOUNCE_DELAY),
              isTyping: IsDescriptionTyping,
            })}
          />
          <ColorCode color={labelState.backgroundColorCode} setLabelState={setLabelState} />
          <S.TextColor>
            <label>텍스트 색상</label>
            <Radio {...LABEL_EDIT_FORM_PROPS.TEXT_COLOR({ onChange: hanldeRadioChange, textColor })} />
          </S.TextColor>
        </S.EditForm>
      </S.EditField>
      <S.EditButton>
        {type === 'EDIT' && <Button {...BUTTON_PROPS.CLOSE} handleOnClick={handleCancelButtonClick} />}
        <Button {...BUTTON_PROPS.SAVE} handleOnClick={handleCompleteButtonClick} disabled={!hasUniqueLabel} />
      </S.EditButton>
    </S.LabelEditForm>
  );
};

export default LabelEditForm;
