import React, { useRef, useState } from 'react';

import * as S from '@/components/Atoms/TextArea/index.styles';
import Icon from '@/components/Atoms/Icon';
import { COLORS } from '@/styles/theme';

interface TextAreaTypes {
  textAreaValue: string;
  setAreaValue: React.Dispatch<React.SetStateAction<string>>;
}

const DEFAULT_TEXTAREA_MAX_LENGTH = 1000;
const PLACEHOLDER = '코멘트를 입력하세요';

const TextArea = ({ textAreaValue, setAreaValue }: TextAreaTypes) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const countText = `띄어쓰기 포함 ${textAreaValue ? textAreaValue.length : 0}자`;

  const handleFormClick = () => {
    textAreaRef.current?.focus();
    setIsActive(true);
  };

  const handleTextareaChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;
    if (!value) return setAreaValue('');
    if (Number(value) >= DEFAULT_TEXTAREA_MAX_LENGTH) {
      // eslint-disable-next-line no-param-reassign
      event.currentTarget.value = value.slice(0, DEFAULT_TEXTAREA_MAX_LENGTH);
    }
    return setAreaValue(value);
  };

  return (
    <S.TextAreaContainer isActive={isActive} onClick={handleFormClick} onBlur={() => setIsActive(false)}>
      {textAreaValue && (
        <S.TextAreaLabel>
          <label htmlFor="textArea">{PLACEHOLDER}</label>
          <span>{countText}</span>
        </S.TextAreaLabel>
      )}
      <S.TextArea
        name=""
        id="textArea"
        maxLength={DEFAULT_TEXTAREA_MAX_LENGTH}
        placeholder={PLACEHOLDER}
        ref={textAreaRef}
        onChange={handleTextareaChange}
      >
        {textAreaValue || undefined}
      </S.TextArea>
      <S.TextAreaAddFile className="textArea_addFile" isActive={isActive}>
        <label htmlFor="textArea_addFile">
          <input id="textArea_addFile" type="file" />
          <Icon icon="PaperClip" stroke={COLORS.LABEL} />
          <span>파일 첨부하기</span>
        </label>
      </S.TextAreaAddFile>
    </S.TextAreaContainer>
  );
};

export default TextArea;
