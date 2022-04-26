import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from '../../redux/store';
import { Card, User } from '../../types';
import MainCard from './Card';

const filterCards = (name: string, arr: Card[]) => {
  const newArr = arr.filter((item: Card) => item.createdBy === name);
  return newArr.length === 0 ? [] : newArr;
}

const MyCards = () => {
  const { cards } = useSelector((state: RootState) => state.card);
  const { name } = useParams() as {name: string};
  let params = useLocation();
  const user  = params.state as User;
  
  const [filteredCards, setFilteredCards] = useState({
    toDo: [] as Card[],
    doing: [] as Card[],
    done: [] as Card[]
  });

  useEffect(() => {
    setFilteredCards({
      toDo: filterCards(name, cards.toDo),
      doing: filterCards(name, cards.doing),
      done: filterCards(name, cards.done)
    })
  }, [cards.toDo, cards.doing, cards.done, name])

  return (
    <div>
      {name}'s cards:
      <div>
        <h3>To Do</h3>
        {filteredCards.toDo.map((card, idx) => <MainCard
          key={idx}
          _id={card._id}
          title={card.title}
          description={card.description}
          createdBy={card.createdBy}
          isModerator={user.roles.moderator}/>)}
      </div>
      <div>
        <h3>Doing</h3>
        {filteredCards.doing.map((card, idx) => <MainCard
          key={idx}
          _id={card._id}
          title={card.title}
          description={card.description}
          createdBy={card.createdBy}
          isModerator={user.roles.moderator}/>)}
      </div>
      <div>
        <h3>Done</h3>
        {filteredCards.done.map((card, idx) => <MainCard
          key={idx}
          _id={card._id}
          title={card.title}
          description={card.description}
          createdBy={card.createdBy}
          isModerator={user.roles.moderator}/>)}
      </div>
    </div>
  )
}

export default MyCards;
