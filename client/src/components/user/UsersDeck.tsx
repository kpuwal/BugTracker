import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../redux/store';
import {showUsers} from '../../redux/slices/user.slice';
import UserCard from './UserCard';
import { User } from '../../types';

const UsersDeck = () => {
  const [loading, setLoading] = useState(true);
  const { users } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
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
        {!loading && users.slice(1).map((user: User, idx) => {
          console.log(user)
        return <UserCard
          key={idx}
          _id={user._id}
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
