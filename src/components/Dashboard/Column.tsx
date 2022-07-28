import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { RepoData } from '../../views/MainPage/types';

type ColumnType = {
  section: RepoData;
  children: React.ReactNode;
};

const Column = ({ section, children }: ColumnType) => {
  return (
    <Droppable droppableId={section.id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          className="column"
          ref={provided.innerRef}>
          <div>{section.title}</div>
          <div>
            {children}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
