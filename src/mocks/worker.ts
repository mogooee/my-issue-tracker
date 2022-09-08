/* eslint-disable import/no-extraneous-dependencies */
import { setupWorker } from 'msw';
import { milestoneHandlers } from '@/mocks/handlers/milestone';
import { authHandlers } from '@/mocks/handlers/auth';
import { labelHandlers } from '@/mocks/handlers/label';
import { issueHandlers } from '@/mocks/handlers/issue';

export const worker = setupWorker(...authHandlers, ...labelHandlers, ...milestoneHandlers, ...issueHandlers);
