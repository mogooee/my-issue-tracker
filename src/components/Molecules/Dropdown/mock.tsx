import Icon from '@/components/Atoms/Icon';
import { IssueTypes, DropdownTypes, ListPanelTypes, ReactionPanelTypes } from '@/components/Molecules/Dropdown/types';
import { COLORS } from '@/styles/theme';
import { REACTIONS } from '@/components/Molecules/Dropdown/Panel/Reaction/mock';
import { LabelTypes, MilestoneTypes, UserTypes } from '@/api/issue/types';

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
    dataId: 'mentions:@me',
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
    backgroundColorCode: '#007AFF',
    description: '',
    textColor: 'BLACK',
  },
  {
    id: 1,
    title: 'Fix',
    backgroundColorCode: '#FFD1CF',
    description: '',
    textColor: 'BLACK',
  },
  {
    id: 2,
    title: 'refactor',
    backgroundColorCode: '#34C759',
    description: '',
    textColor: 'BLACK',
  },
];

export const USER_LIST: UserTypes[] = [
  {
    id: 0,
    email: 'dobby@gmail.com',
    nickname: '도비',
    profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
  },
  {
    id: 1,
    email: 'dotori@gmail.com',
    nickname: '도토리',
    profileImage: 'https://avatars.githubusercontent.com/u/92701121?v=4',
  },
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
  {
    id: 4,
    email: 'beck@gmail.com',
    nickname: '벡',
    profileImage: 'https://avatars.githubusercontent.com/u/65931336?v=4',
  },
];

export const MILESTONE_LIST: MilestoneTypes[] = [
  {
    id: 0,
    title: '마일스톤 1',
    description: null,
    dueDate: null,
    closed: false,
    openIssueCount: 3,
    closedIssueCount: 7,
  },

  {
    id: 1,
    title: '마일스톤 2',
    description: '닫힌 마일스톤에 대한 설명',
    dueDate: null,
    closed: true,
    openIssueCount: 16,
    closedIssueCount: 13,
  },
  {
    id: 2,
    title: '마일스톤 3',
    description: '열린 마일스톤에 대한 설명',
    dueDate: '2022-08-28',
    closed: false,
    openIssueCount: 5,
    closedIssueCount: 5,
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
    dataId: 'closed',
    title: '선택한 이슈 닫기',
  },
];

export const ASSIGNEE_DROPDOWN_ARGS = (memberList: UserTypes[]): DropdownTypes<ListPanelTypes> => ({
  type: 'List',
  indicatorProps: {
    indicatorLabel: '담당자',
    indicatorStyle: 'STANDARD',
  },
  panelProps: {
    panelId: 'assignee',
    panelTitle: '담당자 필터',
    panelType: 'checkbox',
    panelList: memberList,
    unusedOption: UNUSED_OPTIONS.ASSIGNEE,
  },
});

export const LABEL_DROPDOWN_ARGS = (labelList: LabelTypes[]): DropdownTypes<ListPanelTypes> => ({
  type: 'List',
  indicatorProps: {
    indicatorLabel: '레이블',
    indicatorStyle: 'STANDARD',
  },
  panelProps: {
    panelId: 'label',
    panelTitle: '레이블 필터',
    panelType: 'checkbox',
    panelList: labelList,
    unusedOption: UNUSED_OPTIONS.LABEL,
  },
});

export const MILESTONE_DROPDOWN_ARGS = (milestoneList: MilestoneTypes[]): DropdownTypes<ListPanelTypes> => ({
  type: 'List',
  indicatorProps: {
    indicatorLabel: '마일스톤',
    indicatorStyle: 'STANDARD',
  },
  panelProps: {
    panelId: 'milestone',
    panelTitle: '마일스톤 필터',
    panelType: 'checkbox',
    panelList: milestoneList,
    unusedOption: UNUSED_OPTIONS.MILESTONE,
  },
});

export const AUTHOR_DROPDOWN_ARGS = (memberList: UserTypes[]): DropdownTypes<ListPanelTypes> => ({
  type: 'List',
  indicatorProps: {
    indicatorLabel: '작성자',
    indicatorStyle: 'STANDARD',
  },
  panelProps: {
    panelId: 'author',
    panelTitle: '작성자 필터',
    panelType: 'checkbox',
    panelList: memberList,
  },
});

export const OPEN_CLOSE_DROPDOWN_ARGS = (
  handleOnClick: (target: HTMLInputElement) => void,
): DropdownTypes<ListPanelTypes> => ({
  type: 'List',
  indicatorProps: {
    indicatorLabel: '상태 수정',
    indicatorStyle: 'STANDARD',
  },
  panelProps: {
    panelId: 'state',
    panelTitle: '상태 변경',
    panelType: 'radio',
    panelList: OPEN_CLOSE_STATE_LIST,
    handleOnClick,
  },
});

export const REACTION_ARGS: DropdownTypes<ReactionPanelTypes> = {
  type: 'Reaction',
  indicatorProps: {
    indicatorLabel: '',
    indicatorStyle: 'ICON',
    indicatorIcon: <Icon icon="Smile" stroke={COLORS.LABEL} />,
  },
  panelProps: {
    reactions: REACTIONS,
    usedEmojis: [],
    issueId: 1,
    commentId: 1,
    memberId: 123456789,
  },
};

export const SIDEBAR_ARGS: DropdownTypes<ListPanelTypes> = {
  type: 'List',
  indicatorProps: {
    indicatorLabel: '마일스톤',
    indicatorStyle: 'SIDEBAR',
  },
  panelProps: {
    panelId: 'milestone',
    panelTitle: '마일스톤 필터',
    panelType: 'checkbox',
    panelList: MILESTONE_LIST,
    unusedOption: UNUSED_OPTIONS.MILESTONE,
  },
};

export const FILTER_TABS_INFO = [
  ASSIGNEE_DROPDOWN_ARGS,
  LABEL_DROPDOWN_ARGS,
  MILESTONE_DROPDOWN_ARGS,
  AUTHOR_DROPDOWN_ARGS,
];
