import React, { useEffect, useState } from 'react';

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../redux/store';
import {showCards} from '../../redux/slices/card.slice';

const Cards = () => {
  const [loading, setLoading] = useState(false);
  const { cards } = useSelector((state: RootState) => state.card);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // setLoading(true);
    dispatch(showCards())
  }, [dispatch])

  return (
    <>
      <p>Deck of Bug Cards</p>
    </>
  )
}

export default Cards
