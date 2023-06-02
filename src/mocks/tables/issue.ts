import { IssuesTypes, ContentTypes, CommentsTypes } from '@/api/issue/types';
import { MilestoneListTypes } from '@/api/milestone';
import { USER_TABLE } from '@/mocks/handlers/auth';
import { LABEL_TABLE } from '@/mocks/handlers/label';

export const MILESTONE_TABLE: MilestoneListTypes = {
  openedMilestones: [
    {
      id: 0,
      title: '마일스톤 1',
      description: null,
      dueDate: null,
      closed: false,
      openIssueCount: 2,
      closedIssueCount: 0,
    },
    {
      id: 2,
      title: '마일스톤 3',
      description: '열린 마일스톤 입니다.',
      dueDate: '2022-08-28',
      closed: false,
      openIssueCount: 3,
      closedIssueCount: 0,
    },
  ],
  closedMilestones: [
    {
      id: 1,
      title: '마일스톤 2',
      description: '닫힌 마일스톤 입니다.',
      dueDate: null,
      closed: true,
      openIssueCount: 1,
      closedIssueCount: 2,
    },
  ],
};

export const MILESTONE = {
  OPEN1: MILESTONE_TABLE.openedMilestones[0],
  OPEN2: MILESTONE_TABLE.openedMilestones[1],
  CLOSE1: MILESTONE_TABLE.closedMilestones[0],
};

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
  openIssueCount: MILESTONE_TABLE.openedMilestones.length,
  closedIssueCount: MILESTONE_TABLE.closedMilestones.length,
  issues: {
    content: [
      {
        id: 1,
        title: '[Feat] 개발 환경 DB 구성',
        author: AUTHOR.WHO,
        comments: [
          {
            id: 1,
            author: AUTHOR.WHO,
            content: '로컬 개발 환경에서 사용할 DB 종류 논의',
            createdAt: '2022-09-11T00:00:00.479Z',
            issueCommentReactionsResponse: [
              {
                id: 1,
                emoji: 'U+1F44D',
                issueCommentReactorResponse: {
                  id: 2,
                  nickname: AUTHOR.BECK.nickname,
                },
              },
              {
                id: 2,
                emoji: 'U+1F44D',
                issueCommentReactorResponse: {
                  id: 3,
                  nickname: AUTHOR.DOTORI.nickname,
                },
              },
            ],
          },
          {
            id: 2,
            author: AUTHOR.ADER,
            content: '로컬 개발 환경에서 사용할 DB 연결',
            createdAt: '2022-09-11T17:00:00.111Z',
            issueCommentReactionsResponse: [
              {
                id: 4,
                emoji: 'U+1F604',
                issueCommentReactorResponse: {
                  id: 1,
                  nickname: AUTHOR.WHO.nickname,
                },
              },
            ],
          },
        ],
        issueAssignees: {
          issueAssignees: [AUTHOR.WHO, AUTHOR.ADER],
        },
        issueLabels: {
          issueLabels: [LABEL.FEATURE, LABEL.DOCS, LABEL.BUGS, LABEL.QUESTION],
        },
        milestone: MILESTONE.OPEN1,
        issueHistories: [
          {
            modifier: AUTHOR.WHO,
            modifiedAt: '2022-09-11T16:46:53.479Z',
            action: 'CHANGE_TITLE',
            label: null,
            milestone: null,
            assignee: null,
            previousTitle: '개발 환경 DB 구성',
            changedTitle: '[Feat] 개발 환경 DB 구성',
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
            modifiedAt: '2022-09-18T15:46:53.479Z',
            action: 'ADD_LABEL',
            label: {
              createdAt: '2022-09-19T06:46:53.479Z',
              lastModifiedAt: '2022-09-19T06:46:53.479Z',
              ...LABEL.FEATURE,
            },
            milestone: null,
            assignee: null,
            previousTitle: null,
            changedTitle: null,
          },
          {
            modifier: AUTHOR.DOBBY,
            modifiedAt: '2022-09-20T16:46:53.479Z',
            action: 'ADD_MILESTONE',
            label: null,
            milestone: {
              createdAt: '2022-09-19T06:46:53.479Z',
              lastModifiedAt: '2022-09-19T06:46:53.479Z',
              ...MILESTONE.OPEN1,
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
        title: '[Feat] 일반 회원가입 기능 구현',
        author: AUTHOR.ADER,
        comments: [
          {
            id: 3,
            author: AUTHOR.ADER,
            content: `# 회원가입과 관련된 로직을 구현합니다.`,
            createdAt: '2022-08-20T00:00:00',
            issueCommentReactionsResponse: [
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
          issueAssignees: [AUTHOR.WHO, AUTHOR.ADER],
        },
        issueLabels: {
          issueLabels: [LABEL.FEATURE],
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
        title: '[Feat] OAuth 회원가입 구현',
        author: AUTHOR.ADER,
        comments: [
          {
            id: 4,
            author: AUTHOR.WHO,
            content: 'OAuth 회원가입 구현',
            createdAt: '2022-08-30T00:00:00',
            issueCommentReactionsResponse: [
              {
                id: 5,
                emoji: 'U+1F389',
                issueCommentReactorResponse: {
                  id: 2,
                  nickname: AUTHOR.WHO.nickname,
                },
              },
              {
                id: 7,
                emoji: 'U+2764 U+FE0F',
                issueCommentReactorResponse: {
                  id: 2,
                  nickname: AUTHOR.DOBBY.nickname,
                },
              },
              {
                id: 8,
                emoji: 'U+1F680',
                issueCommentReactorResponse: {
                  id: 3,
                  nickname: AUTHOR.DOTORI.nickname,
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
        milestone: MILESTONE.OPEN1,
        issueHistories: [],
        createdAt: '2022-09-03T00:00:00',
        lastModifiedAt: '2022-09-03T00:00:00',
        closed: false,
      },
      {
        id: 4,
        title: '[Refactor][iOS] UI/Unit 테스트 작성',
        author: AUTHOR.BECK,
        comments: [
          {
            id: 5,
            author: AUTHOR.BECK,
            content: '',
            createdAt: '2022-09-10T00:00:00',
            issueCommentReactionsResponse: [],
          },
        ],
        issueAssignees: {
          issueAssignees: [AUTHOR.BECK],
        },
        issueLabels: {
          issueLabels: [LABEL.FEATURE, LABEL.BUGS],
        },
        milestone: MILESTONE.OPEN2,
        issueHistories: [],
        createdAt: '2022-09-04T00:00:00',
        lastModifiedAt: '2022-09-04T00:00:00',
        closed: false,
      },
      {
        id: 5,
        title: '[Refactor][iOS] Xcode UI Test 추가',
        author: AUTHOR.BECK,
        comments: [
          {
            id: 6,
            author: AUTHOR.BECK,
            content: 'Xcode UI Test를 추가합니다.',
            createdAt: '2022-09-11T00:00:00',
            issueCommentReactionsResponse: [],
          },
          {
            id: 7,
            author: AUTHOR.ADER,
            content: '💪💪💪💪💪',
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
        milestone: MILESTONE.OPEN2,
        issueHistories: [],
        createdAt: '2022-09-08T00:00:00',
        lastModifiedAt: '2022-09-08T00:00:00',
        closed: false,
      },
      {
        id: 6,
        title: '[FE] 🎉 프로젝트 환경설정',
        author: AUTHOR.DOTORI,
        comments: [
          {
            id: 8,
            author: AUTHOR.DOTORI,
            content: 'CRA를 이용하지 않고 webpack과 babel로 typescript 기반의 프로젝트 환경설정을 한다.',
            createdAt: '2022-09-11T00:00:00',
            issueCommentReactionsResponse: [],
          },
          {
            id: 7,
            author: AUTHOR.DOBBY,
            content: '프로젝트에 필요한 라이브러리를 설치한다.',
            createdAt: '2022-09-11T05:00:00',
            issueCommentReactionsResponse: [],
          },
        ],
        issueAssignees: {
          issueAssignees: [AUTHOR.DOTORI],
        },
        issueLabels: {
          issueLabels: [],
        },
        milestone: MILESTONE.CLOSE1,
        issueHistories: [],
        createdAt: '2022-09-06T00:00:00',
        lastModifiedAt: '2022-09-06T00:00:00',
        closed: true,
      },
      {
        id: 7,
        title: '[FE] ✨ 로그인/회원가입 페이지 UI 구현, 테스트하기',
        author: AUTHOR.DOBBY,
        comments: [
          {
            id: 9,
            author: AUTHOR.DOBBY,
            content: '로그인/회원가입 페이지 UI를 구현한다.',
            createdAt: '2022-09-11T12:00:00',
            issueCommentReactionsResponse: [],
          },
        ],
        issueAssignees: {
          issueAssignees: [AUTHOR.DOBBY],
        },
        issueLabels: {
          issueLabels: [],
        },
        milestone: MILESTONE.CLOSE1,
        issueHistories: [],
        createdAt: '2022-09-07T00:00:00',
        lastModifiedAt: '2022-09-07T00:00:00',
        closed: true,
      },
      {
        id: 8,
        title: '[FE] ✨ 로그인/회원가입 api 추가 적용',
        author: AUTHOR.DOTORI,
        comments: [
          {
            id: 10,
            author: AUTHOR.DOTORI,
            content: '회원가입 시 토큰 응답 확인하기',
            createdAt: '2022-09-12T00:00:00',
            issueCommentReactionsResponse: [],
          },
          {
            id: 11,
            author: AUTHOR.DOBBY,
            content: '💪💪💪💪💪',
            createdAt: '2022-09-12T02:00:00',
            issueCommentReactionsResponse: [],
          },
        ],
        issueAssignees: {
          issueAssignees: [AUTHOR.DOTORI, AUTHOR.DOBBY],
        },
        issueLabels: {
          issueLabels: [LABEL.FEATURE],
        },
        milestone: MILESTONE.CLOSE1,
        issueHistories: [],
        createdAt: '2022-09-08T00:00:00',
        lastModifiedAt: '2022-09-08T00:00:00',
        closed: false,
      },
      {
        id: 9,
        title: '✨ 이슈 필터 기능 구현',
        author: AUTHOR.DOTORI,
        comments: [
          {
            id: 12,
            author: AUTHOR.DOTORI,
            content: '## 이슈 페이지의 필터 기능 및 세부 기능 구현',
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
          issueAssignees: [AUTHOR.DOTORI],
        },
        issueLabels: {
          issueLabels: [LABEL.FEATURE],
        },
        milestone: null,
        issueHistories: [
          {
            modifier: AUTHOR.DOBBY,
            modifiedAt: '2022-09-11T16:46:53.479Z',
            action: 'CHANGE_TITLE',
            label: null,
            milestone: null,
            assignee: null,
            previousTitle: '이슈 필터 기능',
            changedTitle: '✨ 이슈 필터 기능 구현',
          },
        ],
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
  openIssues: issues.issues.content.filter((data) => !data.closed).sort((a, b) => b.id - a.id),
  closedIssues: issues.issues.content.filter((data) => data.closed).sort((a, b) => b.id - a.id),
};

export const issue: ContentTypes = issueTable.openIssues[0];

export const comment: CommentsTypes = issue.comments[0];
