import React,{ useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../redux/store';
import { logout } from "../redux/slices/auth.slice";

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
    return (
      <div>
        <header>
          <h3>
            <strong>{currentUser.name}'s</strong> Profile
          </h3>
        </header>
        
        <p>
          <strong>Id:</strong> {currentUser._id}
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
      </div>
  );
}
};
export default Profile;