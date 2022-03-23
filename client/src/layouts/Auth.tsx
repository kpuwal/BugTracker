import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from './../redux/store';

import Login from "../views/auth/Login";

type AuthProps = {
  register?: boolean,
}

export default function Auth({register}: AuthProps) {
  const authData = useSelector((state: RootState) => state.auth);

  return (
    <main>
      <div className="absolute top-0 w-full h-full bg-blueGray-100 bg-no-repeat">
        <div className="absolute w-full h-full py-1 min-h-screen">
          <Login {...{register, authData}} />
        </div>
      </div>
    </main>
  );
}
