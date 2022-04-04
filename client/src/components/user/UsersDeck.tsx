import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../redux/store';
import {showUsers} from '../../redux/slices/user.slice';
import UserCard from './UserCard';

const UsersDeck = () => {
  const [loading, setLoading] = useState(true);
  const { users } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // setLoading(true);
    dispatch(showUsers())
      .unwrap()
      .then(() => {
        setLoading(false);
      });
  },[dispatch]);

  return (
    <>
      <p>Deck of User Cards</p>
      <div>
        {loading && (<span>loading...</span>)}
        {!loading && users.map((user, idx) => {
        return <UserCard
          key={idx}
          name={user.name}
          email={user.email}
          roles={user.roles}
        />
      })}
      </div>
    </>
  )
}

export default UsersDeck;
