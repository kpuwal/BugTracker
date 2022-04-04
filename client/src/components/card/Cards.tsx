import React, { useEffect, useState } from 'react';

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../redux/store';
import {showCards} from '../../redux/slices/card.slice';
import Card from './Card';

const Cards = () => {
  const [loading, setLoading] = useState(false);
  const { cards } = useSelector((state: RootState) => state.card);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(showCards())
      .unwrap()
      .then(() => {
        setLoading(false);
      });
  },[dispatch]);

  return (
    <>
      <p>Deck of Bug Cards</p>
      <div>
        {loading && (<span>loading...</span>)}
        {cards.map((card, idx) => {
        return <Card
          key={idx}
          title={card.title}
          description={card.description}
          createdBy={card.createdBy}
        />
      })}
      </div>
    </>
  )
}

export default Cards
