/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';

import { COLORS } from '@/styles/theme';

import Button from '@/components/Atoms/Button';
import Input from '@/components/Atoms/Input';
import Label from '@/components/Atoms/Label';
import Radio from '@/components/Atoms/Radio';
import ColorCode from '@/components/Atoms/ColorCode';

import { LabelState } from '@/stores/label';

import useInput from '@/hooks/useInput';
import debounce from '@/utils/debounce';
import * as S from '@/components/Molecules/LabelEditForm/index.styled';
import { BUTTON_PROPS } from '@/components/Atoms/Button/options';

interface LabelAddFormTypes {
  type: 'ADD' | 'EDIT';
  onClickCancleButton?: () => void;
  onClickCompleteButton?: () => void;
}

const [MAX_TITLE_LENTH, MAX_DESCRIPTION_LENGTH] = [30, 100];
const DEBOUNCE_DELAY = 200;

const LabelEditForm = ({ type, onClickCancleButton, onClickCompleteButton }: LabelAddFormTypes) => {
  const timerId = useRef(0);
  const { isTyping: IsTitleTyping, onChangeInput: onChangeTitleInput } = useInput();
  const { isTyping: IsDescriptionTyping, onChangeInput: onChangeDescriptionInput } = useInput();

  const [labelState, setLabelState] = useRecoilState(LabelState);
  const { title, backgroundColorCode, description, textColor } = labelState.label;

  const formTitle = type === 'ADD' ? '새로운 레이블 추가' : '레이블 편집';

  const handleTitleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChangeTitleInput(event);
    setLabelState((prev) => ({ ...prev, label: { ...prev.label, title: value } }));
  };

  const handleDescriptionTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    onChangeDescriptionInput(event);
    setLabelState((prev) => ({ ...prev, label: { ...prev.label, description: value } }));
  };

  const hanldeRadioChange = (text: string) => {
    const newTextColor = text === '어두운 색' ? 'BLACK' : 'WHITE';
    setLabelState((prev) => ({ ...prev, label: { ...prev.label, textColor: newTextColor } }));
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
          <ColorCode />
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
        {type === 'EDIT' && <Button {...BUTTON_PROPS.CLOSE} />}
        <Button {...BUTTON_PROPS.SAVE} handleOnClick={onClickCompleteButton} disabled={!isCompleteButtonActivated} />
      </S.EditButton>
    </S.LabelEditForm>
  );
};

export default LabelEditForm;
