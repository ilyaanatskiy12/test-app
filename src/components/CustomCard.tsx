import React, { memo } from 'react';
import { Card } from 'react-bootstrap';
import { timeLeft } from '../utils/date';
import { TasksData } from '../views/MainPage/types';

type CustomCardProps = {
  card: TasksData;
};

const CustomCard = ({ card }: CustomCardProps) => {
  return (
    <Card border="light">
      <Card.Body>
        <Card.Title className="h6">{card.title}</Card.Title>
        <Card.Text className="card-description">
          {`#${card.number} ${timeLeft(card.createdAt)} by ${card.createdBy}`}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default memo(CustomCard);
