import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from '../../redux/store';
import AdminDashboard from './AdminDashboard';
import ModeratorDashboard from './ModeratorDashboard';
import '../../App.css';

import CardsDeck from '../card/CardsDeck';

const UserDashboard = () => {
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <header>
        <h3>dashboard</h3>
        <h5>Hello{currentUser !== null ? ` ${currentUser.name}!` : "!"}</h5>
      </header>
      <div className="container">
        <div className="left">
        {
          currentUser === null && <p>to see the dashboard you need to <Link to="/">login</Link></p>
        }
        {
         ( currentUser !== null && currentUser.roles.admin) && <AdminDashboard />
        }
        {
          (currentUser !== null && (currentUser.roles.moderator || currentUser.roles.admin)) && <ModeratorDashboard />
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
          <CardsDeck />
        </div>
      </div>
    </div>
  );
};


export default UserDashboard;
