import React from 'react';

type UserCardTypes = {
  name: string;
  email: string;
}

const UserCard = ({name, email}: UserCardTypes) => {
  return (
    <div style={{padding: 5, border: 1}}>
      <p>name: {name}</p>
      <p>email: {email}</p>
    </div>
  )
}

export default UserCard;
