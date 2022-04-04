import React from 'react';
import { RolesTypes } from '../../types';

type UserCardTypes = {
  name: string;
  email: string;
  roles: RolesTypes[],
}

const UserCard = ({name, email, roles}: UserCardTypes) => {
  return (
    <div style={{padding: 5, border: 1}}>
      <p>name: {name}</p>
      <p>email: {email}</p>
      <ul>roles: {roles.map((role, idx) => <li key={idx}>{role.name}</li>)}</ul>
    </div>
  )
}

export default UserCard;
