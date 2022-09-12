import * as S from '@/components/Molecules/Comment/ReactionContainer/index.styled';
import { COLORS } from '@/styles/theme';

import Icon from '@/components/Atoms/Icon';
import Label from '@/components/Atoms/Label';
import Dropdown from '@/components/Molecules/Dropdown';
import { UsedEmojisTypes } from '@/components/Molecules/Comment';

import replaceUnicodeWithIcon from '@/utils/replaceUnicodeWithIcon';
import { ReactionTypes } from '@/api/issue/reaction';
import useFetchReaction from '@/api/issue/useFetchReaction';

export interface ReactionContainerTypes {
  reactions: ReactionTypes[];
  usedEmojis: UsedEmojisTypes[];
  issueId: number;
  commentId: number;
  memberId: number;
}

const ReactionContainer = ({ reactions, usedEmojis, issueId, commentId, memberId }: ReactionContainerTypes) => {
  const { useAddIssueCommentReaction, useDeleteIssueCommentReaction } = useFetchReaction();
  const { mutate: addIssueCommentReaction } = useAddIssueCommentReaction(issueId);
  const { mutate: deleteIssueCommentReaction } = useDeleteIssueCommentReaction(issueId);

  return (
    <S.ReactionTab>
      <Dropdown
        indicatorProps={{
          indicatorStyle: 'ICON',
          indicatorLabel: '',
          indicatorIcon: <Icon icon="Smile" stroke={COLORS.LABEL} />,
        }}
        type="Reaction"
        panelProps={{
          reactions,
          usedEmojis,
          issueId,
          commentId,
          memberId,
        }}
      />
      {usedEmojis.map(({ emoji, reactors }) => {
        const { name: emojiName } = reactions.find(({ unicode }) => unicode === emoji)!;
        const isUsed = reactors.find((reactor) => reactor.memberId === memberId);
        const emojiIcon = replaceUnicodeWithIcon(emoji);

        const handleReactionContainerClick = () => {
          if (isUsed) {
            const reactionId = reactors.find((reactor) => reactor.memberId === memberId)?.reactionId!;
            deleteIssueCommentReaction({ issueId, commentId, memberId, reactionId });
          } else {
            addIssueCommentReaction({ issueId, commentId, memberId, emojiName });
          }
        };

        return (
          <S.Reaction key={emoji} nickname={reactors.map(({ nickname }) => nickname)} emoji={emojiName}>
            <Label
              labelStyle="LIGHT"
              backgroundColorCode={isUsed ? COLORS.PRIMARY.LIGHT_BLUE : COLORS.BACKGROUND}
              lineColor={isUsed ? COLORS.PRIMARY.BLUE : COLORS.LABEL}
              textColor="BLACK"
              title={`${emojiIcon} ${reactors.length}`}
              onClick={handleReactionContainerClick}
            />
          </S.Reaction>
        );
      })}
    </S.ReactionTab>
  );
};

export default ReactionContainer;
