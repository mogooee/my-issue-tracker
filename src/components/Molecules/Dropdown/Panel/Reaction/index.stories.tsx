import { ComponentStory, ComponentMeta } from '@storybook/react';
import ReactionPanel from '@/components/Molecules/Dropdown/Panel/Reaction';
import { REACTIONS } from '@/components/Molecules/Dropdown/Panel/Reaction/mock';
import { definedUsedEmojis } from '@/components/Molecules/Comment';
import { comment } from '@/mocks/tables/issue';

export default {
  title: 'Molecules/Dropdown/Panel/Reaction',
  component: ReactionPanel,
} as ComponentMeta<typeof ReactionPanel>;

const Template: ComponentStory<typeof ReactionPanel> = (args) => <ReactionPanel {...args} />;

export const Initial = Template.bind({});
const usedEmojis = definedUsedEmojis(comment.issueCommentReactionsResponse);
Initial.args = { reactions: REACTIONS, usedEmojis, issueId: 1, commentId: 1 };
