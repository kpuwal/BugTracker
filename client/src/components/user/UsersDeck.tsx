import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../redux/store';
import {showUsers} from '../../redux/slices/user.slice';
import UserCard from './UserCard';

const UsersDeck = () => {
  const [loading, setLoading] = useState(false);
  const { users } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(showUsers())
      .unwrap()
      .then(() => {
        setLoading(false);
      });
  },[dispatch]);

  return (
    <>
      <p>Deck of User Cards</p>
      <div style={{flex: 1}}>
        {loading && (<span>loading...</span>)}
        {users.map((user, idx) => {
        return <UserCard
          key={idx}
          name={user.name}
          email={user.email}
        />
      })}
      </div>
    </>
  )
}

export default UsersDeck;
