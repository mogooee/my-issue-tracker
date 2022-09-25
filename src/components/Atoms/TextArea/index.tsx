import React, { useRef, useState, useEffect } from 'react';
import { uploadImage } from '@/api/imageUpload';
import { useRecoilState } from 'recoil';
import { NewIssueFormState } from '@/stores/newIssue';

import * as S from '@/components/Atoms/TextArea/index.styles';
import Icon from '@/components/Atoms/Icon';
import { COLORS } from '@/styles/theme';
import { DEFAULT_TEXTAREA_MAX_LENGTH } from '@/components/Molecules/TextAreaEditer/constants';
import debounce from '@/utils/debounce';

export interface TextAreaTypes {
  edit: 'ISSUE' | 'COMMENT';
  textAreaValue: string;
  setTextAreaValue?: React.Dispatch<React.SetStateAction<string>>;
}

const PLACEHOLDER = '코멘트를 입력하세요';
const DEBOUNC_DELAY = 300;

const TextArea = ({ edit, textAreaValue, setTextAreaValue }: TextAreaTypes) => {
  const timerId = useRef<number>(0);
  const [newIssueFormState, setNewIssueFormState] = useRecoilState(NewIssueFormState);

  const [isActive, setIsActive] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const countText = `띄어쓰기 포함 ${textAreaValue ? textAreaValue.length : 0}자`;

  const handleFormClick = () => {
    textAreaRef.current?.focus();
    setIsActive(true);
  };

  const uploadImageFile = async (e: { target: HTMLInputElement }) => {
    const file = e.target.files![0];
    const data = await uploadImage(file);
    const markdownImg = `\n![](${data})\n`;

    if (edit === 'ISSUE') {
      textAreaRef.current!.value += markdownImg;
      setNewIssueFormState({ ...newIssueFormState, comment: `${newIssueFormState.comment} ${markdownImg}` });
    }

    if (edit === 'COMMENT') {
      textAreaRef.current!.value += markdownImg;
      setTextAreaValue?.(`${textAreaValue} ${markdownImg}`);
    }
  };

  const updateCommentState = (value: string) => {
    if (!value) return setTextAreaValue?.('');
    if (Number(value) >= DEFAULT_TEXTAREA_MAX_LENGTH) {
      // eslint-disable-next-line no-param-reassign
      value = value.slice(0, DEFAULT_TEXTAREA_MAX_LENGTH);
    }
    return setTextAreaValue?.(value);
  };

  const updateNewIssueState = (value: string) => {
    if (!value) return setNewIssueFormState({ ...newIssueFormState, comment: '' });
    if (Number(value) >= DEFAULT_TEXTAREA_MAX_LENGTH) {
      // eslint-disable-next-line no-param-reassign
      value = value.slice(0, DEFAULT_TEXTAREA_MAX_LENGTH);
    }
    return setNewIssueFormState({ ...newIssueFormState, comment: value });
  };

  const handleOnChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;

    if (edit === 'ISSUE') {
      updateNewIssueState(value);
    }

    if (edit === 'COMMENT') {
      updateCommentState(value);
    }
  };

  const handleOnTypingTextArea = debounce(timerId, handleOnChangeTextArea, DEBOUNC_DELAY);

  useEffect(() => {
    if (textAreaRef.current) textAreaRef.current.value = textAreaValue;
    if (textAreaRef.current && !textAreaValue) textAreaRef.current.value = '';
  }, [textAreaValue]);

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
        onChange={handleOnTypingTextArea}
        defaultValue={textAreaValue}
      />
      <S.TextAreaAddFile className="textArea_addFile" isActive={isActive}>
        <label htmlFor="textArea_addFile">
          <input id="textArea_addFile" type="file" onChange={uploadImageFile} accept="image/*" />
          <Icon icon="PaperClip" stroke={COLORS.LABEL} />
          <span>이미지 파일 첨부하기</span>
        </label>
      </S.TextAreaAddFile>
    </S.TextAreaContainer>
  );
};

export default TextArea;
