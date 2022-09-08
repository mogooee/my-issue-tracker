import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextAreaEditer from '.';

export default {
  title: 'Molecules/TextAreaEditer',
  component: TextAreaEditer,
} as ComponentMeta<typeof TextAreaEditer>;

const Template: ComponentStory<typeof TextAreaEditer> = (args) => <TextAreaEditer {...args} />;

export const Initial = Template.bind({});

export const InnerText = Template.bind({});
InnerText.args = {
  textAreaValue: `# 큰 제목
  본문
  - 할 일
      - 세부사항 1
      - 세부사항 2
  
  ## 소제목
  기타등등
  
  ### 이미지
  ![프사](https://avatars.githubusercontent.com/u/85747667?v=4)
  `,
};
