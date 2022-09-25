import { IssuesTypes, ContentTypes, CommentsTypes } from '@/api/issue/types';

export const comment: CommentsTypes = {
  id: 1,
  author: {
    id: 2,
    email: 'whoo@gmail.com',
    nickname: '후',
    profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
  },
  content: '주문할 메뉴는 오리지널과 비프립플레이트입니다.',
  createdAt: '2022-09-03T15:49:48.906Z',
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
    {
      id: 3,
      emoji: 'U+1F604',
      issueCommentReactorResponse: {
        id: 0,
        nickname: 'dobby',
      },
    },
    {
      id: 4,
      emoji: 'U+1F389',
      issueCommentReactorResponse: {
        id: 4,
        nickname: 'beck',
      },
    },
  ],
};

export const issue: ContentTypes = {
  id: 1,
  title: '로우앤슬로우',
  author: {
    id: 2,
    email: 'whoo@gmail.com',
    nickname: '후',
    profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
  },
  comments: [
    {
      id: 1,
      author: {
        id: 2,
        email: 'whoo@gmail.com',
        nickname: '후',
        profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
      },
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
      author: {
        id: 2,
        email: 'ak2j38@gmail.com',
        nickname: 'ader',
        profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
      },
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
      author: {
        id: 2,
        email: 'ak2j38@gmail.com',
        nickname: 'ader',
        profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
      },
      content: '코멘트 배치 테스트',
      createdAt: '2022-09-18T16:30:00.479Z',
      issueCommentReactionsResponse: [],
    },
  ],
  issueAssignees: {
    issueAssignees: [
      {
        id: 2,
        email: 'whoo@gmail.com',
        nickname: '후',
        profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
      },
      {
        id: 3,
        email: 'ader@gmail.com',
        nickname: '아더',
        profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
      },
    ],
  },
  issueLabels: {
    issueLabels: [
      {
        id: 1,
        title: 'Feature',
        backgroundColorCode: '#d4c5f9',
        description: '기능 개발용 라벨입니다.',
        textColor: 'BLACK',
      },
      {
        id: 2,
        title: 'Docs',
        backgroundColorCode: '#d4c510',
        description: '문서 추가용 라벨입니다.',
        textColor: 'WHITE',
      },
      {
        id: 3,
        title: 'Bugs',
        backgroundColorCode: '#d4c505',
        description: '버그 수정용 라벨입니다.',
        textColor: 'BLACK',
      },
      {
        id: 4,
        title: 'Question',
        backgroundColorCode: '#d4c501',
        description: '질문용 라벨입니다.',
        textColor: 'WHITE',
      },
    ],
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
  issueHistories: [
    {
      modifier: {
        id: 2,
        email: 'whoo@gmail.com',
        nickname: '후',
        profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
      },
      modifiedAt: '2022-09-11T16:46:53.479Z',
      action: 'CHANGE_TITLE',
      label: null,
      milestone: null,
      assignee: null,
      previousTitle: '히스토리 테스트',
      changedTitle: '로우앤슬로우',
    },
    {
      modifier: {
        id: 3,
        email: 'ader@gmail.com',
        nickname: '아더',
        profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
      },
      modifiedAt: '2022-09-12T12:46:53.479Z',
      action: 'CLOSE_ISSUE',
      label: null,
      milestone: null,
      assignee: null,
      previousTitle: null,
      changedTitle: null,
    },
    {
      modifier: {
        id: 0,
        email: 'dobby@gmail.com',
        nickname: '도비',
        profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
      },
      modifiedAt: '2022-09-14T14:46:53.479Z',
      action: 'OPEN_ISSUE',
      label: null,
      milestone: null,
      assignee: null,
      previousTitle: null,
      changedTitle: null,
    },
    {
      modifier: {
        id: 0,
        email: 'dobby@gmail.com',
        nickname: '도비',
        profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
      },
      modifiedAt: '2022-09-18T15:46:53.479Z',
      action: 'ADD_LABEL',
      label: {
        createdAt: '2022-09-19T06:46:53.479Z',
        lastModifiedAt: '2022-09-19T06:46:53.479Z',
        id: 4,
        title: 'Question',
        backgroundColorCode: '#d4c501',
        description: '질문용 라벨입니다.',
        textColor: 'WHITE',
      },
      milestone: null,
      assignee: null,
      previousTitle: null,
      changedTitle: null,
    },
    {
      modifier: {
        id: 0,
        email: 'dobby@gmail.com',
        nickname: '도비',
        profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
      },
      modifiedAt: '2022-09-20T16:46:53.479Z',
      action: 'REMOVE_ASSIGNEE',
      label: null,
      milestone: null,
      assignee: {
        createdAt: '2022-09-19T06:46:53.479Z',
        lastModifiedAt: '2022-09-19T06:46:53.479Z',
        id: 0,
        email: 'dobby@gmail.com',
        nickname: '도비',
        profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
      },
      previousTitle: null,
      changedTitle: null,
    },
    {
      modifier: {
        id: 0,
        email: 'dobby@gmail.com',
        nickname: '도비',
        profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
      },
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
};

export const issues: IssuesTypes = {
  openIssueCount: 5,
  closedIssueCount: 3,
  issues: {
    content: [
      {
        id: 1,
        title: '로우앤슬로우',
        author: {
          id: 2,
          email: 'whoo@gmail.com',
          nickname: '후',
          profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
        },
        comments: [
          {
            id: 1,
            author: {
              id: 2,
              email: 'whoo@gmail.com',
              nickname: '후',
              profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
            },
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
            author: {
              id: 2,
              email: 'ak2j38@gmail.com',
              nickname: 'ader',
              profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
            },
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
            author: {
              id: 2,
              email: 'ak2j38@gmail.com',
              nickname: 'ader',
              profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
            },
            content: '코멘트 배치 테스트',
            createdAt: '2022-09-18T16:30:00.479Z',
            issueCommentReactionsResponse: [],
          },
        ],
        issueAssignees: {
          issueAssignees: [
            {
              id: 2,
              email: 'whoo@gmail.com',
              nickname: '후',
              profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
            },
            {
              id: 3,
              email: 'ader@gmail.com',
              nickname: '아더',
              profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
            },
          ],
        },
        issueLabels: {
          issueLabels: [
            {
              id: 1,
              title: 'Feature',
              backgroundColorCode: '#d4c5f9',
              description: '기능 개발용 라벨입니다.',
              textColor: 'BLACK',
            },
            {
              id: 2,
              title: 'Docs',
              backgroundColorCode: '#d4c510',
              description: '문서 추가용 라벨입니다.',
              textColor: 'WHITE',
            },
            {
              id: 3,
              title: 'Bugs',
              backgroundColorCode: '#d4c505',
              description: '버그 수정용 라벨입니다.',
              textColor: 'BLACK',
            },
            {
              id: 4,
              title: 'Question',
              backgroundColorCode: '#d4c501',
              description: '질문용 라벨입니다.',
              textColor: 'WHITE',
            },
          ],
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
        issueHistories: [
          {
            modifier: {
              id: 2,
              email: 'whoo@gmail.com',
              nickname: '후',
              profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
            },
            modifiedAt: '2022-09-11T16:46:53.479Z',
            action: 'CHANGE_TITLE',
            label: null,
            milestone: null,
            assignee: null,
            previousTitle: '히스토리 테스트',
            changedTitle: '로우앤슬로우',
          },
          {
            modifier: {
              id: 3,
              email: 'ader@gmail.com',
              nickname: '아더',
              profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
            },
            modifiedAt: '2022-09-12T12:46:53.479Z',
            action: 'CLOSE_ISSUE',
            label: null,
            milestone: null,
            assignee: null,
            previousTitle: null,
            changedTitle: null,
          },
          {
            modifier: {
              id: 0,
              email: 'dobby@gmail.com',
              nickname: '도비',
              profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
            },
            modifiedAt: '2022-09-14T14:46:53.479Z',
            action: 'OPEN_ISSUE',
            label: null,
            milestone: null,
            assignee: null,
            previousTitle: null,
            changedTitle: null,
          },
          {
            modifier: {
              id: 0,
              email: 'dobby@gmail.com',
              nickname: '도비',
              profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
            },
            modifiedAt: '2022-09-18T15:46:53.479Z',
            action: 'ADD_LABEL',
            label: {
              createdAt: '2022-09-19T06:46:53.479Z',
              lastModifiedAt: '2022-09-19T06:46:53.479Z',
              id: 4,
              title: 'Question',
              backgroundColorCode: '#d4c501',
              description: '질문용 라벨입니다.',
              textColor: 'WHITE',
            },
            milestone: null,
            assignee: null,
            previousTitle: null,
            changedTitle: null,
          },
          {
            modifier: {
              id: 0,
              email: 'dobby@gmail.com',
              nickname: '도비',
              profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
            },
            modifiedAt: '2022-09-20T16:46:53.479Z',
            action: 'REMOVE_ASSIGNEE',
            label: null,
            milestone: null,
            assignee: {
              createdAt: '2022-09-19T06:46:53.479Z',
              lastModifiedAt: '2022-09-19T06:46:53.479Z',
              id: 0,
              email: 'dobby@gmail.com',
              nickname: '도비',
              profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
            },
            previousTitle: null,
            changedTitle: null,
          },
          {
            modifier: {
              id: 0,
              email: 'dobby@gmail.com',
              nickname: '도비',
              profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
            },
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
        author: {
          id: 2,
          email: 'whoo@gmail.com',
          nickname: '후',
          profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
        },
        comments: [
          {
            id: 3,
            author: {
              id: 3,
              email: 'ader@gmail.com',
              nickname: '아더',
              profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
            },
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
          issueAssignees: [
            {
              id: 2,
              email: 'whoo@gmail.com',
              nickname: '후',
              profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
            },
          ],
        },
        issueLabels: {
          issueLabels: [
            {
              id: 2,
              title: 'Docs',
              backgroundColorCode: '#d4c510',
              description: '문서 추가용 라벨입니다.',
              textColor: 'WHITE',
            },
            {
              id: 4,
              title: 'Question',
              backgroundColorCode: '#d4c501',
              description: '질문용 라벨입니다.',
              textColor: 'WHITE',
            },
          ],
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
        author: {
          id: 2,
          email: 'whoo@gmail.com',
          nickname: '후',
          profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
        },
        comments: [
          {
            id: 4,
            author: {
              id: 2,
              email: 'whoo@gmail.com',
              nickname: '후',
              profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
            },
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
          issueAssignees: [
            {
              id: 2,
              email: 'whoo@gmail.com',
              nickname: '후',
              profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
            },
            {
              id: 3,
              email: 'ader@gmail.com',
              nickname: '아더',
              profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
            },
          ],
        },
        issueLabels: {
          issueLabels: [
            {
              id: 1,
              title: 'Feature',
              backgroundColorCode: '#d4c5f9',
              description: '기능 개발용 라벨입니다.',
              textColor: 'BLACK',
            },
          ],
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
        createdAt: '2022-09-03T00:00:00',
        lastModifiedAt: '2022-09-03T00:00:00',
        closed: false,
      },
      {
        id: 4,
        title: '아타리',
        author: {
          id: 2,
          email: 'whoo@gmail.com',
          nickname: '후',
          profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
        },
        comments: [
          {
            id: 5,
            author: {
              id: 3,
              email: 'ader@gmail.com',
              nickname: '아더',
              profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
            },
            content: '아타리 가는날은 무슨날?',
            createdAt: '2022-09-10T00:00:00',
            issueCommentReactionsResponse: [],
          },
        ],
        issueAssignees: {
          issueAssignees: [
            {
              id: 2,
              email: 'whoo@gmail.com',
              nickname: '후',
              profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
            },
            {
              id: 3,
              email: 'ader@gmail.com',
              nickname: '아더',
              profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
            },
          ],
        },
        issueLabels: {
          issueLabels: [
            {
              id: 1,
              title: 'Feature',
              backgroundColorCode: '#d4c5f9',
              description: '기능 개발용 라벨입니다.',
              textColor: 'BLACK',
            },
            {
              id: 4,
              title: 'Question',
              backgroundColorCode: '#d4c501',
              description: '질문용 라벨입니다.',
              textColor: 'WHITE',
            },
          ],
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
        createdAt: '2022-09-04T00:00:00',
        lastModifiedAt: '2022-09-04T00:00:00',
        closed: false,
      },
      {
        id: 5,
        title: '오제제',
        author: {
          id: 2,
          email: 'whoo@gmail.com',
          nickname: '후',
          profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
        },
        comments: [
          {
            id: 6,
            author: {
              id: 2,
              email: 'whoo@gmail.com',
              nickname: '후',
              profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
            },
            content: '또 오셔야겠죠?',
            createdAt: '2022-09-11T00:00:00',
            issueCommentReactionsResponse: [],
          },
          {
            id: 7,
            author: {
              id: 3,
              email: 'ader@gmail.com',
              nickname: '아더',
              profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
            },
            content: '오제제의 안심과 자루우동은 아주 나이스!',
            createdAt: '2022-09-11T05:00:00',
            issueCommentReactionsResponse: [],
          },
        ],
        issueAssignees: {
          issueAssignees: [
            {
              id: 2,
              email: 'whoo@gmail.com',
              nickname: '후',
              profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
            },
            {
              id: 3,
              email: 'ader@gmail.com',
              nickname: '아더',
              profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
            },
          ],
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
        author: {
          id: 2,
          email: 'whoo@gmail.com',
          nickname: '후',
          profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
        },
        comments: [
          {
            id: 8,
            author: {
              id: 2,
              email: 'whoo@gmail.com',
              nickname: '후',
              profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
            },
            content: '또 오셔야겠죠?',
            createdAt: '2022-09-11T00:00:00',
            issueCommentReactionsResponse: [],
          },
          {
            id: 7,
            author: {
              id: 3,
              email: 'ader@gmail.com',
              nickname: '아더',
              profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
            },
            content: '오제제의 안심과 자루우동은 아주 나이스!',
            createdAt: '2022-09-11T05:00:00',
            issueCommentReactionsResponse: [],
          },
        ],
        issueAssignees: {
          issueAssignees: [
            {
              id: 2,
              email: 'whoo@gmail.com',
              nickname: '후',
              profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
            },
          ],
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
        author: {
          id: 2,
          email: 'whoo@gmail.com',
          nickname: '후',
          profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
        },
        comments: [
          {
            id: 9,
            author: {
              id: 2,
              email: 'whoo@gmail.com',
              nickname: '후',
              profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
            },
            content: '두 번가서 결국 끝까지 먹어봤네요.',
            createdAt: '2022-09-11T12:00:00',
            issueCommentReactionsResponse: [],
          },
        ],
        issueAssignees: {
          issueAssignees: [
            {
              id: 3,
              email: 'ader@gmail.com',
              nickname: '아더',
              profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
            },
          ],
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
        author: {
          id: 2,
          email: 'whoo@gmail.com',
          nickname: '후',
          profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
        },
        comments: [
          {
            id: 10,
            author: {
              id: 1,
              email: 'who.ho3ov@gmail.com',
              nickname: 'hoo',
              profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
            },
            content: '다음엔 저도 데려가세요.',
            createdAt: '2022-09-12T00:00:00',
            issueCommentReactionsResponse: [],
          },
          {
            id: 11,
            author: {
              id: 3,
              email: 'ader@gmail.com',
              nickname: '아더',
              profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
            },
            content: '꼭 파티구해서 같이가요!',
            createdAt: '2022-09-12T02:00:00',
            issueCommentReactionsResponse: [],
          },
        ],
        issueAssignees: {
          issueAssignees: [
            {
              id: 2,
              email: 'whoo@gmail.com',
              nickname: '후',
              profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
            },
            {
              id: 3,
              email: 'ader@gmail.com',
              nickname: '아더',
              profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
            },
          ],
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
        author: {
          id: 0,
          email: 'dobby@gmail.com',
          nickname: '도비',
          profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
        },
        comments: [
          {
            id: 12,
            author: {
              id: 0,
              email: 'dobby@gmail.com',
              nickname: '도비',
              profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
            },
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
          issueAssignees: [
            {
              id: 0,
              email: 'dobby@gmail.com',
              nickname: '도비',
              profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
            },
          ],
        },
        issueLabels: {
          issueLabels: [
            {
              id: 2,
              title: 'Docs',
              backgroundColorCode: '#d4c510',
              description: '문서 추가용 라벨입니다.',
              textColor: 'WHITE',
            },
          ],
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
  openIssues: [
    {
      id: 1,
      title: '로우앤슬로우',
      author: {
        id: 2,
        email: 'whoo@gmail.com',
        nickname: '후',
        profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
      },
      comments: [
        {
          id: 1,
          author: {
            id: 2,
            email: 'whoo@gmail.com',
            nickname: '후',
            profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
          },
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
          author: {
            id: 2,
            email: 'ak2j38@gmail.com',
            nickname: 'ader',
            profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
          },
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
          author: {
            id: 2,
            email: 'ak2j38@gmail.com',
            nickname: 'ader',
            profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
          },
          content: '코멘트 배치 테스트',
          createdAt: '2022-09-18T16:30:00.479Z',
          issueCommentReactionsResponse: [],
        },
      ],
      issueAssignees: {
        issueAssignees: [
          {
            id: 2,
            email: 'whoo@gmail.com',
            nickname: '후',
            profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
          },
          {
            id: 3,
            email: 'ader@gmail.com',
            nickname: '아더',
            profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
          },
        ],
      },
      issueLabels: {
        issueLabels: [
          {
            id: 1,
            title: 'Feature',
            backgroundColorCode: '#d4c5f9',
            description: '기능 개발용 라벨입니다.',
            textColor: 'BLACK',
          },
          {
            id: 2,
            title: 'Docs',
            backgroundColorCode: '#d4c510',
            description: '문서 추가용 라벨입니다.',
            textColor: 'WHITE',
          },
          {
            id: 3,
            title: 'Bugs',
            backgroundColorCode: '#d4c505',
            description: '버그 수정용 라벨입니다.',
            textColor: 'BLACK',
          },
          {
            id: 4,
            title: 'Question',
            backgroundColorCode: '#d4c501',
            description: '질문용 라벨입니다.',
            textColor: 'WHITE',
          },
        ],
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
      issueHistories: [
        {
          modifier: {
            id: 2,
            email: 'whoo@gmail.com',
            nickname: '후',
            profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
          },
          modifiedAt: '2022-09-11T16:46:53.479Z',
          action: 'CHANGE_TITLE',
          label: null,
          milestone: null,
          assignee: null,
          previousTitle: '히스토리 테스트',
          changedTitle: '로우앤슬로우',
        },
        {
          modifier: {
            id: 3,
            email: 'ader@gmail.com',
            nickname: '아더',
            profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
          },
          modifiedAt: '2022-09-12T12:46:53.479Z',
          action: 'CLOSE_ISSUE',
          label: null,
          milestone: null,
          assignee: null,
          previousTitle: null,
          changedTitle: null,
        },
        {
          modifier: {
            id: 0,
            email: 'dobby@gmail.com',
            nickname: '도비',
            profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
          },
          modifiedAt: '2022-09-14T14:46:53.479Z',
          action: 'OPEN_ISSUE',
          label: null,
          milestone: null,
          assignee: null,
          previousTitle: null,
          changedTitle: null,
        },
        {
          modifier: {
            id: 0,
            email: 'dobby@gmail.com',
            nickname: '도비',
            profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
          },
          modifiedAt: '2022-09-18T15:46:53.479Z',
          action: 'ADD_LABEL',
          label: {
            createdAt: '2022-09-19T06:46:53.479Z',
            lastModifiedAt: '2022-09-19T06:46:53.479Z',
            id: 4,
            title: 'Question',
            backgroundColorCode: '#d4c501',
            description: '질문용 라벨입니다.',
            textColor: 'WHITE',
          },
          milestone: null,
          assignee: null,
          previousTitle: null,
          changedTitle: null,
        },
        {
          modifier: {
            id: 0,
            email: 'dobby@gmail.com',
            nickname: '도비',
            profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
          },
          modifiedAt: '2022-09-20T16:46:53.479Z',
          action: 'REMOVE_ASSIGNEE',
          label: null,
          milestone: null,
          assignee: {
            createdAt: '2022-09-19T06:46:53.479Z',
            lastModifiedAt: '2022-09-19T06:46:53.479Z',
            id: 0,
            email: 'dobby@gmail.com',
            nickname: '도비',
            profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
          },
          previousTitle: null,
          changedTitle: null,
        },
        {
          modifier: {
            id: 0,
            email: 'dobby@gmail.com',
            nickname: '도비',
            profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
          },
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
      author: {
        id: 2,
        email: 'whoo@gmail.com',
        nickname: '후',
        profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
      },
      comments: [
        {
          id: 3,
          author: {
            id: 3,
            email: 'ader@gmail.com',
            nickname: '아더',
            profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
          },
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
        issueAssignees: [
          {
            id: 2,
            email: 'whoo@gmail.com',
            nickname: '후',
            profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
          },
        ],
      },
      issueLabels: {
        issueLabels: [
          {
            id: 2,
            title: 'Docs',
            backgroundColorCode: '#d4c510',
            description: '문서 추가용 라벨입니다.',
            textColor: 'WHITE',
          },
          {
            id: 4,
            title: 'Question',
            backgroundColorCode: '#d4c501',
            description: '질문용 라벨입니다.',
            textColor: 'WHITE',
          },
        ],
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
      author: {
        id: 2,
        email: 'whoo@gmail.com',
        nickname: '후',
        profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
      },
      comments: [
        {
          id: 4,
          author: {
            id: 2,
            email: 'whoo@gmail.com',
            nickname: '후',
            profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
          },
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
        issueAssignees: [
          {
            id: 2,
            email: 'whoo@gmail.com',
            nickname: '후',
            profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
          },
          {
            id: 3,
            email: 'ader@gmail.com',
            nickname: '아더',
            profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
          },
        ],
      },
      issueLabels: {
        issueLabels: [
          {
            id: 1,
            title: 'Feature',
            backgroundColorCode: '#d4c5f9',
            description: '기능 개발용 라벨입니다.',
            textColor: 'BLACK',
          },
        ],
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
      createdAt: '2022-09-03T00:00:00',
      lastModifiedAt: '2022-09-03T00:00:00',
      closed: false,
    },
    {
      id: 4,
      title: '아타리',
      author: {
        id: 2,
        email: 'whoo@gmail.com',
        nickname: '후',
        profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
      },
      comments: [
        {
          id: 5,
          author: {
            id: 3,
            email: 'ader@gmail.com',
            nickname: '아더',
            profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
          },
          content: '아타리 가는날은 무슨날?',
          createdAt: '2022-09-10T00:00:00',
          issueCommentReactionsResponse: [],
        },
      ],
      issueAssignees: {
        issueAssignees: [
          {
            id: 2,
            email: 'whoo@gmail.com',
            nickname: '후',
            profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
          },
          {
            id: 3,
            email: 'ader@gmail.com',
            nickname: '아더',
            profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
          },
        ],
      },
      issueLabels: {
        issueLabels: [
          {
            id: 1,
            title: 'Feature',
            backgroundColorCode: '#d4c5f9',
            description: '기능 개발용 라벨입니다.',
            textColor: 'BLACK',
          },
          {
            id: 4,
            title: 'Question',
            backgroundColorCode: '#d4c501',
            description: '질문용 라벨입니다.',
            textColor: 'WHITE',
          },
        ],
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
      createdAt: '2022-09-04T00:00:00',
      lastModifiedAt: '2022-09-04T00:00:00',
      closed: false,
    },
    {
      id: 5,
      title: '오제제',
      author: {
        id: 2,
        email: 'whoo@gmail.com',
        nickname: '후',
        profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
      },
      comments: [
        {
          id: 6,
          author: {
            id: 2,
            email: 'whoo@gmail.com',
            nickname: '후',
            profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
          },
          content: '또 오셔야겠죠?',
          createdAt: '2022-09-11T00:00:00',
          issueCommentReactionsResponse: [],
        },
        {
          id: 7,
          author: {
            id: 3,
            email: 'ader@gmail.com',
            nickname: '아더',
            profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
          },
          content: '오제제의 안심과 자루우동은 아주 나이스!',
          createdAt: '2022-09-11T05:00:00',
          issueCommentReactionsResponse: [],
        },
      ],
      issueAssignees: {
        issueAssignees: [
          {
            id: 2,
            email: 'whoo@gmail.com',
            nickname: '후',
            profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
          },
          {
            id: 3,
            email: 'ader@gmail.com',
            nickname: '아더',
            profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
          },
        ],
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
      id: 8,
      title: '한국횟집',
      author: {
        id: 2,
        email: 'whoo@gmail.com',
        nickname: '후',
        profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
      },
      comments: [
        {
          id: 10,
          author: {
            id: 1,
            email: 'who.ho3ov@gmail.com',
            nickname: 'hoo',
            profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
          },
          content: '다음엔 저도 데려가세요.',
          createdAt: '2022-09-12T00:00:00',
          issueCommentReactionsResponse: [],
        },
        {
          id: 11,
          author: {
            id: 3,
            email: 'ader@gmail.com',
            nickname: '아더',
            profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
          },
          content: '꼭 파티구해서 같이가요!',
          createdAt: '2022-09-12T02:00:00',
          issueCommentReactionsResponse: [],
        },
      ],
      issueAssignees: {
        issueAssignees: [
          {
            id: 2,
            email: 'whoo@gmail.com',
            nickname: '후',
            profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
          },
          {
            id: 3,
            email: 'ader@gmail.com',
            nickname: '아더',
            profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
          },
        ],
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
      author: {
        id: 0,
        email: 'dobby@gmail.com',
        nickname: '도비',
        profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
      },
      comments: [
        {
          id: 12,
          author: {
            id: 0,
            email: 'dobby@gmail.com',
            nickname: '도비',
            profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
          },
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
        issueAssignees: [
          {
            id: 0,
            email: 'dobby@gmail.com',
            nickname: '도비',
            profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
          },
        ],
      },
      issueLabels: {
        issueLabels: [
          {
            id: 2,
            title: 'Docs',
            backgroundColorCode: '#d4c510',
            description: '문서 추가용 라벨입니다.',
            textColor: 'WHITE',
          },
        ],
      },
      milestone: null,
      issueHistories: [],
      createdAt: '2022-09-13T11:47:11.372872',
      lastModifiedAt: '2022-09-13T11:47:11.372872',
      closed: false,
    },
  ],
  closedIssues: [
    {
      id: 6,
      title: '오달',
      author: {
        id: 2,
        email: 'whoo@gmail.com',
        nickname: '후',
        profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
      },
      comments: [
        {
          id: 8,
          author: {
            id: 2,
            email: 'whoo@gmail.com',
            nickname: '후',
            profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
          },
          content: '또 오셔야겠죠?',
          createdAt: '2022-09-11T00:00:00',
          issueCommentReactionsResponse: [],
        },
        {
          id: 7,
          author: {
            id: 3,
            email: 'ader@gmail.com',
            nickname: '아더',
            profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
          },
          content: '오제제의 안심과 자루우동은 아주 나이스!',
          createdAt: '2022-09-11T05:00:00',
          issueCommentReactionsResponse: [],
        },
      ],
      issueAssignees: {
        issueAssignees: [
          {
            id: 2,
            email: 'whoo@gmail.com',
            nickname: '후',
            profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
          },
        ],
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
      author: {
        id: 2,
        email: 'whoo@gmail.com',
        nickname: '후',
        profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
      },
      comments: [
        {
          id: 9,
          author: {
            id: 2,
            email: 'whoo@gmail.com',
            nickname: '후',
            profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
          },
          content: '두 번가서 결국 끝까지 먹어봤네요.',
          createdAt: '2022-09-11T12:00:00',
          issueCommentReactionsResponse: [],
        },
      ],
      issueAssignees: {
        issueAssignees: [
          {
            id: 3,
            email: 'ader@gmail.com',
            nickname: '아더',
            profileImage: 'https://avatars.githubusercontent.com/u/29879110?v=4',
          },
        ],
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
  ],
};
