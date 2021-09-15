import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = (props) => {
  // check if user is logged in
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));

  if (!isLoggedIn) return <Redirect to="/login" />;
  else return <Route {...props} />;
};

export default PrivateRoute;
