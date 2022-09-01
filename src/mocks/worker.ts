/* eslint-disable import/no-extraneous-dependencies */
import { setupWorker } from 'msw';
import { authHandlers } from './handler/auth';
import { labelHandlers } from './handler/label';

export const worker = setupWorker(...authHandlers, ...labelHandlers);
