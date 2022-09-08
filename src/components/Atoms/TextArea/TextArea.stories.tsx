import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import TextArea from '.';

export default {
  title: 'Atoms/TextArea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = () => {
  const [areaValue, setAreaValue] = useState<string>('');

  return (
    <div>
      <TextArea textAreaValue={areaValue} setAreaValue={setAreaValue} />
    </div>
  );
};

export const Initial = Template.bind({});
