import React, { useState, useEffect } from "react";
import { RootState, useAppDispatch } from '../../redux/store';
import { Link, Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { updateCardContent, showCard } from "../../redux/slices/card.slice";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

type InitialValuesTypes = {
  title: string;
  description: string;
  category?: string;
}

const EditCard = () => {
  const { id: _id } = useParams() as {id: string};
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [edit, setEdit] = useState({
    title: false,
    description: false,
    category: false,
  });
  const card = useSelector((state: RootState) => state.card.activeCard);
  const {message} = useSelector((state: RootState) => state.message);
  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  
  const initialValues = {
    title: "",
    description: "",
    category: ""
  };

  const validationSchema = Yup.object({
    title: Yup
      .string(),
    description: Yup
      .string(),
    category: Yup
      .string()
  });

  useEffect(() => {
    dispatch(showCard({_id}))
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {console.log(error)})
  },[dispatch, _id]);


  const handleUpdateCard = (formValue: InitialValuesTypes) => {
    let { title, description, category } = formValue;
    if (title === '') title = card.title;
    if (description === '') description = card.description;
    if (category === '') category = card.category;
    const updCard = {title, description, category, createdBy: currentUser.name};

    dispatch(updateCardContent({_id, card: updCard}))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
        setLoading(false);
      });
  }

  const handleEdit = (str: string) => {
    switch(str) {
      case 'title': 
        setEdit({...edit, title: !edit.title});
        break;
      case 'description': 
        setEdit({...edit, description: !edit.description});
        break;
      case 'category':
        setEdit({...edit, category: !edit.category});
    }
  }

  return (
    <>
      <Outlet />
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleUpdateCard}
        >
          <Form>
            {!successful && (
              <>
                <div>
                  <label>Title</label>
                  {
                    edit.title ? <Field name="title" type="text" placeholder={card.title} /> : <p>{card.title}</p>
                  }
                  <button type="button" onClick={() => handleEdit('title')}>Edit Title</button>
                  <ErrorMessage
                    name="title"
                    component="div"
                  />
                </div>
                <div>
                  <label>Description</label>
                  {
                    edit.description ? <Field name="description" type="text" placeholder={card.description} /> : <p>{card.description}</p>
                  }
                  <button type="button" onClick={() => handleEdit('description')}>Edit Description</button>
                  <ErrorMessage
                    name="description"
                    component="div"
                  />
                </div>
                <div>
                  <label>Category</label>
                  {
                    edit.category ? <Field name="category" type="text" placeholder={card.category} /> : <p>{card.category}</p>
                  }
                  <button type="button" onClick={() => handleEdit('category')}>Edit Category</button>
                  <ErrorMessage
                    name="category"
                    component="div"
                  />
                </div>
                <div>
                  <button type="submit">
                    <span>Update a Card</span>
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
