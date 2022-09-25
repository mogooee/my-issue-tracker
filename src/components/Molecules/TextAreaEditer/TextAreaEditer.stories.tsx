import { ComponentStory, ComponentMeta } from '@storybook/react';
import React, { useState } from 'react';
import TextAreaEditer from '@/components/Molecules/TextAreaEditer';

export default {
  title: 'Molecules/TextAreaEditer',
  component: TextAreaEditer,
} as ComponentMeta<typeof TextAreaEditer>;

const AddTemplate: ComponentStory<typeof TextAreaEditer> = () => {
  const [textAreaValue, setTextAreaValue] = useState('');

  return <TextAreaEditer edit="COMMENT" textAreaValue={textAreaValue} setTextAreaValue={setTextAreaValue} />;
};

export const Initial = AddTemplate.bind({});

const ModifyTemplate: ComponentStory<typeof TextAreaEditer> = () => {
  const [textAreaValue, setTextAreaValue] = useState(`# 큰 제목
  본문
  - 할 일
      - 세부사항 1
      - 세부사항 2
  
  ## 소제목
  기타등등
  
  ### 이미지
  ![프사](https://avatars.githubusercontent.com/u/85747667?v=4)
  `);

  return <TextAreaEditer edit="COMMENT" textAreaValue={textAreaValue} setTextAreaValue={setTextAreaValue} />;
};

export const Modify = ModifyTemplate.bind({});
