import { COLORS } from '@/styles/theme';

const DEFAULT_COLORS = COLORS.PRIMARY.BLUE;

export const issueListData = [
  {
    id: 0,
    title: '이슈 제목',
    labels: [{ title: 'documentation', backgroundColor: DEFAULT_COLORS }],
    writer: {
      id: 1,
      nickname: 'dotori',
      profileImage: 'https://avatars.githubusercontent.com/u/92701121?v=4',
    },
    assignees: [
      {
        id: 1,
        nickname: 'dotori',
        profileImage: 'https://avatars.githubusercontent.com/u/92701121?v=4',
      },
      {
        id: 2,
        nickname: 'dobby',
        profileImage: 'https://avatars.githubusercontent.com/u/85747667?s=96&v=4',
      },
      {
        id: 3,
        nickname: 'dobby',
        profileImage: 'https://avatars.githubusercontent.com/u/85747667?s=96&v=4',
      },
      {
        id: 4,
        nickname: 'dobby',
        profileImage: 'https://avatars.githubusercontent.com/u/85747667?s=96&v=4',
      },
    ],
    createdAt: '2022-06-20T01:05:45.880Z',
    milestone: '마스터즈 코스',
  },
  {
    id: 1,
    title: '이슈 제목',
    labels: [{ title: 'documentation', backgroundColor: DEFAULT_COLORS }],
    writer: {
      id: 1,
      nickname: 'dotori',
      profileImage: 'https://avatars.githubusercontent.com/u/92701121?v=4',
    },
    assignees: [
      {
        id: 1,
        nickname: 'dotori',
        profileImage: 'https://avatars.githubusercontent.com/u/92701121?v=4',
      },
      {
        id: 2,
        nickname: 'dobby',
        profileImage: 'https://avatars.githubusercontent.com/u/85747667?s=96&v=4',
      },
      {
        id: 3,
        nickname: 'dobby',
        profileImage: 'https://avatars.githubusercontent.com/u/85747667?s=96&v=4',
      },
      {
        id: 4,
        nickname: 'dobby',
        profileImage: 'https://avatars.githubusercontent.com/u/85747667?s=96&v=4',
      },
    ],
    createdAt: '2022-06-20T01:05:45.880Z',
    milestone: '마스터즈 코스',
  },
];
