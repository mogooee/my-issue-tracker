/* eslint-disable import/no-extraneous-dependencies */
import { setupServer } from 'msw/node';
import { milestoneHandlers } from '@/mocks/handlers/milestone';
import { authHandlers } from '@/mocks/handlers/auth';
import { labelHandlers } from '@/mocks/handlers/label';
import { issueHandlers } from '@/mocks/handlers/issue';

export const server = setupServer(...authHandlers, ...labelHandlers, ...milestoneHandlers, ...issueHandlers);
