import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useFetchReaction from '@/api/issue/useFetchReaction';
import useFetchIssue from '@/api/issue/useFetchIssue';
import { LoginUserInfoState } from '@/stores/loginUserInfo';

import * as S from '@/components/Molecules/Comment/index.styled';
import { COLORS } from '@/styles/theme';

import TextArea from '@/components/Atoms/TextArea';
import Label from '@/components/Atoms/Label';
import Icon from '@/components/Atoms/Icon';
import Button from '@/components/Atoms/Button';
import Table from '@/components/Molecules/Table';
import Dropdown from '@/components/Molecules/Dropdown';
import ReactionContainer from '@/components/Molecules/Comment/ReactionContainer';

import calcTimeForToday from '@/utils/calcForTimeToday';
import { CommentsTypes, ReactionResponseTypes } from '@/api/issue/types';
import { BUTTON_PROPS, TABLE_ITEM_BUTTON_INFO } from '@/components/Atoms/Button/options';
import { AUTHOR_LABEL_PROPS, EDIT_BUTTON_PROPS } from '@/components/Molecules/Comment/constants';
import { ModalState } from '@/components/Modal';

interface CommentTypes {
  issueId: number;
  isAuthor: boolean;
  comment: CommentsTypes;
}

interface ReactorsTypes {
  reactionId: number;
  memberId: number;
  nickname: string;
}

export interface UsedEmojisTypes {
  emoji: string;
  reactors: ReactorsTypes[];
}

type MoleculesCommentType = { setSelectCommentId: React.Dispatch<React.SetStateAction<number>> };

export const definedUsedEmojis = (issueCommentReactionsResponse: ReactionResponseTypes[] | []) => {
  const usedEmojis: UsedEmojisTypes[] = [];

  issueCommentReactionsResponse.forEach(({ id: reactionId, emoji, issueCommentReactorResponse }) => {
    const { id: memberId, nickname } = issueCommentReactorResponse;

    const isExisted = usedEmojis.find((used) => used.emoji === emoji);

    if (isExisted) {
      isExisted.reactors.push({ reactionId, memberId, nickname });
    } else {
      const add: UsedEmojisTypes = { emoji, reactors: [{ reactionId, memberId, nickname }] };
      usedEmojis.push(add);
    }
  });

  return usedEmojis;
};

const Comment = ({
  issueId,
  isAuthor,
  comment,
  setSelectCommentId,
}: CommentTypes & MoleculesCommentType): JSX.Element => {
  const { id: commentId, author, content, createdAt, issueCommentReactionsResponse } = comment;

  const [textAreaValue, setTextAreaValue] = useState<string>(content);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const setIsDeleteModalOpen = useSetRecoilState(ModalState);

  const { reactions } = useFetchReaction();
  const { useUpdateIssueComment } = useFetchIssue();
  const { mutate: updateIssueComment } = useUpdateIssueComment(issueId);

  const memberId = useRecoilValue(LoginUserInfoState).id;
  const hasReaction = issueCommentReactionsResponse.length > 0;
  const usedEmojis = definedUsedEmojis(issueCommentReactionsResponse);

  const handleUpdateCommentButtonClick = () => {
    const newContent = { content: textAreaValue };
    updateIssueComment({ issueId, commentId, memberId, newContent });
    setIsEdit(false);
  };

  const handleEditCancelButtonClick = () => setIsEdit(false);

  const handleEditButtonClick = () => setIsEdit(true);

  const handleDeleteButtonClick = () => {
    setIsDeleteModalOpen(true);
    setSelectCommentId(commentId);
  };

  return isEdit ? (
    <S.TextArea>
      <TextArea textAreaValue={textAreaValue} setAreaValue={setTextAreaValue} />
      <S.TextAreaButtonTab>
        <Button {...{ ...BUTTON_PROPS.CANCEL, label: '편집 취소' }} handleOnClick={handleEditCancelButtonClick} />
        <Button {...BUTTON_PROPS.EDIT_SAVE} handleOnClick={handleUpdateCommentButtonClick} />
      </S.TextAreaButtonTab>
    </S.TextArea>
  ) : (
    <Table
      header={
        <S.CommentHeader>
          <span className="author">{author.nickname}</span>
          <span className="timeStamp">{calcTimeForToday(createdAt)}</span>
          <S.CommentTab>
            {isAuthor && (
              <>
                <Label {...AUTHOR_LABEL_PROPS} />
                <Button {...EDIT_BUTTON_PROPS} handleOnClick={handleEditButtonClick} />
                <Button {...TABLE_ITEM_BUTTON_INFO.DELETE} handleOnClick={handleDeleteButtonClick} />
              </>
            )}
            <Dropdown
              indicatorProps={{
                indicatorStyle: 'ICON',
                indicatorLabel: '',
                indicatorIcon: <Icon icon="Smile" stroke={COLORS.LABEL} />,
              }}
              type="Reaction"
              panelProps={{ issueId, commentId, memberId, reactions: reactions!, usedEmojis }}
            />
          </S.CommentTab>
        </S.CommentHeader>
      }
      item={[
        <S.CommentContent>
          <span>{content}</span>
          {hasReaction && (
            <ReactionContainer reactions={reactions!} usedEmojis={usedEmojis} issueId={issueId} commentId={commentId} />
          )}
        </S.CommentContent>,
      ]}
    />
  );
};
export default Comment;
