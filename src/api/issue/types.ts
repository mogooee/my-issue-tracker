export interface ReactorResponseTypes {
  id: number;
  nickname: string;
}

export interface ReactionResponseTypes {
  id: number;
  emoji: string;
  issueCommentReactorResponse: ReactorResponseTypes;
}

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

export interface CommentsTypes {
  id: number;
  author: UserTypes;
  content: string;
  createdAt: string;
  issueCommentReactionsResponse: ReactionResponseTypes[] | [];
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
  milestone: MilestoneTypes;
  issueHistories: [];
}

interface SortTypes {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

interface PageableTypes {
  sort: SortTypes;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

interface PageTypes {
  pageable: PageableTypes;
  sort: SortTypes;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}

export type IssueTypes = {
  content: ContentTypes[];
} & PageTypes;

export type IssuesTypes = {
  openIssueCount: number;
  openIssues: IssueTypes;
  closedIssueCount: number;
  closedIssues: IssueTypes;
} & PageTypes;
