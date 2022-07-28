import React, { memo, useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { RepoData } from '../../views/MainPage/types';

import Column from './Column';
import ColumnItem from './ColumnItem';

type DashboardProps = {
  issues: RepoData[];
  saveLocalStorageIssues: (data: RepoData[]) => void;
};

const Dashboard = ({ issues, saveLocalStorageIssues }: DashboardProps) => {
  const [data, setData] = useState<RepoData[]>([]);

  useEffect(() => {
    setData(issues);
  }, [issues]);

  useEffect(() => {
    saveLocalStorageIssues(data);
  }, [data]);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    const newData = [...data];
    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = newData.findIndex(
        (e) => e.id === source.droppableId,
      );
      const destinationColIndex = newData.findIndex(
        (e) => e.id === destination.droppableId,
      );

      const sourceCol = newData[sourceColIndex];
      const destinationCol = newData[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      newData[sourceColIndex].tasks = sourceTask;
      newData[destinationColIndex].tasks = destinationTask;

      setData(newData);
    } else {
      const items = newData.filter((item) => item.id === source.droppableId)[0]
        .tasks;

      const item = items.splice(source.index, 1);
      items.splice(destination.index, 0, item[0]);

      setData(newData);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="dashboard bg-light d-flex justify-content-between p-3">
        {data.map((section) => (
          <Column key={section.id} section={section}>
            {section.tasks.map((task, index) => (
              <ColumnItem key={task.id} task={task} index={index} />
            ))}
          </Column>
        ))}
      </div>
    </DragDropContext>
  );
};

export default memo(Dashboard);
