import React, { useEffect, useState } from 'react';
import { CardTypes } from '../../types';

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../redux/store';
import {showCards} from '../../redux/slices/card.slice';
import Card from './Card';

const Cards = () => {
  const [loading, setLoading] = useState(true);
  const { cards } = useSelector((state: RootState) => state.card);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(showCards())
      .unwrap()
      .then(() => {
        setLoading(false);
      });
  },[dispatch]);

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
          title={card.title}
          description={card.description}
          createdBy={card.createdBy}
          status={card.status}/>)}
      </div>
      <div>
        <h3>Doing</h3>
        {cards.doing.map((card, idx) => <Card
          key={idx}
          title={card.title}
          description={card.description}
          createdBy={card.createdBy}
          status={card.status}/>)}
      </div>
      <div>
        <h3>Done</h3>
        {cards.done.map((card, idx) => <Card
          key={idx}
          title={card.title}
          description={card.description}
          createdBy={card.createdBy}
          status={card.status}/>)}
      </div>
    </div>}
    </div>
    </>
  )
}

export default Cards
