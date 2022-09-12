/* eslint-disable react/destructuring-assignment */
import { useRecoilValue } from 'recoil';
import useFetchReaction from '@/api/issue/useFetchReaction';
import { LoginUserInfoState } from '@/stores/loginUserInfo';

import * as S from '@/components/Molecules/Dropdown/Panel/Reaction/index.styled';

import Button from '@/components/Atoms/Button';

import replaceUnicodeWithIcon from '@/utils/replaceUnicodeWithIcon';
import { ReactionPanelTypes } from '@/components/Molecules/Dropdown/types';

const ReactionPanel = ({ reactions, usedEmojis, issueId, commentId, memberId }: ReactionPanelTypes) => {
  const userInfo = useRecoilValue(LoginUserInfoState);
  const { useAddIssueCommentReaction, useDeleteIssueCommentReaction } = useFetchReaction();
  const { mutate: addIssueCommentReaction } = useAddIssueCommentReaction(issueId);
  const { mutate: deleteIssueCommentReaction } = useDeleteIssueCommentReaction(issueId);

  return (
    <S.ReactionPanel>
      <ul>
        {reactions.map(({ name, unicode }) => {
          const reactors = usedEmojis?.find(({ emoji }) => emoji === unicode)?.reactors!;
          const isUsed = reactors?.find((reactor) => reactor.memberId === memberId);
          const emojiIcon = replaceUnicodeWithIcon(unicode);

          const handleReactionPanelClick = () => {
            const { name: emojiName } = reactions.find((e) => unicode === e.unicode)!;

            if (isUsed) {
              const reactionId = reactors.find((reactor) => reactor.memberId === userInfo.id)?.reactionId!;
              deleteIssueCommentReaction({ issueId, commentId, memberId, reactionId });
            } else {
              addIssueCommentReaction({ issueId, commentId, memberId, emojiName });
            }
          };

          return (
            <S.ReactionList key={name} isUsed={!!isUsed}>
              <Button
                buttonStyle="NO_BORDER"
                label={emojiIcon}
                size="MEDIUM"
                handleOnClick={handleReactionPanelClick}
              />
            </S.ReactionList>
          );
        })}
      </ul>
    </S.ReactionPanel>
  );
};

export default ReactionPanel;
