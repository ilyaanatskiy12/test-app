import React from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import Dashboard from '../../components/Dashboard';
import Search from '../../components/Search';
import { useIssues } from './context';

const MainPage = () => {
  const { breadcrumbs, issues, getGithubissues, saveLocalStorageIssues } =
    useIssues();

  return (
    <div className="">
      <div className="mb-4">
        <Search getGithubissues={getGithubissues} />
      </div>
      <div className="mb-2">
        <CustomBreadcrumb items={breadcrumbs || []} />
      </div>

      <Dashboard
        issues={issues}
        saveLocalStorageIssues={saveLocalStorageIssues}
      />
    </div>
  );
};

export default MainPage;
