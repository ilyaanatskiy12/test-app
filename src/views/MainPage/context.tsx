import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  getValueForKeyInBrowserStorage,
  storeInBrowserStorage,
} from '../../utils/browser-storage';
import { mock } from './mock';
import { RepoData, TasksData } from './types';

interface UseIssuesProps {
  issues: RepoData[];
  getGithubissues: (url: string) => void;
  breadcrumbs?: string[];
  saveLocalStorageIssues: (data: RepoData[]) => void;
}

export const IssuesContext = createContext({} as UseIssuesProps);

interface IssuesProviderProps {
  children: React.ReactNode;
}

export const IssuesProvider = ({ children }: IssuesProviderProps) => {
  const [issues, setIssues] = useState<RepoData[]>(mock);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  const getGithubissues = useCallback((url: string) => {
    if (!url) return;
    const repo = url.split('https://github.com/');

    const breadcrumbArray = repo[1].split('/');

    if (!Boolean(breadcrumbArray[breadcrumbArray.length - 1])) {
      breadcrumbArray.pop();
    }

    fetch(
      `https://api.github.com/repos/${breadcrumbArray.join(
        '/',
      )}/issues?state=all`,
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data) return;

        setBreadcrumbs(breadcrumbArray);

        const storageData: RepoData[] =
          getValueForKeyInBrowserStorage(breadcrumbArray.join('/')) || [];

        if (storageData.length > 0) {
          const newData = storageData.map((storageItem) => ({
            ...storageItem,
            tasks: storageItem.tasks.map((task) => {
              const item = data.find(
                (i: TasksData) => String(i.id) === task.id,
              );
              return {
                id: String(item.id),
                status: item.state || 'unknown',
                number: item.number,
                title: item.title,
                createdAt: item.created_at,
                createdBy: item.user.login,
              };
            }),
          }));
          setIssues(newData);
        } else {
          const sortedData: TasksData[] = data.map((item: any) => ({
            id: String(item.id),
            status: item.state || 'unknown',
            number: item.number,
            title: item.title,
            createdAt: item.created_at,
            createdBy: item.user.login,
          }));

          setIssues((prev) => {
            return prev.map((item) => ({
              ...item,
              tasks: sortedData.filter((i) => i.status === item.status),
            }));
          });
        }
      });
  }, []);

  const saveLocalStorageIssues = useCallback(
    (data: RepoData[]) => {
      const key = breadcrumbs.join('/');

      if (!key) return;

      const issuesToStorage = data.map((item) => ({
        ...item,
        tasks: item.tasks.map((task) => ({
          id: task.id,
        })),
      }));
      storeInBrowserStorage(key, issuesToStorage);
    },
    [breadcrumbs],
  );

  return (
    <IssuesContext.Provider
      value={{ issues, getGithubissues, breadcrumbs, saveLocalStorageIssues }}>
      {children}
    </IssuesContext.Provider>
  );
};

export function useIssues(): UseIssuesProps {
  return useContext(IssuesContext);
}
