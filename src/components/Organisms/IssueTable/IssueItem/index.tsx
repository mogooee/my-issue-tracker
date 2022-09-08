/* eslint-disable react/prop-types */
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import * as S from '@/components/Organisms/IssueTable/IssueItem/index.styles';
import { COLORS } from '@/styles/theme';

import CheckBox from '@/components/Atoms/CheckBox';
import Icon from '@/components/Atoms/Icon';
import Label from '@/components/Atoms/Label';
import UserImage from '@/components/Atoms/UserImage';

import { CheckState } from '@/stores/checkBox';
import calcTimeForToday from '@/utils/calcForTimeToday';
import { ContentTypes } from '@/api/issue/types';

const IssueItem = (issueInfo: ContentTypes) => {
  const { id, title, closed, issueLabels, author, issueAssignees, createdAt, milestone } = issueInfo;
  const checkState = useRecoilValue(CheckState);
  const navigate = useNavigate();

  const issueLink = `/issues/${id}`;
  const milestoneLink = `/milestone/${id}`;
  const issueSummary = `이 이슈가 ${calcTimeForToday(createdAt)}, ${author.nickname}님에 의해 작성되었습니다`;

  const handleLabelClick = (filterdLabelTitle: string) => {
    navigate(`/issues?q=label%3A"${filterdLabelTitle}"`);
  };

  return (
    <S.Template>
      <CheckBox id={id} type="child" checked={checkState.child[id]} />
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
          {issueLabels.issueLabels.map((labelProps) => (
            <Label key={labelProps.title} {...labelProps} onClick={() => handleLabelClick(labelProps.title)} />
          ))}
        </S.IssueTitle>
        <S.IssueContent>
          <span>{`#${id}`}</span>
          <span className="summary">{issueSummary}</span>
          <Link className="milestone" to={milestoneLink}>
            <>
              <Icon icon="Milestone" fill={COLORS.SECONDORY.PURPLE} />
              {milestone.title}
            </>
          </Link>
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
