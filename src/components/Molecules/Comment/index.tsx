import * as S from '@/components/Molecules/Comment/index.styled';

import Label from '@/components/Atoms/Label';
import Icon from '@/components/Atoms/Icon';
import Button from '@/components/Atoms/Button';
import Table from '@/components/Molecules/Table';
import Dropdown from '@/components/Molecules/Dropdown';
import ReactionContainer from '@/components/Molecules/Comment/ReactionContainer';
import HeaderTab from '@/components/Molecules/Comment/HeaderTab';

import calcTimeForToday from '@/utils/calcForTimeToday';
import { CommentsTypes, ReactionResponseTypes } from '@/api/issue/types';
import { BUTTON_PROPS, TABLE_ITEM_BUTTON_INFO } from '@/components/Atoms/Button/options';
import { AUTHOR_LABEL_PROPS, EDIT_BUTTON_PROPS } from '@/components/Molecules/Comment/constants';

interface CommentTypes {
  issueId: number;
  isAuthor: boolean;
  comment: CommentsTypes;
}

interface ReactorsTypes {
  reactionId: number;
  memberId: number;
  nickname: string;
}

export interface UsedEmojisTypes {
  emoji: string;
  reactors: ReactorsTypes[];
}

export const definedUsedEmojis = (issueCommentReactionsResponse: ReactionResponseTypes[] | []) => {
  const usedEmojis: UsedEmojisTypes[] = [];

  issueCommentReactionsResponse.forEach(({ id: reactionId, emoji, issueCommentReactorResponse }) => {
    const { id: memberId, nickname } = issueCommentReactorResponse;

    const isExisted = usedEmojis.find((used) => used.emoji === emoji);

    if (isExisted) {
      isExisted.reactors.push({ reactionId, memberId, nickname });
    } else {
      const add: UsedEmojisTypes = { emoji, reactors: [{ reactionId, memberId, nickname }] };
      usedEmojis.push(add);
    }
  });

  return usedEmojis;
};

const Comment = ({ issueId, isAuthor, comment }: CommentTypes): JSX.Element => {
  const { reactions } = useFetchReaction();

  const { id: commentId, author, content, createdAt, issueCommentReactionsResponse } = comment;
  const hasReaction = issueCommentReactionsResponse.length > 0;
  const usedEmojis = definedUsedEmojis(issueCommentReactionsResponse);

  return (
    <Table
      header={
        <S.CommentHeader>
          <span className="author">{author.nickname}</span>
          <span className="timeStamp">{calcTimeForToday(createdAt)}</span>
          <S.CommentTab>
            {isAuthor && (
              <>
                <Label {...AUTHOR_LABEL_PROPS} />
                <Button {...EDIT_BUTTON_PROPS} />
                <Button {...TABLE_ITEM_BUTTON_INFO.DELETE} />
              </>
            )}
            <Dropdown
              indicatorProps={{
                indicatorStyle: 'ICON',
                indicatorLabel: '',
                indicatorIcon: <Icon icon="Smile" stroke={COLORS.LABEL} />,
              }}
              type="Reaction"
              panelProps={{ issueId, commentId, memberId, reactions: reactions!, usedEmojis }}
            />
          </S.CommentTab>
        </S.CommentHeader>
      }
      item={[
        <S.CommentContent>
          <span>{content}</span>
          {hasReaction && (
            <ReactionContainer reactions={reactions!} usedEmojis={usedEmojis} issueId={issueId} commentId={commentId} />
          )}
        </S.CommentContent>,
      ]}
    />
  );
};
export default Comment;
