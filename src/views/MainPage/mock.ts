import { RepoData } from './types';

export const mock: RepoData[] = [
  {
    id: '1',
    title: 'Backlog',
    status: 'unknown',
    tasks: [],
  },
  {
    id: '2',
    title: 'In progress',
    status: 'open',
    tasks: [],
  },
  {
    id: '3',
    title: 'Completed',
    status: 'closed',
    tasks: [],
  },
];
