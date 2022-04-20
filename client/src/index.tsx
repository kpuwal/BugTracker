import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';

import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import UserDashboard from './components/dashboards/UserDashboard';
import CreateCard from './components/card/CreateCard';
import UsersDeck from './components/user/UsersDeck';
import CardsDeck from './components/card/CardsDeck';
import EditCardRoute from './components/card/EditCardRoute';
import Edit from './components/card/Edit';

import {store, persistor} from './redux/store';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<UserDashboard />}></Route>
          <Route path="/createcard" element={<CreateCard />}></Route>
          <Route path="/users" element={<UsersDeck />}></Route>
          <Route path="cards" element={<CardsDeck />} />
          <Route path="card" element={<EditCardRoute/>}>
            <Route path=":id" element={<Edit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
