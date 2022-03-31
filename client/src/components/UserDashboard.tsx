import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from '../redux/store';
import AdminDashboard from './AdminDashboard'

const UserDashboard = () => {
  // const [content, setContent] = useState("");
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  // useEffect(() => {
  //   UserService.getUserDashboard().then(
  //     (response) => {
  //       console.log("response: ", response.data)
  //       setContent(response.data);
  //     },
  //     (error) => {
  //       const _content =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();
  //       setContent(_content);
  //     }
  //   );
  //   console.log(content)
  // }, []);

  return (
    <div>
      <header>
        <h3>dashboard</h3>
      </header>
      {
        currentUser === null && <p>to see the dashboard you need to <Link to="/">login</Link></p>
      }
      {
        currentUser !== null && currentUser.role === "admin" && <AdminDashboard />
      }
      {
        currentUser !== null && 
        <>
          <p>---BUG CARDS---</p>
          <p>(implicit) get all bug cards</p>
          <p>create a bug card</p>
          <p>update a bug card</p>
          <p>delete a bug card</p>
          <p>---FIND CARDS---</p>
          <p>get only TO DO cards</p>
          <p>get only DOING cards</p>
          <p>get only DONE cards</p>
          <p>(implicit) change bug's status</p>
          <p></p>
          <Link to="/profile">go to profile</Link>
        </>
      }
    </div>
  );
};

export default UserDashboard;
