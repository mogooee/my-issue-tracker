import { ContentTypes } from '@/api/issue/types';
import { NEW_ISSUE_FORM_TYPES } from '@/stores/newIssue';
import { filterIdPassword, TEST_USER, USER_TABLE } from '@/mocks/handlers/auth';
import { LABEL_TABLE } from '@/mocks/handlers/label';
import { issueTable, MILESTONE_TABLE } from '@/mocks/tables/issue';

interface ResponseNewIssueDataTypes {
  memberId: number;
}

export const responseNewIssueData = ({ memberId, ...props }: NEW_ISSUE_FORM_TYPES & ResponseNewIssueDataTypes) => {
  const { title, comment, assigneeIds, labelIds, milestoneId } = props;

  const findUser = (id: number) => USER_TABLE.find((user) => user.id === id)!;
  const findAssignees = (ids: number[]) => (ids.length ? ids.map((id) => findUser(id)) : []);
  const findLabels = (ids: number[]) =>
    ids.length ? ids.map((id) => LABEL_TABLE.find((label) => label.id === id)!) : [];
  const findMilestone = (id: number | null) =>
    id !== null ? MILESTONE_TABLE.openedMilestones.find((el) => el.id === id) : null;

  const newIssueId = issueTable.openIssues.length + issueTable.closedIssues.length + 1;

  const responseIssue: ContentTypes = {
    id: newIssueId,
    title,
    author: filterIdPassword(USER_TABLE[memberId] || TEST_USER),
    comments: [
      {
        id: 12,
        author: filterIdPassword(USER_TABLE[memberId] || TEST_USER),
        content: comment,
        createdAt: new Date().toISOString(),
        issueCommentReactionsResponse: [],
      },
    ],
    issueAssignees: {
      issueAssignees: findAssignees(assigneeIds),
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
