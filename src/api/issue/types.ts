export interface UserTypes {
  id: number;
  email: string;
  nickname: string;
  profileImage: string;
}

export interface LabelTypes {
  id: number;
  title: string;
  backgroundColorCode: string;
  description: string;
  textColor: 'BLACK' | 'WHITE';
}

export interface MilestoneTypes {
  id: number;
  title: string;
  description: string | null;
  dueDate: string | null;
  openIssueCount: number;
  closedIssueCount: number;
  closed: boolean;
}

export interface IssueLabelsTypes {
  issueLabels: LabelTypes[];
}

export interface IssueAssigneesTypes {
  issueAssignees: UserTypes[];
}

export interface ReactorResponseTypes {
  id: number;
  nickname: string;
}

export interface ReactionResponseTypes {
  id: number;
  emoji: string;
  issueCommentReactorResponse: ReactorResponseTypes;
}

export interface CommentsTypes {
  id: number;
  author: UserTypes;
  content: string;
  createdAt: string;
  issueCommentReactionsResponse: ReactionResponseTypes[] | [];
}

interface HistoryTime {
  createdAt: string;
  lastModifiedAt: string;
}

type HistoryMilestoneTypes = Omit<MilestoneTypes, 'openIssueCount' | 'closedIssueCount'>;

export type HistoryActionTypes =
  | 'CHANGE_TITLE'
  | 'OPEN_ISSUE'
  | 'CLOSE_ISSUE'
  | 'ADD_LABEL'
  | 'REMOVE_LABEL'
  | 'ADD_ASSIGNEE'
  | 'REMOVE_ASSIGNEE'
  | 'ADD_MILESTONE'
  | 'REMOVE_MILESTONE';

export interface IssueHistoryTypes {
  modifier: UserTypes;
  modifiedAt: string;
  action: HistoryActionTypes;
  label: (HistoryTime & LabelTypes) | null;
  milestone: (HistoryTime & HistoryMilestoneTypes) | null;
  assignee: (HistoryTime & UserTypes) | null;
  previousTitle: string | null;
  changedTitle: string | null;
}

export interface ContentTypes {
  id: number;
  title: string;
  closed: boolean;
  createdAt: string;
  lastModifiedAt: string;
  author: UserTypes;
  comments: CommentsTypes[];
  issueAssignees: IssueAssigneesTypes;
  issueLabels: IssueLabelsTypes;
  milestone: MilestoneTypes | null;
  issueHistories: IssueHistoryTypes[];
}

export type IssueTypes = {
  content: ContentTypes[];
};

interface SortTypes {
  unsorted: boolean;
  empty: boolean;
  sorted: boolean;
}

interface PageableTypes {
  sort: SortTypes;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface PageTypes {
  pageable: PageableTypes;
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: SortTypes;
  first: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  empty: boolean;
}

export type IssuesTypes = {
  openIssueCount: number;
  closedIssueCount: number;
  issues: IssueTypes & PageTypes;
};

export const isIssueCommentsTypes = (props: CommentsTypes | IssueHistoryTypes): props is CommentsTypes =>
  (props as CommentsTypes).content !== undefined;

export const isIssueHistoryTypes = (props: CommentsTypes | IssueHistoryTypes): props is IssueHistoryTypes =>
  (props as IssueHistoryTypes).action !== undefined;
