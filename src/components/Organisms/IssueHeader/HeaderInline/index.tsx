import { useState } from 'react';
import useInput from '@/hooks/useInput';

import { COLORS } from '@/styles/theme';

import Button from '@/components/Atoms/Button';
import Input from '@/components/Atoms/Input';
import * as S from '@/components/Organisms/IssueHeader/HeaderInline/index.styled';

import { ContentTypes } from '@/api/issue/types';

const MAX_ISSUE_TITLE_NUM = 255;

type LeftButtonIconType = 'XSquare' | 'Edit';
type LeftButtonLabelType = '편집 취소' | '제목 편집';
type RightButtonIconType = 'Archive' | 'AlertCircle' | 'Edit';
type RightButtonLabelType = '이슈 닫기' | '다시 열기' | '편집 완료';

type HeaderInlineTypes = Pick<ContentTypes, 'id' | 'title' | 'closed'>;

const HeaderInline = ({ id, title, closed }: HeaderInlineTypes) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { isActive, onChangeInput, onClickInput, onBlurInput } = useInput();

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
            onChange={onChangeInput}
            onClick={onClickInput}
          />
        ) : (
          <>
            <h1>{title}</h1>
            <span className="issueNumber">{`#${id}`}</span>
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
          handleOnClick={() => {
            if (isEdit) {
              // 이슈 제목 수정 API
              setIsEdit(false);
            }
            if (!closed) {
              // 이슈 닫기 API
            } else {
              // 이슈 열기 API
            }
          }}
        />
      </S.ButtonTab>
    </S.HeaderInline>
  );
};

export default HeaderInline;
