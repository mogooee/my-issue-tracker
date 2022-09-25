/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { LoginUserInfoState } from '@/stores/loginUserInfo';
import useFetchIssue from '@/api/issue/useFetchIssue';
import { isIssueCommentsTypes, isIssueHistoryTypes } from '@/api/issue/types';

import * as S from '@/pages/Private/IssueDetail/index.styled';
import Button from '@/components/Atoms/Button';
import { BUTTON_PROPS } from '@/components/Atoms/Button/options';
import TextArea from '@/components/Atoms/TextArea';
import UserImage from '@/components/Atoms/UserImage';
import Comment from '@/components/Molecules/Comment';
import IssueHeader from '@/components/Organisms/IssueHeader';
import IsssueDetailAside from '@/pages/Private/IssueDetail/Aside';
import IssueHistory from '@/pages/Private/IssueDetail/History';

const IssueDetail = (): JSX.Element => {
  const { issueId } = useParams();
  const { useIssueData, useAddIssueComment } = useFetchIssue(Number(issueId));
  const { data: issue } = useIssueData(Number(issueId));
  const { mutate: addIssueComment } = useAddIssueComment(Number(issueId));

  const { id, closed, title, createdAt, lastModifiedAt, author, comments, issueHistories } = issue!;

  const userInfo = useRecoilValue(LoginUserInfoState);
  const memberId = userInfo.id;
  const [textAreaValue, setTextAreaValue] = useState<string>('');
  const [_, setSelectCommentId] = useState<number>(0);

  const isTypingNewComment = !textAreaValue;

  const handleAddCommentButton = () => {
    const newComment = { content: textAreaValue };
    addIssueComment({ newComment, memberId, issueId: Number(issueId) });
    setTextAreaValue('');
  };

  const TimeLine = [...comments, ...issueHistories];
  const sortTimeLine = TimeLine.sort((a, b) => {
    const timeStampToNumber = (timeStamp: string) => Number(new Date(timeStamp));
    if (isIssueCommentsTypes(a) && isIssueHistoryTypes(b)) {
      return timeStampToNumber(a.createdAt) - timeStampToNumber(b.modifiedAt);
    }

    if (isIssueCommentsTypes(a) && isIssueCommentsTypes(b)) {
      return timeStampToNumber(a.createdAt) - timeStampToNumber(b.createdAt);
    }

    if (isIssueHistoryTypes(a) && isIssueCommentsTypes(b)) {
      return timeStampToNumber(a.modifiedAt) - timeStampToNumber(b.createdAt);
    }

    if (isIssueHistoryTypes(a) && isIssueHistoryTypes(b)) {
      return timeStampToNumber(a.modifiedAt) - timeStampToNumber(b.modifiedAt);
    }

    return 0;
  });

  return (
    <>
      <IssueHeader
        id={id}
        closed={closed}
        title={title}
        createdAt={createdAt}
        lastModifiedAt={lastModifiedAt}
        author={author}
        commentNum={comments.length}
      />
      <S.IssueContent>
        <S.IssueComments>
          {sortTimeLine.map((content, index) => {
            if (isIssueCommentsTypes(content)) {
              const isCommentAuthor = memberId === content.author.id;
              return (
                <S.Comment key={content.id}>
                  <UserImage {...content.author} imgSize="MEDIUM" />
                  <Comment
                    issueId={id}
                    isAuthor={isCommentAuthor}
                    comment={content}
                    setSelectCommentId={setSelectCommentId}
                    isMainComment={index === 0}
                  />
                </S.Comment>
              );
            }
            if (isIssueHistoryTypes(content)) {
              // eslint-disable-next-line react/no-array-index-key
              return <IssueHistory key={`history_${index}`} {...content} />;
            }
          })}
          <S.NewComment>
            <UserImage {...userInfo} imgSize="MEDIUM" />
            <TextArea textAreaValue={textAreaValue} setTextAreaValue={setTextAreaValue} edit="COMMENT" />
          </S.NewComment>
          <Button {...BUTTON_PROPS.ADD} disabled={isTypingNewComment} handleOnClick={handleAddCommentButton} />
        </S.IssueComments>
        <IsssueDetailAside issue={issue!} memberId={memberId} />
      </S.IssueContent>
    </>
  );
};

export default IssueDetail;
