import { ContentTypes } from '@/api/issue/types';
import Label from '@/components/Atoms/Label';
import UserImage from '@/components/Atoms/UserImage';
import * as S from '@/pages/Private/IssueDetail/IssueInfo/index.styles';

const IssueInfo = ({ issue }: { issue: ContentTypes }) => {
  const { issueAssignees, issueLabels, milestone } = issue;
  const isNotExistInfo = !issueAssignees.issueAssignees.length && !issueLabels.issueLabels.length && !milestone;

  return (
    <>
      <S.IssueInfo isNotExistInfo={isNotExistInfo}>
        {!!issueAssignees.issueAssignees.length && (
          <>
            <S.IssueInfoType>Assignees</S.IssueInfoType>
            <S.ImagesWrapper>
              {issueAssignees.issueAssignees.map((assinees) => (
                <UserImage {...assinees} imgSize="SMALL" key={assinees.id} />
              ))}
            </S.ImagesWrapper>
          </>
        )}
        {!!issueLabels.issueLabels.length && (
          <>
            <S.IssueInfoType>Labels</S.IssueInfoType>
            <S.LabelWrapper>
              {issueLabels.issueLabels.map((label) => (
                <Label {...label} key={label.id} />
              ))}
            </S.LabelWrapper>
          </>
        )}
        {!!milestone && (
          <>
            <S.IssueInfoType>Milestone</S.IssueInfoType>
            <span className="milestone__title">{milestone.title}</span>
          </>
        )}
      </S.IssueInfo>
      {!isNotExistInfo && <S.IssueInfoDivider />}
    </>
  );
};

export default IssueInfo;
