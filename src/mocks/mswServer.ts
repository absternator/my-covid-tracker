import { setupServer } from 'msw/node';
import { defaultHandlers, handlers } from './mswHandlers';

export const server = setupServer(...handlers, ...defaultHandlers);
