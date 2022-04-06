import React, {useState} from 'react';

import { User } from '../../types';
import { useAppDispatch } from '../../redux/store';
import {updateUser, deleteUser } from '../../redux/slices/user.slice';

const UserCard = ({_id, name, email, roles}: User) => {
  const [isChecked, setIsChecked] = useState(roles.moderator);
  const dispatch = useAppDispatch();
  
  const handleChange = () => {
    setIsChecked(!isChecked);
  }

  const handleSave = () => {
    const updatedRoles = {...roles, moderator: isChecked};
    dispatch(updateUser({_id, roles: updatedRoles}));
  }

  const handleDelete = () => {
    dispatch(deleteUser({_id}));
  }

  return (
    <div style={{padding: 3, border: 1, borderStyle: 'solid', borderColor: '#000', marginBottom: 4}}>
      <p>name: {name}</p>
      <p>email: {email}</p>
      <p>moderator: 
        <input
          type="checkbox"
          name={name}
          checked={isChecked}
          onChange={handleChange}
        />
      </p>
      <button onClick={handleSave}>save</button>
      <button onClick={handleDelete}>delete user</button>
    </div>
  )
}

export default UserCard;
