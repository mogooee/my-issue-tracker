import { ComponentStory, ComponentMeta } from '@storybook/react';
import PanelBubble from '@/components/Molecules/Dropdown/Panel/Bubble';

export default {
  title: 'Molecules/Dropdown/Panel/Bubble',
  component: PanelBubble,
} as ComponentMeta<typeof PanelBubble>;

const Template: ComponentStory<typeof PanelBubble> = (args) => <PanelBubble {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  panelList: [
    {
      title: 'Edit',
    },
    {
      title: 'Delete',
    },
  ],
  position: 'LEFT',
};
