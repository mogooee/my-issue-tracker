import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import TextArea from '@/components/Atoms/TextArea';

export default {
  title: 'Atoms/TextArea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = () => {
  const [areaValue, setAreaValue] = useState<string>('');

  return <TextArea edit="COMMENT" textAreaValue={areaValue} setTextAreaValue={setAreaValue} />;
};

export const Initial = Template.bind({});
