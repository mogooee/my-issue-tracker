/* eslint-disable no-nested-ternary */
import { COLORS } from '@/styles/theme';
import * as S from '@/components/Organisms/IssueHeader/index.styled';

import Icon from '@/components/Atoms/Icon';
import Label from '@/components/Atoms/Label';
import HeaderInline from '@/components/Organisms/IssueHeader/HeaderInline';

import calcTimeForToday from '@/utils/calcForTimeToday';
import { ContentTypes } from '@/api/issue/types';

type IssueHeaderTypes = Pick<ContentTypes, 'id' | 'title' | 'closed' | 'createdAt' | 'lastModifiedAt' | 'author'> & {
  commentNum: number;
};

const IssueHeader = ({ id, closed, title, createdAt, lastModifiedAt, author, commentNum }: IssueHeaderTypes) => {
  const issueState = closed ? '닫혔' : '열렸';
  const timeStamp = createdAt === lastModifiedAt ? createdAt : lastModifiedAt;
  const issueStateSummary = `이 이슈가 ${calcTimeForToday(timeStamp)}에 ${
    author.nickname
  }님에 의해 ${issueState}습니다.`;

  return (
    <S.IssueHeader>
      <HeaderInline id={id} title={title} closed={closed} />
      <S.Info closed={closed}>
        <Label
          icon={<Icon icon="AlertCircle" stroke={closed ? COLORS.SECONDORY.PURPLE : COLORS.PRIMARY.BLUE} />}
          labelStyle="LIGHT"
          backgroundColorCode={closed ? COLORS.SECONDORY.LIGHT_PURPLE : COLORS.PRIMARY.LIGHT_BLUE}
          lineColor={closed ? COLORS.SECONDORY.PURPLE : COLORS.PRIMARY.BLUE}
          title={closed ? '닫힌 이슈' : '열린 이슈'}
        />
        <span>{issueStateSummary}</span>
        <span className="splitLine">∙</span>
        <span>{`코멘트 ${commentNum}개`}</span>
      </S.Info>
    </S.IssueHeader>
  );
};

export default IssueHeader;
