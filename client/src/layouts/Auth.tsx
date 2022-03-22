import Login from "../views/auth/Login";
// import Background from '../assets/img/bg.png';

type AuthProps = {
  register?: boolean,
}

export default function Auth({register}: AuthProps) {
  return (
    <main>
      <div className="absolute top-0 w-full h-full bg-blueGray-100 bg-no-repeat">
        <div className="absolute w-full h-full py-1 min-h-screen">
          <Login {...{register}} />
        </div>
      </div>
    </main>
  );
}
