import { ComponentMeta, ComponentStory } from '@storybook/react';
import ColorCode from '@/components/Atoms/ColorCode/';

export default {
  title: 'Atoms/ColorCode',
  component: ColorCode,
} as ComponentMeta<typeof ColorCode>;

const Template: ComponentStory<typeof ColorCode> = (args) => <ColorCode {...args} />;

export const Initial = Template.bind({});
Initial.args = {};
