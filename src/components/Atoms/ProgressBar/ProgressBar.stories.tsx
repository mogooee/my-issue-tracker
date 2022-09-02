import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProgressBar from '@/components/Atoms/ProgressBar';

export default {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = (args) => <ProgressBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  open: 5,
  close: 5,
};

export const ShowState = Template.bind({});
ShowState.args = { open: 3, close: 7, showState: true };

export const ShowTitle = Template.bind({});
ShowTitle.args = { open: 3, close: 7, title: '이슈 트래커' };
