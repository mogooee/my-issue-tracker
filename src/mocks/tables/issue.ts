import { IssuesTypes, ContentTypes, CommentsTypes } from '@/api/issue/types';
import { USER_TABLE } from '@/mocks/handlers/auth';
import { LABEL_TABLE } from '@/mocks/handlers/label';


const AUTHOR = {
  DOBBY: USER_TABLE[0],
  DOTORI: USER_TABLE[1],
  WHO: USER_TABLE[2],
  ADER: USER_TABLE[3],
  BECK: USER_TABLE[4],
};

const LABEL = {
  FEATURE: LABEL_TABLE[0],
  DOCS: LABEL_TABLE[1],
  BUGS: LABEL_TABLE[2],
  QUESTION: LABEL_TABLE[3],
};

export const issues: IssuesTypes = {
  openIssueCount: 5,
  closedIssueCount: 3,
  issues: {
    content: [
      {
        id: 1,
        title: '로우앤슬로우',
        author: AUTHOR.WHO,
        comments: [
          {
            id: 1,
            author: AUTHOR.WHO,
            content: '주문할 메뉴는 오리지널과 비프립플레이트입니다.',
            createdAt: '2022-09-11T00:00:00.479Z',
            issueCommentReactionsResponse: [
              {
                id: 1,
                emoji: 'U+1F44D',
                issueCommentReactorResponse: {
                  id: 2,
                  nickname: 'hoo',
                },
              },
              {
                id: 2,
                emoji: 'U+1F44D',
                issueCommentReactorResponse: {
                  id: 3,
                  nickname: 'ader',
                },
              },
            ],
          },
          {
            id: 2,
            author: AUTHOR.ADER,
            content: '너무 좋아요 소고기뭇국도 기대됩니다.',
            createdAt: '2022-09-11T17:00:00.111Z',
            issueCommentReactionsResponse: [
              {
                id: 4,
                emoji: 'U+1F604',
                issueCommentReactorResponse: {
                  id: 1,
                  nickname: 'hoo',
                },
              },
            ],
          },
          {
            id: 3,
            author: AUTHOR.DOTORI,
            content: '코멘트 배치 테스트',
            createdAt: '2022-09-18T16:30:00.479Z',
            issueCommentReactionsResponse: [],
          },
        ],
        issueAssignees: {
          issueAssignees: [AUTHOR.WHO, AUTHOR.ADER],
        },
        issueLabels: {
          issueLabels: [LABEL.FEATURE, LABEL.DOCS, LABEL.BUGS, LABEL.QUESTION],
        },
        issueHistories: [
          {
            modifier: AUTHOR.WHO,
            modifiedAt: '2022-09-11T16:46:53.479Z',
            action: 'CHANGE_TITLE',
            label: null,
            milestone: null,
            assignee: null,
            previousTitle: '히스토리 테스트',
            changedTitle: '로우앤슬로우',
          },
          {
            modifier: AUTHOR.ADER,
            modifiedAt: '2022-09-12T12:46:53.479Z',
            action: 'CLOSE_ISSUE',
            label: null,
            milestone: null,
            assignee: null,
            previousTitle: null,
            changedTitle: null,
          },
          {
            modifier: AUTHOR.DOBBY,
            modifiedAt: '2022-09-14T14:46:53.479Z',
            action: 'OPEN_ISSUE',
            label: null,
            milestone: null,
            assignee: null,
            previousTitle: null,
            changedTitle: null,
          },
          {
            modifier: AUTHOR.DOBBY,
            modifiedAt: '2022-09-18T15:46:53.479Z',
            action: 'ADD_LABEL',
            label: {
              createdAt: '2022-09-19T06:46:53.479Z',
              lastModifiedAt: '2022-09-19T06:46:53.479Z',
              ...LABEL.QUESTION,
            },
            milestone: null,
            assignee: null,
            previousTitle: null,
            changedTitle: null,
          },
          {
            modifier: AUTHOR.DOBBY,
            modifiedAt: '2022-09-20T16:46:53.479Z',
            action: 'REMOVE_ASSIGNEE',
            label: null,
            milestone: null,
            assignee: {
              createdAt: '2022-09-19T06:46:53.479Z',
              lastModifiedAt: '2022-09-19T06:46:53.479Z',
              ...AUTHOR.DOBBY,
            },
            previousTitle: null,
            changedTitle: null,
          },
          {
            modifier: AUTHOR.DOBBY,
            modifiedAt: '2022-09-20T16:46:53.479Z',
            action: 'REMOVE_MILESTONE',
            label: null,
            milestone: {
              createdAt: '2022-09-19T06:46:53.479Z',
              lastModifiedAt: '2022-09-19T06:46:53.479Z',
              id: 2,
              title: '마일스톤 3',
              description: '열린 마일스톤에 대한 설명',
              dueDate: '2022-08-28',
              closed: false,
            },
            assignee: null,
            previousTitle: null,
            changedTitle: null,
          },
        ],
        createdAt: '2022-09-11T00:00:00',
        lastModifiedAt: '2022-09-11T00:00:00',
        closed: false,
      },
      {
        id: 2,
        title: '물회',
        author: AUTHOR.WHO,
        comments: [
          {
            id: 3,
            author: AUTHOR.ADER,
            content: '물회에는 역시 오이가 들어가야죠!',
            createdAt: '2022-08-20T00:00:00',
            issueCommentReactionsResponse: [
              {
                id: 3,
                emoji: 'U+1F44E',
                issueCommentReactorResponse: {
                  id: 3,
                  nickname: 'ader',
                },
              },
              {
                id: 6,
                emoji: 'U+1F615',
                issueCommentReactorResponse: {
                  id: 3,
                  nickname: 'ader',
                },
              },
              {
                id: 9,
                emoji: 'U+1F440',
                issueCommentReactorResponse: {
                  id: 3,
                  nickname: 'ader',
                },
              },
            ],
          },
        ],
        issueAssignees: {
          issueAssignees: [AUTHOR.WHO],
        },
        issueLabels: {
          issueLabels: [LABEL.FEATURE, LABEL.QUESTION],
        },
        milestone: {
          id: 2,
          title: '마일스톤 3',
          description: '열린 마일스톤에 대한 설명',
          dueDate: '2022-08-28',
          closed: false,
          openIssueCount: 5,
          closedIssueCount: 5,
        },
        issueHistories: [],
        createdAt: '2022-09-02T00:00:00',
        lastModifiedAt: '2022-09-02T00:00:00',
        closed: false,
      },
      {
        id: 3,
        title: '해진뒤',
        author: AUTHOR.WHO,
        comments: [
          {
            id: 4,
            author: AUTHOR.WHO,
            content: '해진뒤 한 번 실패 뒤 재도전!!',
            createdAt: '2022-08-30T00:00:00',
            issueCommentReactionsResponse: [
              {
                id: 5,
                emoji: 'U+1F389',
                issueCommentReactorResponse: {
                  id: 2,
                  nickname: 'hoo',
                },
              },
              {
                id: 7,
                emoji: 'U+2764 U+FE0F',
                issueCommentReactorResponse: {
                  id: 2,
                  nickname: 'hoo',
                },
              },
              {
                id: 8,
                emoji: 'U+1F680',
                issueCommentReactorResponse: {
                  id: 3,
                  nickname: 'ader',
                },
              },
            ],
          },
        ],
        issueAssignees: {
          issueAssignees: [AUTHOR.WHO, AUTHOR.ADER],
        },
        issueLabels: {
          issueLabels: [LABEL.FEATURE],
        },
        issueHistories: [],
        createdAt: '2022-09-03T00:00:00',
        lastModifiedAt: '2022-09-03T00:00:00',
        closed: false,
      },
      {
        id: 4,
        title: '아타리',
        author: AUTHOR.WHO,
        comments: [
          {
            id: 5,
            author: AUTHOR.ADER,
            content: '아타리 가는날은 무슨날?',
            createdAt: '2022-09-10T00:00:00',
            issueCommentReactionsResponse: [],
          },
        ],
        issueAssignees: {
          issueAssignees: [AUTHOR.WHO, AUTHOR.ADER],
        },
        issueLabels: {
          issueLabels: [LABEL.FEATURE, LABEL.QUESTION],
        },
        issueHistories: [],
        createdAt: '2022-09-04T00:00:00',
        lastModifiedAt: '2022-09-04T00:00:00',
        closed: false,
      },
      {
        id: 5,
        title: '오제제',
        author: AUTHOR.WHO,
        comments: [
          {
            id: 6,
            author: AUTHOR.WHO,
            content: '또 오셔야겠죠?',
            createdAt: '2022-09-11T00:00:00',
            issueCommentReactionsResponse: [],
          },
          {
            id: 7,
            author: AUTHOR.ADER,
            content: '오제제의 안심과 자루우동은 아주 나이스!',
            createdAt: '2022-09-11T05:00:00',
            issueCommentReactionsResponse: [],
          },
        ],
        issueAssignees: {
          issueAssignees: [AUTHOR.WHO, AUTHOR.ADER],
        },
        issueLabels: {
          issueLabels: [],
        },
        milestone: {
          id: 2,
          title: '마일스톤 3',
          description: '열린 마일스톤에 대한 설명',
          dueDate: '2022-08-28',
          closed: false,
          openIssueCount: 5,
          closedIssueCount: 5,
        },
        issueHistories: [],
        createdAt: '2022-09-08T00:00:00',
        lastModifiedAt: '2022-09-08T00:00:00',
        closed: false,
      },
      {
        id: 6,
        title: '오달',
        author: AUTHOR.WHO,
        comments: [
          {
            id: 8,
            author: AUTHOR.WHO,
            content: '또 오셔야겠죠?',
            createdAt: '2022-09-11T00:00:00',
            issueCommentReactionsResponse: [],
          },
          {
            id: 7,
            author: AUTHOR.ADER,
            content: '오제제의 안심과 자루우동은 아주 나이스!',
            createdAt: '2022-09-11T05:00:00',
            issueCommentReactionsResponse: [],
          },
        ],
        issueAssignees: {
          issueAssignees: [AUTHOR.WHO],
        },
        issueLabels: {
          issueLabels: [],
        },
        milestone: {
          id: 2,
          title: '제목과 설명이 있는 마일스톤',
          description: '하지만 완료일은 없다',
          dueDate: null,
          openIssueCount: 1,
          closedIssueCount: 3,
          closed: false,
        },
        issueHistories: [],
        createdAt: '2022-09-06T00:00:00',
        lastModifiedAt: '2022-09-06T00:00:00',
        closed: true,
      },
      {
        id: 7,
        title: '뱃놈',
        author: AUTHOR.WHO,
        comments: [
          {
            id: 9,
            author: AUTHOR.WHO,
            content: '두 번가서 결국 끝까지 먹어봤네요.',
            createdAt: '2022-09-11T12:00:00',
            issueCommentReactionsResponse: [],
          },
        ],
        issueAssignees: {
          issueAssignees: [AUTHOR.ADER],
        },
        issueLabels: {
          issueLabels: [],
        },
        milestone: {
          id: 2,
          title: '제목과 설명이 있는 마일스톤',
          description: '하지만 완료일은 없다',
          dueDate: null,
          openIssueCount: 1,
          closedIssueCount: 3,
          closed: false,
        },
        issueHistories: [],
        createdAt: '2022-09-07T00:00:00',
        lastModifiedAt: '2022-09-07T00:00:00',
        closed: true,
      },
      {
        id: 8,
        title: '한국횟집',
        author: AUTHOR.WHO,
        comments: [
          {
            id: 10,
            author: AUTHOR.WHO,
            content: '다음엔 저도 데려가세요.',
            createdAt: '2022-09-12T00:00:00',
            issueCommentReactionsResponse: [],
          },
          {
            id: 11,
            author: AUTHOR.ADER,
            content: '꼭 파티구해서 같이가요!',
            createdAt: '2022-09-12T02:00:00',
            issueCommentReactionsResponse: [],
          },
        ],
        issueAssignees: {
          issueAssignees: [AUTHOR.WHO, AUTHOR.ADER],
        },
        issueLabels: {
          issueLabels: [],
        },
        milestone: {
          id: 2,
          title: '제목과 설명이 있는 마일스톤',
          description: '하지만 완료일은 없다',
          dueDate: null,
          openIssueCount: 1,
          closedIssueCount: 3,
          closed: false,
        },
        issueHistories: [],
        createdAt: '2022-09-08T00:00:00',
        lastModifiedAt: '2022-09-08T00:00:00',
        closed: false,
      },
      {
        id: 9,
        title: 'test',
        author: AUTHOR.DOBBY,
        comments: [
          {
            id: 12,
            author: AUTHOR.DOBBY,
            content: '# test',
            createdAt: '2022-09-13T11:47:11.408015',
            issueCommentReactionsResponse: [
              {
                id: 10,
                emoji: 'U+1F44D',
                issueCommentReactorResponse: {
                  id: 2,
                  nickname: 'hoo',
                },
              },
            ],
          },
        ],
        issueAssignees: {
          issueAssignees: [AUTHOR.DOBBY, AUTHOR.DOTORI, AUTHOR.BECK],
        },
        issueLabels: {
          issueLabels: [LABEL.DOCS],
        },
        milestone: null,
        issueHistories: [],
        createdAt: '2022-09-13T11:47:11.372872',
        lastModifiedAt: '2022-09-13T11:47:11.372872',
        closed: false,
      },
    ],
    pageable: {
      sort: {
        empty: true,
        sorted: false,
        unsorted: true,
      },
      offset: 0,
      pageNumber: 0,
      pageSize: 10,
      paged: true,
      unpaged: false,
    },
    last: true,
    totalPages: 1,
    totalElements: 8,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    first: true,
    size: 10,
    number: 0,
    numberOfElements: 8,
    empty: false,
  },
};

interface IssuesTableTypes {
  openIssues: ContentTypes[];
  closedIssues: ContentTypes[];
}

export const issueTable: IssuesTableTypes = {
  openIssues: issues.issues.content.filter((data) => !data.closed),
  closedIssues: issues.issues.content.filter((data) => data.closed),
};

export const issue: ContentTypes = issueTable.openIssues[0];

export const comment: CommentsTypes = issue.comments[0];
