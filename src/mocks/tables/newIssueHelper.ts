import { ContentTypes } from '@/api/issue/types';
import { USER_LIST } from '@/components/Molecules/Dropdown/mock';
import { NEW_ISSUE_FORM_TYPES } from '@/stores/newIssue';
import { labelTable } from '@/mocks/handlers/label';
import { milestones } from '@/mocks/handlers/milestone';
import { issueTable } from '@/mocks/tables/issue';

interface ResponseNewIssueDataTypes {
  memberId: number;
}

export const responseNewIssueData = ({ memberId, ...props }: NEW_ISSUE_FORM_TYPES & ResponseNewIssueDataTypes) => {
  const { title, comment, assigneeIds, labelIds, milestoneId } = props;

  const findUser = (id: number) => USER_LIST.find((el) => el.id === id)!;
  const findAssignees = (ids: number[]) => (ids.length ? ids.map((id) => findUser(id)) : []);
  const findLabels = (ids: number[]) =>
    ids.length ? ids.map((id) => labelTable.find((label) => label.id === id)!) : [];
  const findMilestone = (id: number | null) =>
    id !== null ? milestones.openedMilestones.find((el) => el.id === id) : null;

  const newIssueId = issueTable.openIssues.length + issueTable.closedIssues.length + 1;

  const responseIssue: ContentTypes = {
    id: newIssueId,
    title,
    author: findUser(memberId) || {
      id: 0,
      email: 'dobby@gmail.com',
      nickname: '도비',
      profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
    },
    comments: [
      {
        id: 12,
        author: findUser(memberId) || {
          id: 0,
          email: 'dobby@gmail.com',
          nickname: '도비',
          profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
        },
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
