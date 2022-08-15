import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import CheckBox from '@/components/Atoms/CheckBox';
import Icon from '@/components/Atoms/Icon';
import Label, { LabelTypes } from '@/components/Atoms/Label';
import UserImage, { UserImageTypes } from '@/components/Atoms/UserImage';

import * as S from '@/components/Molecules/IssueItem/index.styles';

import { CheckState } from '@/stores/checkBox';
import calcTimeForToday from '@/utils/calcForTimeToday';

export interface IssueInfoTypes {
  id: number;
  title: string;
  writer: UserImageTypes;
  createdAt: string;
  labels: LabelTypes[];
  milestone: string;
  assignees: UserImageTypes[];
}

interface IssueItemTypes {
  issueInfo: IssueInfoTypes;
}

const IssueItem = ({ issueInfo }: IssueItemTypes) => {
  const { id, title, labels, writer, assignees, createdAt, milestone } = issueInfo;
  const checkState = useRecoilValue(CheckState);

  return (
    <S.StyledIssueItem>
      <CheckBox id={id} type="child" checked={checkState.child[id]} />
      <S.StyledIssue>
        <S.IssueTitle>
          <Icon fill="#C7EBFF" icon="AlertCircle" stroke="#007AFF" />
          <Link className="title" to={`/issues/${id}`}>
            {title}
          </Link>
          {labels.map(({ backgroundColor, title: labelTitle }) => (
            <Label key={title} backgroundColor={backgroundColor} title={labelTitle} />
          ))}
        </S.IssueTitle>
        <S.IssueContent>
          <span>{`#${id}`}</span>
          <span className="timeStamp">{`이 이슈가 ${calcTimeForToday(createdAt)}, ${
            writer.nickname
          }님에 의해 작성되었습니다`}</span>
          <Link className="milestone" to={`/milestone/${id}`}>
            <Icon icon="Milestone" fill="#0025E7" />
            {milestone}
          </Link>
        </S.IssueContent>
      </S.StyledIssue>
      <S.Assignee>
        {assignees.map(({ id: assigneeId, nickname, profileImage }) => (
          <UserImage key={id} id={assigneeId} nickname={nickname} imgSize="SMALL" profileImage={profileImage} />
        ))}
      </S.Assignee>
    </S.StyledIssueItem>
  );
};

export default IssueItem;
