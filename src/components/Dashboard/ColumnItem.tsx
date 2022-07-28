import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TasksData } from '../../views/MainPage/types';
import CustomCard from '../CustomCard';

type ColumnItemProps = {
  task: TasksData;
  index: number;
};

const ColumnItem = ({ task, index }: ColumnItemProps) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? '0.5' : '1',
          }}>
          <CustomCard card={task} />
        </div>
      )}
    </Draggable>
  );
};

export default ColumnItem;
