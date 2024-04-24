import { ContentTypes } from '@/api/issue/types';
import { NEW_ISSUE_FORM_TYPES } from '@/stores/newIssue';
import { USER_TABLE, UserTableTypes } from '@/mocks/handlers/auth';
import { LABEL_TABLE } from '@/mocks/handlers/label';
import { MILESTONE_TABLE } from '@/mocks/tables/issue';

interface ResponseNewIssueDataTypes {
  memberId: number;
  newIssueId: number;
  newCommentId: number;
  author: UserTableTypes;
}

export const responseNewIssueData = ({ memberId, ...props }: NEW_ISSUE_FORM_TYPES & ResponseNewIssueDataTypes) => {
  const { title, comment, assigneeIds, labelIds, milestoneId } = props;

  const findUser = (id: number) => USER_TABLE.find((user) => user.id === id);
  const findAssignees = (ids: number[]) => ids.map((id) => findUser(id)!);
  const findLabels = (ids: number[]) => ids.map((id) => LABEL_TABLE.find((label) => label.id === id)!);
  const findMilestone = (id: number | null) => id && MILESTONE_TABLE.openedMilestones.find((el) => el.id === id);

  const responseIssue: ContentTypes = {
    id: props.newIssueId,
    title,
    author: props.author,
    comments: [
      {
        id: props.newCommentId,
        author: props.author,
        content: comment,
        createdAt: new Date().toISOString(),
        issueCommentReactionsResponse: [],
      },
    ],
    issueAssignees: {
      issueAssignees: findAssignees(assigneeIds) ?? [],
    },
    issueLabels: {
      issueLabels: findLabels(labelIds),
    },
    milestone: findMilestone(milestoneId) || null,
    issueHistories: [],
    createdAt: new Date().toISOString(),
    lastModifiedAt: new Date().toISOString(),
    closed: false,
  };

  return responseIssue;
};
