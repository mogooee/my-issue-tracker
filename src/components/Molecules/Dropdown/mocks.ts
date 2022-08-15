import { IssueTypes, LabelTypes, UserTypes, DropdownTypes } from '@/components/Molecules/Dropdown/types';

export const UNUSED_OPTIONS = {
  ASSIGNEE: {
    dataId: 'no:assignee',
    title: '담당자가 없는 이슈',
  },
  LABEL: {
    dataId: 'no:label',
    title: '레이블이 없는 이슈',
  },
  MILESTONE: {
    dataId: 'no:milestone',
    title: '마일스톤이 없는 이슈',
  },
};

export const ISSUE_FILTER_LIST: IssueTypes[] = [
  {
    id: 0,
    dataId: 'is:open',
    title: '열린 이슈',
  },
  {
    id: 1,
    dataId: 'author:@me',
    title: '내가 작성한 이슈',
  },
  {
    id: 2,
    dataId: 'assignee:@me',
    title: '나에게 할당된 이슈',
  },
  {
    id: 3,
    dataId: 'mentions:@me ',
    title: '내가 댓글을 남긴 이슈',
  },
  {
    id: 4,
    dataId: 'is:closed',
    title: '닫힌 이슈',
  },
];

export const LABEL_LIST: LabelTypes[] = [
  {
    id: 0,
    title: 'feature',
    backgroundColor: '#007AFF',
  },
  {
    id: 1,
    title: 'Fix',
    backgroundColor: '#FFD1CF',
  },
  {
    id: 2,
    title: 'refactor',
    backgroundColor: '#34C759',
  },
];

export const USER_LIST: UserTypes[] = [
  {
    id: 0,
    loginId: '도비',
    profileImageUrl: 'https://avatars.githubusercontent.com/u/85747667?v=4',
  },
  {
    id: 1,
    loginId: '도톨',
    profileImageUrl: 'https://avatars.githubusercontent.com/u/92701121?v=4',
  },
  {
    id: 2,
    loginId: '후',
    profileImageUrl: 'https://avatars.githubusercontent.com/u/68011320?v=4',
  },
  {
    id: 3,
    loginId: '아더',
    profileImageUrl: 'https://avatars.githubusercontent.com/u/29879110?v=4',
  },
  {
    id: 4,
    loginId: '벡',
    profileImageUrl: 'https://avatars.githubusercontent.com/u/65931336?v=4',
  },
];

const OPEN_CLOSE_STATE_LIST: IssueTypes[] = [
  {
    id: 0,
    dataId: 'open',
    title: '선택한 이슈 열기',
  },
  {
    id: 1,
    dataId: 'close',
    title: '선택한 이슈 닫기',
  },
];

export const ASSIGNEE_DROPDOWN_ARGS: DropdownTypes = {
  indicatorLabel: '담당자',
  indicatorStyle: 'STANDARD',
  panelTitle: '담당자 필터',
  panelType: 'radio',
  panelList: USER_LIST,
  unusedOption: UNUSED_OPTIONS.ASSIGNEE,
};

export const LABEL_DROPDOWN_ARGS: DropdownTypes = {
  indicatorLabel: '레이블',
  indicatorStyle: 'STANDARD',
  panelTitle: '레이블 필터',
  panelType: 'checkbox',
  panelList: LABEL_LIST,
  unusedOption: UNUSED_OPTIONS.LABEL,
};

export const MILESTONE_DROPDOWN_ARGS: DropdownTypes = {
  indicatorLabel: '마일스톤',
  indicatorStyle: 'STANDARD',
  panelTitle: '마일스톤 필터',
  panelType: 'checkbox',
  panelList: LABEL_LIST,
  unusedOption: UNUSED_OPTIONS.MILESTONE,
};

export const AUTHER_DROPDOWN_ARGS: DropdownTypes = {
  indicatorLabel: '작성자',
  indicatorStyle: 'STANDARD',
  panelTitle: '작성자 필터',
  panelType: 'radio',
  panelList: USER_LIST,
};

export const OPEN_CLOSE_DROPDOWN_ARGS: DropdownTypes = {
  indicatorLabel: '상태 수정',
  indicatorStyle: 'STANDARD',
  panelTitle: '상태 변경',
  panelType: 'checkbox',
  panelList: OPEN_CLOSE_STATE_LIST,
};

export const FILTER_TABS_INFO = [
  ASSIGNEE_DROPDOWN_ARGS,
  LABEL_DROPDOWN_ARGS,
  MILESTONE_DROPDOWN_ARGS,
  AUTHER_DROPDOWN_ARGS,
];
