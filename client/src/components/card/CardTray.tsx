import React, {useState, useEffect} from 'react'
import Card from './Card';
import { CardTypes } from '../../types';

type CardTrayTypes = {
  card: CardTypes,
}

const CardTray = ({card}: CardTrayTypes) => {
  
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
      <div style={{backgroundColor: 'pink'}}>
        <h3>To Do</h3>
        <Card
          title={card.title}
          description={card.description}
          createdBy={card.createdBy}
          status={card.status}/>
      </div>
      <div style={{backgroundColor: 'yellow'}}>
        <h3>Doing</h3>
        <Card 
          title={card.title}
          description={card.description}
          createdBy={card.createdBy}
          status={card.status}/>
      </div>
      <div style={{backgroundColor: 'green'}}>
        <h3>Done</h3>
        <Card
          title={card.title}
          description={card.description}
          createdBy={card.createdBy}
          status={card.status}/>
      </div>
    </div>
  )
}

export default CardTray;
