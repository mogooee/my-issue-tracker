import { ComponentStory, ComponentMeta } from '@storybook/react';
import React, { useState } from 'react';
import TextArea from '@/components/Atoms/TextArea';

export default {
  title: 'Atoms/TextArea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = () => {
  const [areaValue, setAreaValue] = useState<string>('');

  const ChangeTextareaValue = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;
    return setAreaValue(value);
  };

  return (
    <div>
      <TextArea textAreaValue={areaValue} handleOnChange={ChangeTextareaValue} />
    </div>
  );
};

export const Initial = Template.bind({});
