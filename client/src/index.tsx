import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';

import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import UserDashboard from './components/dashboards/UserDashboard';
import CreateCard from './components/card/CreateCard';

import store from './redux/store';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<UserDashboard />}></Route>
        <Route path="/createcard" element={<CreateCard />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
