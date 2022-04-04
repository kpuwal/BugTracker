import { Link } from 'react-router-dom';

const ModeratorDashboard = () => {
  return (
    <>
      <p>---CARDS---</p>
      <p><Link to="/createcard">create a bug's card</Link></p>
      <p><Link to="/users">get all users</Link></p>
      <p>delete a bug's card</p>

      <p>---TEAMS---</p>
      <p>(implicit) get all teams</p>
      <p>create a team</p>
      <p>update a team</p>
      <p>delete a team</p>
    </>
  );
};

export default ModeratorDashboard;
