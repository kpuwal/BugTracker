import React, { useState, useEffect  } from "react";
import { RootState, useAppDispatch } from '../redux/store';

import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../redux/slices/auth.slice";
import { clearMessage } from "../redux/slices/message.slice";

type LoginTypes = {
  email: string,
  password: string,
}

function Redirect({ to }: any) {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { message } = useSelector((state: RootState) => state.message);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    email: "",
    password: "",
  }

  const validationSchema = Yup.object({
    email: Yup
      .string()
      .required("This field is required!")
      .email("it's not an email"),
    password: Yup
      .string()
      .required("This field is required!")
      .min(6, "Password is too short - should be 6 chars minimum"),
  });

  const handleLogin = (formValue: LoginTypes) => {
    const { email, password } = formValue;
    setLoading(true);
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/dashboard"); // or props.history.push("/profile")
        // window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  }

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />
  }
  
  return (
    <>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div>
              <label>Email</label>
              <Field name="email" type="text" />
              <ErrorMessage
                name="email"
                component="div"
              />
            </div>
            <div>
              <label>Password</label>
              <Field name="password" type="password" />
              <ErrorMessage
                name="password"
                component="div"
              />
            </div>
            <div>
              <button type="submit" disabled={loading}>
                <span>Login</span>
              </button>
              {loading && (<span>loading...</span>)}
            </div>
          </Form>
        </Formik>
      </div>
      {message && (<div>{message}</div>)}
      <Link to="/register">
        <small>Create new account</small>
      </Link>
    </>
  )
}

export default Login;
