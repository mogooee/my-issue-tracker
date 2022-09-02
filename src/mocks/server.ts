/* eslint-disable import/no-extraneous-dependencies */
import { setupServer } from 'msw/node';
import { handlers } from '@/mocks/handlers';
import { milestoneHandlers } from '@/mocks/handlers/milestones';

export const server = setupServer(...handlers, ...milestoneHandlers);
