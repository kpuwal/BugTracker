import React from 'react';
import { CardTypes } from '../../types';

const Card = ({_id, title, description, createdBy, isModerator, handleDelete}: CardTypes) => {
  return (
    <div style={{padding: 5, border: 1}}>
      <p>title: {title}</p>
      <p>description: {description}</p>
      <p>createdBy: {createdBy}</p>
      {
        isModerator && <button onClick={() => handleDelete(_id)}>delete</button>
      }
    </div>
  )
}

export default Card;
