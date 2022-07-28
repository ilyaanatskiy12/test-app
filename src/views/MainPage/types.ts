export type TasksData = {
  id: string;
  status: string;
  number: number;
  title: string;
  createdAt: string;
  createdBy: string;
};

export type RepoData = {
  id: string;
  title: string;
  status: string;
  tasks: TasksData[];
};

export type GithubApiData = {
  state: string;
  created_at: Date;
  user: {
    login: string;
  };
} & TasksData;
