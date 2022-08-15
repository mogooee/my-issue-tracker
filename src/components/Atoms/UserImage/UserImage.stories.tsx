import { ComponentStory, ComponentMeta } from '@storybook/react';
import UserImage from '@/components/Atoms/UserImage';

export default {
  title: 'Atoms/UserImage',
  component: UserImage,
} as ComponentMeta<typeof UserImage>;

const Template: ComponentStory<typeof UserImage> = (args) => <UserImage {...args} />;

export const Medium = Template.bind({});
Medium.args = {
  id: 0,
  nickname: 'dobby',
  profileImage: 'https://avatars.githubusercontent.com/u/92701121?v=4',
  imgSize: 'MEDIUM',
};

export const Small = Template.bind({});
Small.args = {
  id: 1,
  nickname: 'dotori',
  profileImage: 'https://avatars.githubusercontent.com/u/85747667?s=96&v=4',
  imgSize: 'SMALL',
};
