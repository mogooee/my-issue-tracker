import { IssueHistoryTypes } from '@/api/issue/types';
import calcTimeForToday from '@/utils/calcForTimeToday';

enum STATE {
  OPEN_ISSUE = '열렸습니다',
  CLOSE_ISSUE = '닫혔습니다',
}

export const getIssueSummary = (
  issueHistories: IssueHistoryTypes[],
  author: string,
  createdAt: string,
  lastModifiedAt: string,
) => {
  const changedStateHistory = issueHistories
    .filter((history) => history.action === 'OPEN_ISSUE' || history.action === 'CLOSE_ISSUE')
    .at(-1);

  const issueState = changedStateHistory?.action === 'CLOSE_ISSUE' ? STATE.CLOSE_ISSUE : STATE.OPEN_ISSUE;
  const timeStamp = changedStateHistory ? lastModifiedAt : createdAt;
  const editor = changedStateHistory?.modifier.nickname ?? author;

  return `이 이슈가 ${calcTimeForToday(timeStamp)}, ${editor}님에 의해 ${issueState}`;
};
