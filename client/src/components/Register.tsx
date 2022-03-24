import React, { useState, useEffect  } from "react";
import { RootState, useAppDispatch } from '../redux/store';

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { register } from "../redux/slices/auth.slice";
import { clearMessage } from "../redux/slices/message.slice";

type RegisterTypes = {
  name: string,
  email: string,
  password: string,
  repeatPassword?: string,
}

const Register = () => {
  // const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { message } = useSelector((state: RootState) => state.message);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearMessage());
    console.log("is logged? ", isLoggedIn)

  }, [dispatch, isLoggedIn]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup
      .string()
      .required("This field is required!"),
    email: Yup
      .string()
      .required("This field is required!")
      .email("it's not an email"),
    password: Yup
      .string()
      .required("This field is required!")
      .min(6, "Password is too short - should be 6 chars minimum"),
    repeatPassword: Yup
      .string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password confirm is required'),
  });

  const handleRegister = (formValue: RegisterTypes) => {
    const { name, email, password } = formValue;
    setSuccessful(false);
    dispatch(register({ name, email, password }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <div>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <>
                <div>
                  <label>Name</label>
                  <Field name="name" type="text" />
                  <ErrorMessage
                    name="name"
                    component="div"
                  />
                </div>
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
                  <label>Confirm Password</label>
                  <Field name="repeatPassword" type="password" />
                  <ErrorMessage
                    name="repeatPassword"
                    component="div"
                  />
                </div>
                <div>
                  <button type="submit">
                    <span>Register</span>
                  </button>
                </div>
              </>
            )}
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
      <Link to="/" className="text-blueGray-800">
        <small>Back to Login</small>
      </Link>
    </div>
  );
};
export default Register;
