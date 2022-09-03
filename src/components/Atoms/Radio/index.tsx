import * as S from '@/components/Atoms/Radio/index.styled';

interface OptionTypes {
  id: number;
  title: string;
  isChecked?: boolean;
}

interface RadioDataTypes {
  title: string;
  option: OptionTypes[];
}

export interface RadioTypes {
  radioData: RadioDataTypes;
  onChange?: (title: string) => void;
}

const Radio = ({ radioData, onChange }: RadioTypes) => {
  const { title: radioTitle, option } = radioData;

  const hanldeRadioChange = (title: string) => {
    if (!onChange) return;
    onChange(title);
  };

  return (
    <S.RadioList totalNum={option.length}>
      {option.map(({ id, title: optionTitle, isChecked = false }) => (
        <S.Radio key={id}>
          <input
            type="radio"
            id={`${id}-${optionTitle}`}
            name={radioTitle}
            defaultChecked={isChecked}
            onChange={() => hanldeRadioChange(optionTitle)}
          />
          <label htmlFor={`${id}-${optionTitle}`}>{optionTitle}</label>
        </S.Radio>
      ))}
    </S.RadioList>
  );
};

export default Radio;
