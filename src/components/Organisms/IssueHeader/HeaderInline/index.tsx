/* eslint-disable no-nested-ternary */
import React, { useState, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import useInput from '@/hooks/useInput';
import useFetchIssue from '@/api/issue/useFetchIssue';

import Button from '@/components/Atoms/Button';
import Input from '@/components/Atoms/Input';
import * as S from '@/components/Organisms/IssueHeader/HeaderInline/index.styled';

import { ContentTypes } from '@/api/issue/types';
import { LoginUserInfoState } from '@/stores/loginUserInfo';
import debounce from '@/utils/debounce';
import { BUTTON_PROPS } from '@/components/Atoms/Button/options';
import { ISSUE_DETAIL_BUTTON_PROPS } from '@/components/Organisms/IssueHeader/HeaderInline/constants';

type HeaderInlineTypes = Pick<ContentTypes, 'id' | 'title' | 'closed'>;

const MAX_ISSUE_TITLE_NUM = 255;
const DEBOUNCE_DELAY = 200;

const HeaderInline = ({ id: issueId, title, closed }: HeaderInlineTypes) => {
  const timerId = useRef(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [issueTitle, setIssueTitle] = useState<string>(title);
  const { isActive, onChangeInput, onClickInput, onBlurInput } = useInput();
  const memberId = useRecoilValue(LoginUserInfoState).id;

  const { useUpdateIssueTitle, useUpdateIssueState } = useFetchIssue(issueId);
  const { mutate: updateIssueTitle } = useUpdateIssueTitle(issueId);
  const { mutate: updateIssueState } = useUpdateIssueState([issueId]);

  const handleTitleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeInput(e);
    setIssueTitle(e.target.value);
  };

  const handleOnTitleTyping = debounce(timerId, handleTitleOnChange, DEBOUNCE_DELAY);

  const handleOnEditButtonClick = () => {
    setIsEdit(true);
  };

  const handleOnEditCancelButtonClick = () => {
    setIsEdit(false);
    setIssueTitle(title);
  };

  const handleOnSaveTitleButtonClick = () => {
    const newTitle = { title: issueTitle };
    updateIssueTitle({ issueId, memberId, newTitle });
    setIsEdit(false);
  };

  const handleOnIssueStateButtonClick = () => {
    const ids = [issueId];
    const newState = { status: !closed, ids };
    updateIssueState({ newState, memberId });
  };

  const leftButtonProps = isEdit
    ? {
        ...BUTTON_PROPS.CANCEL,
        label: '편집 취소',
        handleOnClick: handleOnEditCancelButtonClick,
      }
    : { ...ISSUE_DETAIL_BUTTON_PROPS.EDIT, handleOnClick: handleOnEditButtonClick };

  const isDisabledEditSave = !issueTitle || issueTitle === title;

  const rightButtonProps = isEdit
    ? { ...BUTTON_PROPS.EDIT_SAVE, disabled: isDisabledEditSave, handleOnClick: handleOnSaveTitleButtonClick }
    : { ...ISSUE_DETAIL_BUTTON_PROPS[closed ? 'OPEN' : 'CLOSE'], handleOnClick: handleOnIssueStateButtonClick };

  return (
    <S.HeaderInline>
      <S.Title>
        {isEdit ? (
          <Input
            inputMaxLength={MAX_ISSUE_TITLE_NUM}
            inputPlaceholder="제목"
            inputSize="SMALL"
            inputType="text"
            isActive={isActive}
            isTyping
            inputValue={title}
            onBlur={onBlurInput}
            onChange={handleOnTitleTyping}
            onClick={onClickInput}
          />
        ) : (
          <>
            <h1>{title}</h1>
            <span className="issueNumber">{`#${issueId}`}</span>
          </>
        )}
      </S.Title>
      <S.ButtonTab>
        <Button {...leftButtonProps} />
        <Button {...rightButtonProps} />
      </S.ButtonTab>
    </S.HeaderInline>
  );
};

export default HeaderInline;
