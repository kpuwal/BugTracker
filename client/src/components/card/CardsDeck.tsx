import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../redux/store';
import {showCards, deleteCard} from '../../redux/slices/card.slice';
import Card from './Card';
import { deleteTypes } from '../../types';

const CardsDeck = () => {
  const [loading, setLoading] = useState(true);
  const { cards } = useSelector((state: RootState) => state.card);
  const { roles } = useSelector((state: RootState) => state.auth.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(showCards())
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {console.log(error)})
  },[dispatch]);

  const handleDelete = ({_id}: deleteTypes) => {
    console.log(_id, " id")
    dispatch(deleteCard({_id}));
  }

  return (
    <>
      <p>Deck of Bug Cards</p>
      <div style={{flex: 1}}>
        {loading && (<span>loading...</span>)}
        {!loading && <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
      <div>
        <h3>To Do</h3>
        {cards.toDo.map((card, idx) => <Card
          key={idx}
          _id={card._id}
          title={card.title}
          description={card.description}
          createdBy={card.createdBy}
          isModerator={roles.moderator}
          {...{handleDelete}}/>)}
      </div>
      <div>
        <h3>Doing</h3>
        {cards.doing.map((card, idx) => <Card
          key={idx}
          _id={card._id}
          title={card.title}
          description={card.description}
          createdBy={card.createdBy}
          isModerator={roles.moderator}
          {...{handleDelete}}/>)}
      </div>
      <div>
        <h3>Done</h3>
        {cards.done.map((card, idx) => <Card
          key={idx}
          _id={card._id}
          title={card.title}
          description={card.description}
          createdBy={card.createdBy}
          isModerator={roles.moderator}
          {...{handleDelete}}/>)}
      </div>
    </div>}
    </div>
    </>
  )
}

export default CardsDeck;
