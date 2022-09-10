import React, { useState, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import useInput from '@/hooks/useInput';
import useFetchIssue from '@/api/issue/useFetchIssue';

import { COLORS } from '@/styles/theme';

import Button from '@/components/Atoms/Button';
import Input from '@/components/Atoms/Input';
import * as S from '@/components/Organisms/IssueHeader/HeaderInline/index.styled';

import { ContentTypes } from '@/api/issue/types';
import { LoginUserInfoState } from '@/stores/loginUserInfo';
import debounce from '@/utils/debounce';

const MAX_ISSUE_TITLE_NUM = 255;

type LeftButtonIconType = 'XSquare' | 'Edit';
type LeftButtonLabelType = '편집 취소' | '제목 편집';
type RightButtonIconType = 'Archive' | 'AlertCircle' | 'Edit';
type RightButtonLabelType = '이슈 닫기' | '다시 열기' | '편집 완료';

type HeaderInlineTypes = Pick<ContentTypes, 'id' | 'title' | 'closed'>;

const DEBOUNCE_DELAY = 200;

const HeaderInline = ({ id: issueId, title, closed }: HeaderInlineTypes) => {
  const timerId = useRef(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [issueTitle, setIssueTitle] = useState<string>(title);
  const { isActive, onChangeInput, onClickInput, onBlurInput } = useInput();
  const userInfo = useRecoilValue(LoginUserInfoState);

  const { usePatchIssueTitle } = useFetchIssue();
  const { mutate: patchIssueTitle } = usePatchIssueTitle(issueId);

  const defineButtonLabel = (
    isEditing: boolean,
    isOpen: boolean,
  ): [[LeftButtonIconType, LeftButtonLabelType], [RightButtonIconType, RightButtonLabelType]] => {
    if (isEditing) {
      return [
        ['XSquare', '편집 취소'],
        ['Edit', '편집 완료'],
      ];
    }

    return [['Edit', '제목 편집'], isOpen ? ['Archive', '이슈 닫기'] : ['AlertCircle', '다시 열기']];
  };

  const [[leftButtonIcon, leftButtonLabel], [rightButtonIcon, rightButtonLabel]] = defineButtonLabel(isEdit, !closed);

  const handleRightButtonClick = () => {
    const memberId = userInfo.id;

    if (isEdit) {
      const newTitle = { title: issueTitle };
      patchIssueTitle({ issueId, memberId, newTitle });
      setIsEdit(false);
      return;
    }
  };

  const handleTitleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeInput(e);
    setIssueTitle(e.target.value);
  };

  const handleOnTitleTyping = debounce(timerId, handleTitleOnChange, DEBOUNCE_DELAY);

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
        <Button
          buttonStyle="SECONDARY"
          iconInfo={{
            icon: leftButtonIcon,
          }}
          label={leftButtonLabel}
          size="SMALL"
          handleOnClick={() => {
            if (!isEdit) {
              setIsEdit(true);
            } else {
              setIsEdit(false);
            }
          }}
        />
        <Button
          buttonStyle={isEdit ? 'STANDARD' : 'SECONDARY'}
          iconInfo={{
            icon: rightButtonIcon,
            stroke: isEdit ? COLORS.OFF_WHITE : COLORS.PRIMARY.BLUE,
          }}
          label={rightButtonLabel}
          size="SMALL"
          handleOnClick={handleRightButtonClick}
        />
      </S.ButtonTab>
    </S.HeaderInline>
  );
};

export default HeaderInline;
