import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { LoginUserInfoState } from '@/stores/loginUserInfo';
import useFetchIssue from '@/api/issue/useFetchIssue';

import { COLORS } from '@/styles/theme';
import * as S from '@/pages/Private/IssueDetail/index.styled';

import Button from '@/components/Atoms/Button';
import { BUTTON_PROPS } from '@/components/Atoms/Button/options';
import TextArea from '@/components/Atoms/TextArea';
import UserImage from '@/components/Atoms/UserImage';
import Comment from '@/components/Molecules/Comment';
import SideBar from '@/components/Molecules/SideBar';
import IssueHeader from '@/components/Organisms/IssueHeader';
import Modal, { ModalState } from '@/components/Modal';
import DeleteCheck from '@/components/Modal/DeleteCheck';

const IssueDetail = (): JSX.Element => {
  const { issueId } = useParams();
  const { useIssueData, useAddIssueComment, useDeleteIssueComment } = useFetchIssue();
  const { data: issue } = useIssueData(Number(issueId));
  const { mutate: addIssueComment } = useAddIssueComment(Number(issueId));
  const { mutate: deleteIssueComment } = useDeleteIssueComment(Number(issueId));

  const { id, closed, title, createdAt, lastModifiedAt, author, comments } = issue!;

  const userInfo = useRecoilValue(LoginUserInfoState);
  const memberId = userInfo.id;
  const [textAreaValue, setTextAreaValue] = useState<string>('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useRecoilState(ModalState);
  const [selectCommentId, setSelectCommentId] = useState<number>(0);

  const handleAddCommentButton = () => {
    const newComment = { content: textAreaValue };
    addIssueComment({ newComment, memberId, issueId: Number(issueId) });
    setTextAreaValue('');
  };

  const handleDeleteCommentButton = () => {
    deleteIssueComment({ issueId: id, commentId: selectCommentId, memberId });
    setIsDeleteModalOpen(false);
  };

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
          {comments.map((comment) => {
            const isAuthor = JSON.stringify(userInfo) === JSON.stringify(comment.author);

            return (
              <S.Comment key={comment.id}>
                <UserImage {...comment.author} imgSize="MEDIUM" />
                <Comment issueId={id} isAuthor={isAuthor} comment={comment} setSelectCommentId={setSelectCommentId} />
              </S.Comment>
            );
          })}
          <S.NewComment>
            <UserImage {...userInfo} imgSize="MEDIUM" />
            <TextArea textAreaValue={textAreaValue} setAreaValue={setTextAreaValue} />
          </S.NewComment>
          <Button {...BUTTON_PROPS.ADD} handleOnClick={handleAddCommentButton} />
        </S.IssueComments>
        <S.Aside>
          <SideBar
            content={{
              assignee: [],
              label: [],
              milestone: [],
            }}
            sideBarList={[
              {
                dropdownList: [
                  {
                    email: 'dobby@gmail.com',
                    id: 0,
                    nickname: '도비',
                    profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
                  },
                  {
                    email: 'dotori@gmail.com',
                    id: 1,
                    nickname: '도토리',
                    profileImage: 'https://avatars.githubusercontent.com/u/92701121?v=4',
                  },
                  {
                    email: 'whoo@gmail.com',
                    id: 2,
                    nickname: '후',
                    profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
                  },
                  {
                    email: 'ader@gmail.com',
                    id: 3,
                    nickname: '아더',
                    profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
                  },
                  {
                    email: 'beck@gmail.com',
                    id: 4,
                    nickname: '벡',
                    profileImage: 'https://avatars.githubusercontent.com/u/65931336?v=4',
                  },
                ],
                dropdownListTitle: '담당자 필터',
                dropdownTitle: '담당자',
                dropdownType: 'checkbox',
                id: 'assignee',
              },
              {
                dropdownList: [
                  {
                    backgroundColorCode: '#007AFF',
                    description: '',
                    id: 0,
                    textColor: 'BLACK',
                    title: 'feature',
                  },
                  {
                    backgroundColorCode: '#FFD1CF',
                    description: '',
                    id: 1,
                    textColor: 'BLACK',
                    title: 'Fix',
                  },
                  {
                    backgroundColorCode: '#34C759',
                    description: '',
                    id: 2,
                    textColor: 'BLACK',
                    title: 'refactor',
                  },
                ],
                dropdownListTitle: '레이블 필터',
                dropdownTitle: '레이블',
                dropdownType: 'checkbox',
                id: 'label',
              },
              {
                dropdownList: [
                  {
                    closed: false,
                    closedIssueCount: 7,
                    description: null,
                    dueDate: null,
                    id: 0,
                    openIssueCount: 3,
                    title: '마일스톤 1',
                  },
                  {
                    closed: true,
                    closedIssueCount: 13,
                    description: '닫힌 마일스톤에 대한 설명',
                    dueDate: null,
                    id: 1,
                    openIssueCount: 16,
                    title: '마일스톤 2',
                  },
                  {
                    closed: false,
                    closedIssueCount: 5,
                    description: '열린 마일스톤에 대한 설명',
                    dueDate: '2022-08-28',
                    id: 2,
                    openIssueCount: 5,
                    title: '마일스톤 3',
                  },
                ],
                dropdownListTitle: '마일스톤 필터',
                dropdownTitle: '마일스톤',
                dropdownType: 'radio',
                id: 'milestone',
              },
            ]}
          />
          <Button
            buttonStyle="NO_BORDER"
            iconInfo={{
              icon: 'Trash',
              stroke: COLORS.ERROR.RED,
            }}
            label="이슈 삭제"
            size="SMALL"
          />
        </S.Aside>
      </S.IssueContent>
      {isDeleteModalOpen && (
        <Modal>
          <DeleteCheck handleDeleteButtonClick={handleDeleteCommentButton} />
        </Modal>
      )}
    </>
  );
};

export default IssueDetail;
