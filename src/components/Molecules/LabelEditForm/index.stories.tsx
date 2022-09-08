import { ComponentStory, ComponentMeta } from '@storybook/react';
import LabelEditForm from '@/components/Molecules/LabelEditForm';

export default {
  title: 'Molecules/LabelEditForm',
  component: LabelEditForm,
} as ComponentMeta<typeof LabelEditForm>;

const Template: ComponentStory<typeof LabelEditForm> = (args) => <LabelEditForm {...args} />;

export const New = Template.bind({});
New.args = {
  type: 'ADD',
};

export const Edit = Template.bind({});
Edit.args = {
  type: 'EDIT',
};
