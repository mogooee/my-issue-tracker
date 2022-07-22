import * as S from '@/components/Molecules/SignUpInput/index.styles';
import Input from '@/components/Atoms/Input';
import useInput from '@/hooks/useInput';

export interface SignUpInputTypes {
  inputType: string;
  maxLength: number;
  placeholder: string;
  pattern: RegExp;
  patternMsg: string;
}

const SignUpInput = ({ ...props }: SignUpInputTypes): JSX.Element => {
  const { inputType, maxLength, placeholder, pattern, patternMsg } = props;
  const { isError, setIsError, isActive, onChangeInput, onClickInput, onBlurInput } = useInput();

  return (
    <S.SignUpInput isError={isError} str={placeholder}>
      <span>{placeholder}</span>
      <p className="caption">{patternMsg}</p>
      <Input
        isActive={isActive}
        inputMaxLength={maxLength}
        inputPlaceholder={placeholder}
        inputSize="MEDIUM"
        inputType={inputType}
        onClick={onClickInput}
        onChange={(event: React.FormEvent<HTMLInputElement>) => {
          const { value } = event.currentTarget;
          setIsError(!value.match(pattern));
          onChangeInput(event);
        }}
        onBlur={() => onBlurInput()}
      />
    </S.SignUpInput>
  );
};

export default SignUpInput;
