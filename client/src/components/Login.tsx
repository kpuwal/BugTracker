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
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { message } = useSelector((state: RootState) => state.message);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    email: "",
    password: "",
  };

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
        navigate("/profile"); // or props.history.push("/profile")
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Redirect to="/profile" />;
  }

  return (
    <div>
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
                {loading && (
                  <span></span>
                )}
                <span>Login</span>
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      {message && (
        <div>
          <div>
            {message}
          </div>
        </div>
      )}
      <Link to="/register" className="text-blueGray-800">
        <small>Create new account</small>
      </Link>
    </div>
  );
};
export default Login;
