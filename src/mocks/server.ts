/* eslint-disable import/no-extraneous-dependencies */
import { setupServer } from 'msw/node';
import { milestoneHandlers } from '@/mocks/handlers/milestones';
import { authHandlers } from '@/mocks/handlers/auth';
import { labelHandlers } from '@/mocks/handlers/label';

export const server = setupServer(...authHandlers, ...labelHandlers, ...milestoneHandlers);
