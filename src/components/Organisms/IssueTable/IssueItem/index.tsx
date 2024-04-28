/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import * as S from '@/components/Organisms/IssueTable/IssueItem/index.styles';
import { COLORS } from '@/styles/theme';

import CheckBox from '@/components/Atoms/CheckBox';
import Icon from '@/components/Atoms/Icon';
import Label from '@/components/Atoms/Label';
import UserImage from '@/components/Atoms/UserImage';

import { CheckState } from '@/stores/checkBox';
import { ContentTypes } from '@/api/issue/types';
import useFilter from '@/hooks/useFilter';
import { getIssueSummary } from '../stateHelper';

const IssueItem = (issueInfo: ContentTypes) => {
  const {
    id,
    title,
    closed,
    issueLabels,
    author,
    issueAssignees,
    createdAt,
    lastModifiedAt,
    milestone,
    issueHistories,
  } = issueInfo;

  const checkState = useRecoilValue(CheckState);
  const { changeNotEngFilter } = useFilter();

  const issueLink = `/issues/${id}`;
  const milestoneLink = `/milestone/${id}`;

  const issueSummary = getIssueSummary(issueHistories, author.nickname, createdAt, lastModifiedAt);

  const isChecked = !!checkState.child.find((checkboxId) => checkboxId === id);

  return (
    <S.Template>
      <CheckBox id={id} type="child" checked={isChecked} />
      <div>
        <S.IssueTitle>
          <Icon
            fill={closed ? COLORS.SECONDORY.LIGHT_PURPLE : COLORS.PRIMARY.LIGHT_BLUE}
            icon="AlertCircle"
            stroke={closed ? COLORS.SECONDORY.PURPLE : COLORS.PRIMARY.BLUE}
          />
          <Link className="title" to={issueLink}>
            {title}
          </Link>
          <S.Labels>
            {issueLabels.issueLabels.map((labelProps) => (
              <Link key={labelProps.title} to={`/issues?page=0&q=label%3A${changeNotEngFilter(labelProps.title)}`}>
                <Label {...labelProps} />
              </Link>
            ))}
          </S.Labels>
        </S.IssueTitle>
        <S.IssueContent>
          <span>{`#${id}`}</span>
          <span className="summary">{issueSummary}</span>
          {milestone && (
            <Link className="milestone" to={milestoneLink}>
              <>
                <Icon icon="Milestone" fill={COLORS.SECONDORY.PURPLE} />
                {milestone.title}
              </>
            </Link>
          )}
        </S.IssueContent>
      </div>
      <S.Assignee>
        {issueAssignees.issueAssignees.map((assigneesProps) => (
          <UserImage key={assigneesProps.id} imgSize="SMALL" {...assigneesProps} />
        ))}
      </S.Assignee>
    </S.Template>
  );
};

export default IssueItem;
