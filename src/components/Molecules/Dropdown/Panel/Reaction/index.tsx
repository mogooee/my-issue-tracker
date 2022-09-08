/* eslint-disable react/destructuring-assignment */
import { useRecoilValue } from 'recoil';

import * as S from '@/components/Molecules/Dropdown/Panel/Reaction/index.styled';

import Button from '@/components/Atoms/Button';

import replaceUnicodeWithIcon from '@/utils/replaceUnicodeWithIcon';
import { ReactionPanelTypes } from '@/components/Molecules/Dropdown/types';
import { LoginUserInfoState } from '@/stores/loginUserInfo';

interface HandleReactionTypes {
  type: 'ADD' | 'REMOVE';
  memberId: number;
  reactionId: number;
  emojiName: string;
}

const ReactionPanel = ({ reactions, usedEmojis, issueId, commentId }: ReactionPanelTypes) => {
  const userInfo = useRecoilValue(LoginUserInfoState);

  return (
    <S.ReactionPanel>
      <ul>
        {reactions.map(({ name, unicode }) => {
          const reactors = usedEmojis?.find(({ emoji }) => emoji === unicode)?.reactors!;
          const isUsed = reactors?.find(({ memberId }) => memberId === userInfo.id);
          const emojiIcon = unicode.split(' ').reduce((acc, cur) => acc + replaceUnicodeWithIcon(cur), '');

          const handleReaction = ({ type, memberId, reactionId, emojiName }: HandleReactionTypes) => {
            const router = type === 'ADD' ? emojiName : reactionId;
            return `/api/isssue/${issueId}/comments/${commentId}/reactions/${router}?memberId=${memberId}`;
          };

          return (
            <S.ReactionList key={name} isUsed={!!isUsed}>
              <Button
                buttonStyle="NO_BORDER"
                label={emojiIcon}
                size="MEDIUM"
                handleOnClick={() => {
                  const type = isUsed ? 'ADD' : 'REMOVE';
                  const reactionId = reactors.find(({ memberId }) => memberId === userInfo.id)?.reactionId!;
                  const { name: emojiName } = reactions.find((e) => unicode === e.unicode)!;

                  handleReaction({ type, memberId: userInfo.id, reactionId, emojiName });
                }}
              />
            </S.ReactionList>
          );
        })}
      </ul>
    </S.ReactionPanel>
  );
};

export default ReactionPanel;
