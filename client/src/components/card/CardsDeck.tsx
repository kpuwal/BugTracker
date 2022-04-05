import React, { useEffect, useState } from 'react';
import { CardTypes } from '../../types';

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../redux/store';
import {showCards} from '../../redux/slices/card.slice';
import CardTray from './CardTray';

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
        {!loading && cards.map((card: CardTypes, idx) => {
        return <CardTray
          key={idx}
          {...{card}}
        />
      })}
      </div>
    </>
  )
}

export default Cards
