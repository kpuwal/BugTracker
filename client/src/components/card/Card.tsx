import React from 'react';
import { CardTypes } from '../../types';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { deleteCard} from '../../redux/slices/card.slice';

const Card = ({_id, title, description, createdBy, isModerator}: CardTypes) => {
  const dispatch = useAppDispatch();
  
  const handleDelete = () => {
    dispatch(deleteCard({_id}));
  }

  return (
    <div style={{padding: 5, border: 1}}>
      <p>title: {title}</p>
      <p>description: {description}</p>
      <p>createdBy: {createdBy}</p>
      {
        isModerator && <button onClick={handleDelete}>delete</button>
      }
      {isModerator && <Link to={`/card/${_id}`}>Edit</Link>}
    </div>
  )
}

export default Card;
