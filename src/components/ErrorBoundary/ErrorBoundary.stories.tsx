import { ComponentStory, ComponentMeta } from '@storybook/react';
import CustomErrorBoundary from '@/components/ErrorBoundary';
import ExpiredLoginError from '@/components/ErrorBoundary/ExpiredLogin';
import InternalServerErrorComponent from '@/components/ErrorBoundary/InternalServerError';
import NotExistIssueError from '@/components/ErrorBoundary/NotExistIssue';
import NotValidRedirectCodeError from '@/components/ErrorBoundary/NotValidCode';

export default {
  title: 'Error Boundary',
  component: CustomErrorBoundary,
} as ComponentMeta<typeof CustomErrorBoundary>;

const ExpiredLoginTemplate: ComponentStory<typeof CustomErrorBoundary> = () => (
  <ExpiredLoginError resetError={() => {}} />
);

export const ExpiredLogin = ExpiredLoginTemplate.bind({});

const InternalServerErrorTemplate: ComponentStory<typeof CustomErrorBoundary> = () => (
  <InternalServerErrorComponent resetError={() => {}} />
);

export const InternalServerError = InternalServerErrorTemplate.bind({});

const NotExistIssueTemplate: ComponentStory<typeof CustomErrorBoundary> = () => (
  <NotExistIssueError resetError={() => {}} />
);

export const NotExistIssue = NotExistIssueTemplate.bind({});

const NotValidRedirectCodeTemplete: ComponentStory<typeof CustomErrorBoundary> = () => (
  <NotValidRedirectCodeError resetError={() => {}} />
);

export const NotValidRedirectCode = NotValidRedirectCodeTemplete.bind({});
