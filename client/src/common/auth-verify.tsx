import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TokenUser } from '../types';
import { useAppDispatch } from '../redux/store';
import { logout } from '../redux/slices/auth.slice';

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

const AuthVerify = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
      // @ts-ignore
      const user = JSON.parse(localStorage.getItem("user")) as TokenUser;
      if(user) {
        const decodedJwt = parseJwt(user.accessToken);
        console.log(decodedJwt.exp * 1000 < Date.now(), " expiry")
        if (decodedJwt.exp * 1000 < Date.now()) {
          dispatch(logout());
          navigate('/');
        }
      }
      console.log("inside the auth-verify ", user)
   })
   return (
     <div></div>
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