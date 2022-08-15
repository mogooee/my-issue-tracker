import { ComponentStory, ComponentMeta } from '@storybook/react';
import FilterBar from '@/components/Molecules/FilterBar';
import { FILTERBAR_INFO } from '@/components/Molecules/FilterBar/mocks';

export default {
  title: 'Molecules/FilterBar',
  component: FilterBar,
} as ComponentMeta<typeof FilterBar>;

const Template: ComponentStory<typeof FilterBar> = (args) => <FilterBar {...args} />;

export const Initial = Template.bind({});
Initial.args = FILTERBAR_INFO;
