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
}

const Radio = ({ radioData }: RadioTypes) => {
  const { title: radioTitle, option } = radioData;
  return (
    <S.RadioList totalNum={option.length}>
      {option.map(({ id, title: optionTitle, isChecked = false }) => (
        <S.Radio key={id}>
          <input type="radio" id={`${id}-${optionTitle}`} name={radioTitle} defaultChecked={isChecked} />
          <label htmlFor={`${id}-${optionTitle}`}>{optionTitle}</label>
        </S.Radio>
      ))}
    </S.RadioList>
  );
};

export default Radio;
