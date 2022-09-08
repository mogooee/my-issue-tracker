import * as S from '@/components/Molecules/Comment/HeaderTab/index.styled';
import { COLORS } from '@/styles/theme';

import Button from '@/components/Atoms/Button';
import Icon from '@/components/Atoms/Icon';
import Label from '@/components/Atoms/Label';
import Dropdown from '@/components/Molecules/Dropdown';

import { ReactionContainerTypes } from '@/components/Molecules/Comment/ReactionContainer';

type HeaderTabTypes = ReactionContainerTypes & { isAuthor: boolean };

const HeaderTab = ({ isAuthor, ...panelProps }: HeaderTabTypes) => (
  <S.CommentTab>
    {isAuthor && (
      <>
        <Label
          labelStyle="LIGHT"
          title="작성자"
          backgroundColorCode={COLORS.BACKGROUND}
          lineColor={COLORS.LINE}
          textColor="BLACK"
        />
        <Button
          buttonStyle="NO_BORDER"
          iconInfo={{
            icon: 'Edit',
            stroke: COLORS.LABEL,
          }}
          label="편집"
          size="SMALL"
        />
      </>
    )}
    <Dropdown
      indicatorProps={{
        indicatorStyle: 'ICON',
        indicatorLabel: '',
        indicatorIcon: <Icon icon="Smile" stroke={COLORS.LABEL} />,
      }}
      type="Reaction"
      panelProps={{ ...panelProps }}
    />
  </S.CommentTab>
);

export default HeaderTab;
