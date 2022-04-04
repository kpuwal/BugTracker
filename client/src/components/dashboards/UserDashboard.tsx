import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from '../../redux/store';
import AdminDashboard from './AdminDashboard';
import ModeratorDashboard from './ModeratorDashboard';
import '../../App.css';

import Cards from '../card/Cards';

const UserDashboard = () => {
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <header>
        <h3>dashboard</h3>
      </header>
      <div className="container">
        <div className="left">
        {
          currentUser === null && <p>to see the dashboard you need to <Link to="/">login</Link></p>
        }
        {
          currentUser !== null && currentUser.role === "admin" && <AdminDashboard />
        }
        {
          currentUser !== null && (currentUser.role === "moderator" || currentUser.role === "admin") && <ModeratorDashboard />
        }
        {
          currentUser !== null && 
          <>
            <p>---MY PROFILE---</p>
            <p>my TEAMS</p>
            <p>my CARDS</p>
            <p>---BUG CARDS---</p>
            <p>(implicit) get all bug cards</p>
            <p>update a bug card</p>
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
        <div className="right">
          <Cards />
        </div>
      </div>
    </div>
  );
};


export default UserDashboard;
