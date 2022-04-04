import React from 'react';
import { RoleTypes } from '../../types';

type UserCardTypes = {
  name: string;
  email: string;
  roles: RoleTypes,
}

const UserCard = ({name, email, roles}: UserCardTypes) => {
  console.log(roles, "roles")
  return (
    <div style={{padding: 5, border: 1}}>
      <p>name: {name}</p>
      <p>email: {email}</p>
      <ul>roles: 
        <li>{roles.admin ? "admin" : "not admin"}</li>
        <li>{roles.moderator ? "moderator" : " not moderator"}</li>
        <li>{roles.user ? "user" : "not user"}</li>
      </ul>
    </div>
  )
}

export default UserCard;
