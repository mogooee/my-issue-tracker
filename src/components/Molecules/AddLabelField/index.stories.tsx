import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddLabelField from '@/components/Molecules/AddLabelField';

export default {
  title: 'Molecules/AddLabelField',
  component: AddLabelField,
} as ComponentMeta<typeof AddLabelField>;

const Template: ComponentStory<typeof AddLabelField> = (args) => <AddLabelField {...args} />;

export const New = Template.bind({});
New.args = {
  type: 'ADD',
};

export const Edit = Template.bind({});
Edit.args = {
  type: 'EDIT',
};
