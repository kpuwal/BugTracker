import React from 'react';

type CardTypes = {
  title: string;
  description: string;
  createdBy: string;
  date?: Date;
}

const Card = ({title, description, createdBy, date}: CardTypes) => {
  return (
    <div style={{padding: 5, border: 1}}>
      <p>title: {title}</p>
      <p>description: {description}</p>
      <p>createdBy: {createdBy}</p>
    </div>
  )
}

export default Card;
