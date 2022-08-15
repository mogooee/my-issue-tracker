import { ComponentStory, ComponentMeta } from '@storybook/react';
import PanelPreviewLabel from '@/components/Molecules/Dropdown/Panel/Label';
import { COLORS } from '@/styles/theme';

export default {
  title: 'Molecules/Dropdown/Panel/PreviewLabel',
  component: PanelPreviewLabel,
} as ComponentMeta<typeof PanelPreviewLabel>;

const Template: ComponentStory<typeof PanelPreviewLabel> = (args) => <PanelPreviewLabel {...args} />;

export const ColorLabel = Template.bind({});
ColorLabel.args = {
  backgroundColor: `${COLORS.SUCCESS.GREEN}`,
};

export const UserImgLabel = Template.bind({});
UserImgLabel.args = {
  profileImageUrl: 'https://avatars.githubusercontent.com/u/92701121?v=4',
  loginId: '도톨',
};
