// import React, { useState, useEffect } from "react";
// import UserService from "../../services/user.service";
import { Link } from 'react-router-dom';
// import { useSelector } from "react-redux";
// import { RootState } from '../../redux/store';

const Dashboard = () => {
  // const [content, setContent] = useState("");
  // const { user: currentUser } = useSelector((state: RootState) => state.auth);

  // useEffect(() => {
  //   console.log(currentUser)
  //   // UserService.getDashboard(currentUser === null ? "user" : currentUser.roles).then(
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
  // }, [currentUser]);

  return (
    <div>
      <header>
        <h3>{}</h3>
      </header>
      <Link to="/profile">go to profile</Link>
    </div>
  );
};

export default Dashboard;
