import { LabelTypes } from '@/api/issue/types';
import { InputTypes } from '@/components/Atoms/Input';
import { LabelType } from '@/components/Atoms/Label';
import { RadioTypes } from '@/components/Atoms/Radio';
import { COLORS } from '@/styles/theme';

export const initLabelState: LabelTypes = {
  id: 0,
  title: '',
  backgroundColorCode: COLORS.INPUT_BACKGROUND,
  description: '',
  textColor: 'BLACK',
};

const [MAX_TITLE_LENTH, MAX_DESCRIPTION_LENGTH] = [30, 100];

type LabelPropsType = Pick<LabelTypes, 'backgroundColorCode' | 'textColor' | 'title'>;
type LabelInputPropsType = Pick<InputTypes, 'inputValue' | 'onChange' | 'isTyping'>;
type TextColorType = Pick<RadioTypes, 'onChange'> & { textColor: string } & { id: number };

interface LABEL_EDIT_FORM_PROPS_Types {
  LABEL: ({ ...props }: LabelPropsType) => LabelType;
  LABEL_TITLE: ({ ...props }: LabelInputPropsType) => InputTypes;
  LABEL_DESCRIPTION: ({ ...props }: LabelInputPropsType) => InputTypes;
  TEXT_COLOR: ({ ...props }: TextColorType) => RadioTypes;
}

export const LABEL_EDIT_FORM_PROPS: LABEL_EDIT_FORM_PROPS_Types = {
  LABEL: ({ backgroundColorCode, textColor, title }) => ({
    backgroundColorCode: backgroundColorCode || COLORS.INPUT_BACKGROUND,
    textColor,
    title: title || '레이블',
  }),
  LABEL_TITLE: ({ inputValue, onChange, isTyping }) => ({
    inputMaxLength: MAX_TITLE_LENTH,
    inputPlaceholder: '레이블 이름',
    inputSize: 'SMALL',
    inputType: 'text',
    inputValue,
    onChange,
    isTyping,
  }),
  LABEL_DESCRIPTION: ({ inputValue, onChange, isTyping }) => ({
    inputMaxLength: MAX_DESCRIPTION_LENGTH,
    inputPlaceholder: '설명(선택)',
    inputSize: 'SMALL',
    inputType: 'text',
    inputValue,
    onChange,
    isTyping,
  }),
  TEXT_COLOR: ({ id, onChange, textColor }) => ({
    radioData: {
      title: `${id}-텍스트 색상`,
      option: [
        { id, title: '어두운 색', isChecked: textColor === 'BLACK' },
        { id, title: '밝은 색', isChecked: textColor === 'WHITE' },
      ],
    },
    onChange,
  }),
};
