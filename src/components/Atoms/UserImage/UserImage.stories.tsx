import { ComponentStory, ComponentMeta } from '@storybook/react';
import UserImage from '@/components/Atoms/UserImage';

export default {
  title: 'Atoms/UserImage',
  component: UserImage,
} as ComponentMeta<typeof UserImage>;

const Template: ComponentStory<typeof UserImage> = (args) => <UserImage {...args} />;

export const Medium = Template.bind({});
Medium.args = {
  loginId: '도톨',
  profileImageUrl: 'https://avatars.githubusercontent.com/u/92701121?v=4',
  imgSize: 'MEDIUM',
};

export const Small = Template.bind({});
Small.args = {
  loginId: '도비',
  profileImageUrl: 'https://avatars.githubusercontent.com/u/85747667?s=96&v=4',
};
