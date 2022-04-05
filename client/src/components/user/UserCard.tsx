import React, {useState} from 'react';
import { useSelector } from "react-redux";

import { User } from '../../types';
import { RootState, useAppDispatch } from '../../redux/store';
import {updateUser } from '../../redux/slices/user.slice';

const UserCard = ({_id, name, email, roles}: User) => {
  const [isChecked, setIsChecked] = useState(roles.moderator);
  const { message } = useSelector((state: RootState) => state.message);
  const dispatch = useAppDispatch();
  
  const handleChange = () => {
    setIsChecked(!isChecked);
  }

  const handleSave = () => {
    const updatedRoles = {...roles, moderator: isChecked};
    dispatch(updateUser({_id, roles: updatedRoles}));
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
      {message && (<div>{message}</div>)}

    </div>
  )
}

export default UserCard;
