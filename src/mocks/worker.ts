/* eslint-disable import/no-extraneous-dependencies */
import { setupWorker } from 'msw';
import { milestoneHandlers } from '@/mocks/handlers/milestones';
import { authHandlers } from '@/mocks/handlers/auth';
import { labelHandlers } from '@/mocks/handlers/label';

export const worker = setupWorker(...authHandlers, ...labelHandlers, ...milestoneHandlers);
