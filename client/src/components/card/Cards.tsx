import React, { useEffect } from 'react';

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../redux/store';
import {showCards} from '../../redux/slices/card.slice';

const Cards = () => {
  const { cards } = useSelector((state: RootState) => state.card);
  const dispatch = useAppDispatch();

  // useEffect(() => dispatch(showCards()), [])

  return (
    <>
      <p>Deck of Bug Cards</p>
    </>
  )
}

export default Cards
