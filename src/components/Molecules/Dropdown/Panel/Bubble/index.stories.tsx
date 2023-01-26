import { ComponentStory, ComponentMeta } from '@storybook/react';
import PanelBubble from '@/components/Molecules/Dropdown/Panel/Bubble';

export default {
  title: 'Molecules/Dropdown/Panel/Bubble',
  component: PanelBubble,
} as ComponentMeta<typeof PanelBubble>;

const Template: ComponentStory<typeof PanelBubble> = (args) => <PanelBubble {...args} />;

export const LabelBtns = Template.bind({});
LabelBtns.args = {
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

export const MilestoneBtns = Template.bind({});
MilestoneBtns.args = {
  panelList: [
    {
      title: 'Edit',
    },
    {
      title: 'Close',
    },
    {
      title: 'Delete',
    },
  ],
  position: 'LEFT',
};
