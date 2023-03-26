/* eslint-disable react/no-unstable-nested-components */
import { useState } from 'react';
import { ContentTypes, MilestoneTypes } from '@/api/issue/types';
import useFetchIssue from '@/api/issue/useFetchIssue';

import { COLORS } from '@/styles/theme';
import * as S from '@/pages/Private/IssueDetail/index.styles';
import Button from '@/components/Atoms/Button';

import Modal from '@/components/Modal';
import { ModalState } from '@/stores/modal';
import DeleteCheck from '@/components/Modal/DeleteCheck';

import { useRecoilState } from 'recoil';
import CustomErrorBoundary from '@/components/ErrorBoundary';
import ErrorSideBar from '@/components/Organisms/SideBar/ErrorSideBar';
import DetailSidebarLogic from '@/pages/Private/IssueDetail/Aside/DetailSidebarLogic';
import { ContentListTypes } from '@/components/Organisms/SideBar/types';

const IsssueDetailAside = ({ issue, memberId }: { issue: ContentTypes; memberId: number }) => {
  const milestoneArr: MilestoneTypes[] = [];
  const DEFAULT_CONTENT_LIST: ContentListTypes = {
    label: issue.issueLabels.issueLabels,
    assignee: issue.issueAssignees.issueAssignees,
    milestone: issue.milestone === null ? milestoneArr : [issue.milestone],
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useRecoilState(ModalState);
  const [isDeleteIssueModalOpen, setIsDeleteIssueModalOpen] = useState(false);

  const { deleteIssueMutate } = useFetchIssue(issue.id);

  const isIssueAuthor = memberId === issue.author.id;

  const handleClickDeleteIssueButton = () => {
    setIsDeleteModalOpen(true);
    setIsDeleteIssueModalOpen(true);
  };

  const handleDeleteCommentButton = () => {
    deleteIssueMutate(issue.id);
    setIsDeleteIssueModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <S.Aside>
        <CustomErrorBoundary
          fallbackRender={({ resetState, errorCode }) => (
            <ErrorSideBar contentList={DEFAULT_CONTENT_LIST} resetState={resetState!} errorCode={errorCode} />
          )}
        >
          <DetailSidebarLogic issueId={issue.id} contentList={DEFAULT_CONTENT_LIST} />
        </CustomErrorBoundary>
        {isIssueAuthor && (
          <Button
            buttonStyle="NO_BORDER"
            iconInfo={{ icon: 'Trash', stroke: COLORS.ERROR.RED }}
            label="이슈 삭제"
            size="SMALL"
            handleOnClick={handleClickDeleteIssueButton}
          />
        )}
      </S.Aside>
      {isDeleteModalOpen && isDeleteIssueModalOpen && (
        <Modal>
          <DeleteCheck handleDeleteButtonClick={handleDeleteCommentButton} />
        </Modal>
      )}
    </>
  );
};

export default IsssueDetailAside;
