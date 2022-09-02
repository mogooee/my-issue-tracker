import { setupServer } from 'msw/node';
import { authHandlers } from './handler/auth';
import { labelHandlers } from './handler/label';

export const server = setupServer(...authHandlers, ...labelHandlers);
