import { ComponentMeta, ComponentStory } from '@storybook/react';
import Radio from '@/components/Atoms/Radio/';

export default {
  title: 'Atoms/Radio',
  component: Radio,
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => <Radio {...args} />;

const radioData = {
  title: 'radioTest',
  option: [
    { id: 1, title: 'option1', isChecked: true },
    { id: 2, title: 'option2' },
    { id: 3, title: 'option3' },
  ],
};

export const Initial = Template.bind({});
Initial.args = {
  radioData,
};
