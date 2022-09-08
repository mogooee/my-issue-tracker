import { useRecoilValue } from 'recoil';

import * as S from '@/components/Molecules/Comment/ReactionContainer/index.styled';
import { COLORS } from '@/styles/theme';

import Icon from '@/components/Atoms/Icon';
import Label from '@/components/Atoms/Label';
import Dropdown from '@/components/Molecules/Dropdown';
import { UsedEmojisTypes } from '@/components/Molecules/Comment';

import replaceUnicodeWithIcon from '@/utils/replaceUnicodeWithIcon';
import { LoginUserInfoState } from '@/stores/loginUserInfo';
import { ReactionTypes } from '@/api/issue/reaction';

export interface ReactionContainerTypes {
  reactions: ReactionTypes[];
  usedEmojis: UsedEmojisTypes[];
  issueId: number;
  commentId: number;
}

const ReactionContainer = ({ reactions, usedEmojis, issueId, commentId }: ReactionContainerTypes) => {
  const userInfo = useRecoilValue(LoginUserInfoState);

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
        }}
      />
      {usedEmojis.map(({ emoji, reactors }) => {
        const { name } = reactions.find(({ unicode }) => unicode === emoji)!;
        const isUsed = reactors.find(({ memberId }) => memberId === userInfo.id);

        return (
          <S.Reaction key={emoji} nickname={reactors.map(({ nickname }) => nickname)} emoji={name}>
            <Label
              labelStyle="LIGHT"
              backgroundColorCode={isUsed ? COLORS.PRIMARY.LIGHT_BLUE : COLORS.BACKGROUND}
              lineColor={isUsed ? COLORS.PRIMARY.BLUE : COLORS.LABEL}
              textColor="BLACK"
              title={`${replaceUnicodeWithIcon(emoji)} ${reactors.length}`}
              onClick={() => {
                const memberId = userInfo.id;
                const reactionId = reactors.find(({ memberId: id }) => id === userInfo.id)?.reactionId;

                return { issueId, commentId, reactionId, memberId };
              }}
            />
          </S.Reaction>
        );
      })}
    </S.ReactionTab>
  );
};

export default ReactionContainer;
