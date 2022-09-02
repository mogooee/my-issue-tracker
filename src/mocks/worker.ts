/* eslint-disable import/no-extraneous-dependencies */
import { setupWorker } from 'msw';
import { handlers } from '@/mocks/handlers';
import { milestoneHandlers } from '@/mocks/handlers/milestones';

export const worker = setupWorker(...handlers, ...milestoneHandlers);
