/* eslint-disable jsx-a11y/label-has-associated-control */
import Button from '@/components/Atoms/Button';
import Icon from '@/components/Atoms/Icon';
import Input from '@/components/Atoms/Input';
import Label from '@/components/Atoms/Label';
import Radio from '@/components/Atoms/Radio';

import useInput from '@/hooks/useInput';

import { COLORS } from '@/styles/theme';
import * as S from '@/components/Molecules/AddLabelField/index.styled';

interface LabelAddFormTypes {
  type: 'NEW' | 'EDIT';
  title?: string;
  description?: string;
  textColor?: 'WHITE' | 'BLACK';
  backgroundColor?: string;
  onClickCancleButton?: () => void;
  onClickCompleteButton?: () => void;
}

const [MAX_TITLE_LENTH, MAX_DESCRIPTION_LENGTH, MAX_COLORCODE_LENGTH] = [30, 100, 7];

const AddLabelField = ({
  type,
  title,
  description,
  backgroundColor,
  textColor,
  onClickCancleButton,
  onClickCompleteButton,
}: LabelAddFormTypes) => {
  const formTitle = type === 'NEW' ? '새로운 레이블 추가' : '레이블 편집';
  const { isTyping: IsTitleTyping, onChangeInput: onChangeTitleInput } = useInput();
  const { isTyping: IsDescriptionTyping, onChangeInput: onChangeDescriptionInput } = useInput();

  return (
    <S.AddLabelField>
      <S.Title>{formTitle}</S.Title>
      <S.EditField>
        <Label
          backgroundColor={`${backgroundColor || COLORS.INPUT_BACKGROUND}`}
          textColor={`${textColor || 'BLACK'}`}
          title={`${title || '레이블'}`}
        />
        <S.EditForm>
          <Input
            inputMaxLength={MAX_TITLE_LENTH}
            inputPlaceholder="레이블 이름"
            inputSize="SMALL"
            inputType="text"
            inputValue={title}
            onChange={onChangeTitleInput}
            isTyping={IsTitleTyping}
          />
          <Input
            inputMaxLength={MAX_DESCRIPTION_LENGTH}
            inputPlaceholder="설명(선택)"
            inputSize="SMALL"
            inputType="text"
            inputValue={description}
            onChange={onChangeDescriptionInput}
            isTyping={IsDescriptionTyping}
          />
          <S.BackgroundColor>
            <label>배경 색상</label>
            <input type="text" defaultValue={`${backgroundColor || '#EFF0F6'}`} maxLength={MAX_COLORCODE_LENGTH} />
            <Icon icon="RefreshCcw" stroke="#14142B" />
          </S.BackgroundColor>
          <S.TextColor>
            <label>텍스트 색상</label>
            <Radio
              radioData={{
                title: '텍스트 색상',
                option: [
                  { id: 1, title: '어두운 색', isChecked: !textColor || textColor === 'BLACK' },
                  { id: 2, title: '밝은 색', isChecked: textColor === 'WHITE' },
                ],
              }}
            />
          </S.TextColor>
        </S.EditForm>
      </S.EditField>
      <S.EditButton>
        {type === 'EDIT' && (
          <Button
            buttonStyle="SECONDARY"
            iconInfo={{
              icon: 'XSquare',
              stroke: COLORS.LABEL,
            }}
            label="취소"
            size="SMALL"
            handleOnClick={onClickCancleButton}
          />
        )}
        <Button
          buttonStyle="STANDARD"
          iconInfo={{
            icon: `${type === 'EDIT' ? 'Edit' : 'Plus'}`,
            fill: `${type === 'EDIT' ? 'none' : '#FEFEFE'}`,
            stroke: '#FEFEFE',
          }}
          label="완료"
          size="SMALL"
          handleOnClick={onClickCompleteButton}
        />
      </S.EditButton>
    </S.AddLabelField>
  );
};

export default AddLabelField;
