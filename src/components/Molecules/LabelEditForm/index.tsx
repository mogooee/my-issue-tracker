/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import { LabelTypes } from '@/api/issue/types';

import { COLORS } from '@/styles/theme';
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
import { initLabelState } from '@/components/Molecules/LabelEditForm/constants';

type LabelEditFormTypes = {
  type: 'ADD' | 'EDIT';
  labelProps: LabelTypes;
  setIsEditLabel?: React.Dispatch<React.SetStateAction<boolean>>;
};

const [MAX_TITLE_LENTH, MAX_DESCRIPTION_LENGTH] = [30, 100];
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

  const isCompleteButtonActivated = labelState.label.title;

  return (
    <S.LabelEditForm>
      <S.Title>{formTitle}</S.Title>
      <S.EditField>
        <Label
          backgroundColorCode={`${backgroundColorCode || COLORS.INPUT_BACKGROUND}`}
          textColor={textColor}
          title={title || '레이블'}
        />
        <S.EditForm>
          <Input
            inputMaxLength={MAX_TITLE_LENTH}
            inputPlaceholder="레이블 이름"
            inputSize="SMALL"
            inputType="text"
            inputValue={title}
            onChange={debounce(timerId, handleTitleTyping, DEBOUNCE_DELAY)}
            isTyping={IsTitleTyping}
          />
          <Input
            inputMaxLength={MAX_DESCRIPTION_LENGTH}
            inputPlaceholder="설명(선택)"
            inputSize="SMALL"
            inputType="text"
            inputValue={description}
            onChange={debounce(timerId, handleDescriptionTyping, DEBOUNCE_DELAY)}
            isTyping={IsDescriptionTyping}
          />
          <ColorCode color={labelState.backgroundColorCode} setLabelState={setLabelState} />
          <S.TextColor>
            <label>텍스트 색상</label>
            <Radio
              radioData={{
                title: '텍스트 색상',
                option: [
                  { id: 1, title: '어두운 색', isChecked: textColor === 'BLACK' },
                  { id: 2, title: '밝은 색', isChecked: textColor === 'WHITE' },
                ],
              }}
              onChange={hanldeRadioChange}
            />
          </S.TextColor>
        </S.EditForm>
      </S.EditField>
      <S.EditButton>
        {type === 'EDIT' && <Button {...BUTTON_PROPS.CLOSE} handleOnClick={handleCancelButtonClick} />}
        <Button {...BUTTON_PROPS.SAVE} handleOnClick={handleCompleteButtonClick} />
      </S.EditButton>
    </S.LabelEditForm>
  );
};

export default LabelEditForm;
