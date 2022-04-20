import React from 'react';
import { CardTypes } from '../../types';
import { Link } from 'react-router-dom';

const Card = ({_id, title, description, createdBy, isModerator, handleDelete}: CardTypes) => {
  return (
    <div style={{padding: 5, border: 1}}>
      <p>title: {title}</p>
      <p>description: {description}</p>
      <p>createdBy: {createdBy}</p>
      {
        isModerator && <button onClick={() => handleDelete({_id})}>delete</button>
      }
      {isModerator && <Link to={`/card/${_id}`}>Edit</Link>}
    </div>
  )
}

export default Card;
