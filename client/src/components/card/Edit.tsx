import React, { useState } from "react";
import { RootState, useAppDispatch } from '../../redux/store';
import { Link, Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { createCard } from "../../redux/slices/card.slice";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

type InitialValuesTypes = {
  title: string;
  description: string;
  category?: string;
}


const EditCard = () => {
const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state: RootState) => state.message);
  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
console.log(id)
  const initialValues = {
    title: "",
    description: "",
    category: ""
  };

  const validationSchema = Yup.object({
    title: Yup
      .string()
      .required("This field is required!"),
    description: Yup
      .string()
      .required("This field is required!"),
    category: Yup
      .string()
  });

  const handleCreateCard = (formValue: InitialValuesTypes) => {
    let createdBy;
    currentUser !== null ? createdBy = currentUser.name : createdBy = "";
    const { title, description, category } = formValue;
    setSuccessful(false);
    setLoading(true);
    dispatch(createCard({ title, description, category, createdBy}))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
        setLoading(false);
      });
  }

  return (
    <>
      <Outlet />
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreateCard}
        >
          <Form>
            {!successful && (
              <>
                <div>
                  <label>Title</label>
                  <Field name="title" type="text" />
                  <ErrorMessage
                    name="title"
                    component="div"
                  />
                </div>
                <div>
                  <label>Description</label>
                  <Field name="description" type="text" />
                  <ErrorMessage
                    name="description"
                    component="div"
                  />
                </div>
                <div>
                  <label>Category</label>
                  <Field name="category" type="text" />
                  <ErrorMessage
                    name="category"
                    component="div"
                  />
                </div>
                <div>
                  <button type="submit">
                    <span>Create a Card</span>
                  </button>
                  {loading && (<span>loading...</span>)}
                </div>
              </>
            )}
          </Form>
        </Formik>
      </div>
      {message && (<div>{message}</div>)}
      <Link to="/dashboard">
        <small>Back to dashboard</small>
      </Link>
    </>
  )
}

export default EditCard;
