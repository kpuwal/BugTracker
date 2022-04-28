import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../redux/store';
import { logout } from '../redux/slices/auth.slice';

type AuthVerifyTypes = {
  children: React.ReactNode,
}

const parseJwt = (token: string) => {
  try {
    return JSON.parse(window.atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = ({children}: AuthVerifyTypes) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      // @ts-ignore
      const token = JSON.parse(localStorage.getItem("token")) as string;
      if(token) {
        const decodedJwt = parseJwt(token);
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

export default AuthVerify;
