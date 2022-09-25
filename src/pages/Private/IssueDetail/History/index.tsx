import { IssueHistoryTypes } from '@/api/issue/types';

import * as S from '@/pages/Private/IssueDetail/History/index.styles';
import Label from '@/components/Atoms/Label';
import UserImage from '@/components/Atoms/UserImage';

import calcTimeForToday from '@/utils/calcForTimeToday';

const ACTION_MESSAGE = {
  CHANGE_TITLE: 'changed the title',
  OPEN_ISSUE: 'reopened this',
  CLOSE_ISSUE: 'closed this as completed',
  ADD_LABEL: 'added',
  REMOVE_LABEL: 'removed',
  ADD_ASSIGNEE: 'assigned',
  REMOVE_ASSIGNEE: 'unassigned',
  ADD_MILESTONE: 'added this to the',
  REMOVE_MILESTONE: 'removed this from the',
};

const IssueHistory = ({ ...props }: IssueHistoryTypes) => {
  const { modifier, modifiedAt, action, label, milestone, assignee, previousTitle, changedTitle } = props;
  const message = ACTION_MESSAGE[action];

  const changeTitle = () => (
    <>
      <span className="previous_title">{previousTitle}</span>
      <span className="changed_title">{changedTitle}</span>
    </>
  );

  const changeAssignee = () => <strong>{assignee!.nickname}</strong>;

  const changeLabel = () => {
    const { createdAt, lastModifiedAt, ...labelProps } = label!;
    return (
      <S.HistoryLabel>
        <Label {...labelProps} />
      </S.HistoryLabel>
    );
  };

  const changeMilestone = () => (
    <>
      <strong>{milestone!.title}</strong>
      <span>milestone</span>
    </>
  );

  const switchRender = () => {
    switch (action) {
      case 'CHANGE_TITLE':
        return changeTitle();
      case 'ADD_ASSIGNEE':
      case 'REMOVE_ASSIGNEE':
        return changeAssignee();
      case 'ADD_LABEL':
      case 'REMOVE_LABEL':
        return changeLabel();
      case 'ADD_MILESTONE':
      case 'REMOVE_MILESTONE':
        return changeMilestone();
    }
  };

  return (
    <S.IssueHistory>
      <UserImage {...modifier} />
      <strong>{modifier.nickname}</strong>
      <span>{message}</span>
      {switchRender()}
      <span>{calcTimeForToday(modifiedAt)}</span>
    </S.IssueHistory>
  );
};

export default IssueHistory;
