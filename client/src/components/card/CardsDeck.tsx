import React, { useEffect, useState } from 'react';

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
        {!loading && cards.map((card, idx) => {
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
