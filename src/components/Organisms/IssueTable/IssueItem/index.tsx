/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import * as S from '@/components/Organisms/IssueTable/IssueItem/index.styles';
import { COLORS } from '@/styles/theme';

import CheckBox from '@/components/Atoms/CheckBox';
import Icon from '@/components/Atoms/Icon';
import Label from '@/components/Atoms/Label';
import UserImage from '@/components/Atoms/UserImage';

import { CheckState } from '@/stores/checkBox';
import calcTimeForToday from '@/utils/calcForTimeToday';
import { ContentTypes } from '@/api/issue/types';
import { FilterState } from '@/stores/filter';

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
  const setFilterState = useSetRecoilState(FilterState);

  const issueLink = `/issues/${id}`;
  const milestoneLink = `/milestone/${id}`;

  const issueState = closed ? '닫혔습니다' : '열렸습니다';
  const closeIssueHistories = issueHistories.filter((history) => history.action === 'CLOSE_ISSUE');

  const lastCloseIssueHistory = closeIssueHistories.length
    ? closeIssueHistories[closeIssueHistories.length - 1].modifiedAt
    : lastModifiedAt;

  const timeStamp = closed ? lastCloseIssueHistory : createdAt;
  const issueSummary = `이 이슈가 ${calcTimeForToday(timeStamp)}, ${author.nickname}님에 의해 ${issueState}`;

  const isChecked = !!checkState.child.find((checkboxId) => checkboxId === id);

  const handleLabelClick = (filterdLabelTitle: string) => {
    setFilterState((prev) => ({ ...prev, label: [filterdLabelTitle] }));
  };

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
              <Label key={labelProps.title} {...labelProps} onClick={() => handleLabelClick(labelProps.title)} />
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
