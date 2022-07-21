import { ComponentStory, ComponentMeta } from '@storybook/react';
import LoginAndRegister from '@/components/Organisms/LoginAndRegister';

export default {
  title: 'Organisms/LoginAndRegister',
  component: LoginAndRegister,
} as ComponentMeta<typeof LoginAndRegister>;

export const Initial: ComponentStory<typeof LoginAndRegister> = () => <LoginAndRegister />;
