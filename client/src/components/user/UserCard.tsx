import React, {useState} from 'react';
import { User } from '../../types';

const UserCard = ({_id, name, email, roles}: User) => {
  const [isChecked, setIsChecked] = useState(roles.moderator);
  
  const handleChange = () => {
    setIsChecked(!isChecked);
  }

  const handleSave = () => {
    console.log("isChecked ", isChecked)
    console.log("user id ", _id)
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
    </div>
  )
}

export default UserCard;
