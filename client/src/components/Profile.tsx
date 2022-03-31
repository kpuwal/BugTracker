import React,{ useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../redux/store';
import { logout } from "../redux/slices/auth.slice";
import { User } from "../types"

function Redirect({ to }: any) {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

const Profile = () => {
  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  if (!currentUser) {
    return <Redirect to="/" />;
  } else {
    console.log("current ", currentUser)
    return (
      <div>
        <header>
          <h3>
            <strong>{currentUser.name}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substring(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p>
         <Link to="/dashboard">go to dashboard</Link>
        </p>
        <button onClick={() => dispatch(logout())}>
          LogOut
        </button>
        {/* <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul> */}
      </div>
  );
}
};
export default Profile;