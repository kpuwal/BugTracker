import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../redux/store';
import { logout } from '../redux/slices/auth.slice';

type AuthVerifyTypes = {
  children: React.ReactNode,
}

const parseJwt = (token: string) => {
  try {
    return JSON.parse((token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

const AuthVerify = ({children}: AuthVerifyTypes) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
      // @ts-ignore
      const token = JSON.parse(localStorage.getItem("token")) as string;
      if(token) {
        const decodedJwt = parseJwt(token);
        console.log(decodedJwt.exp * 1000 < Date.now(), " expiry")
        if (decodedJwt.exp * 1000 < Date.now()) {
          dispatch(logout());
          navigate('/');
        }
      }
   })
   return (
     <div>{children}</div>
   )
  }

// class AuthVerify extends Component {
//   constructor(props) {
//     super(props);
//     props.history.listen(() => {
//       // @ts-ignore
//       const user = JSON.parse(localStorage.getItem("user")) as TokenUser;
//       if (user) {
//         const decodedJwt = parseJwt(user.accessToken);
//         if (decodedJwt.exp * 1000 < Date.now()) {
//           props.logOut();
//         }
//       }
//     });
//   }
//   render() {
//     return <div></div>;
//   }
// }

export default AuthVerify;