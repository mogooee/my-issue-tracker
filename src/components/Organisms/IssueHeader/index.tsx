/* eslint-disable no-nested-ternary */
import { COLORS } from '@/styles/theme';
import * as S from '@/components/Organisms/IssueHeader/index.styles';

import Icon from '@/components/Atoms/Icon';
import Label from '@/components/Atoms/Label';
import HeaderInline from '@/components/Organisms/IssueHeader/HeaderInline';

import calcTimeForToday from '@/utils/calcForTimeToday';
import { ContentTypes } from '@/api/issue/types';

type IssueHeaderTypes = Pick<ContentTypes, 'id' | 'title' | 'closed' | 'createdAt' | 'author'> & {
  commentNum: number;
  isAuthor: boolean;
};

const IssueHeader = ({ id, closed, title, createdAt, author, commentNum, isAuthor }: IssueHeaderTypes) => {
  const issueOpenSummary = `이 이슈가 ${calcTimeForToday(createdAt)}에 ${author.nickname}님에 의해 ${
    closed ? '닫혔습니다' : '열렸습니다.'
  }`;

  return (
    <S.IssueHeader>
      <HeaderInline isAuthor={isAuthor} id={id} title={title} closed={closed} />
      <S.Info closed={closed}>
        <Label
          icon={<Icon icon="AlertCircle" stroke={closed ? COLORS.SECONDORY.PURPLE : COLORS.PRIMARY.BLUE} />}
          labelStyle="LIGHT"
          backgroundColorCode={closed ? COLORS.SECONDORY.LIGHT_PURPLE : COLORS.PRIMARY.LIGHT_BLUE}
          lineColor={closed ? COLORS.SECONDORY.PURPLE : COLORS.PRIMARY.BLUE}
          title={closed ? '닫힌 이슈' : '열린 이슈'}
        />
        <S.InfoText>
          <span>{issueOpenSummary}</span>
          <span className="splitLine">∙</span>
          <span>{`코멘트 ${commentNum}개`}</span>
        </S.InfoText>
      </S.Info>
    </S.IssueHeader>
  );
};

export default IssueHeader;
