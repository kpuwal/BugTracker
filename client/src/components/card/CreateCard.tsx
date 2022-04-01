import React, { useState } from "react";
import { RootState, useAppDispatch } from '../../redux/store';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { cardTypes } from '../../types';

import { createCard } from "../../redux/slices/card.slice";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const CreateCard = () => {
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state: RootState) => state.message);
  const dispatch = useAppDispatch();

  const initialValues = {
    title: "",
    description: ""
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

  const handleCreateCard = (formValue: cardTypes) => {
    const { title, description, category } = formValue;
    setSuccessful(false);
    setLoading(true);
    dispatch(createCard({ title, description, category}))
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

export default CreateCard;
