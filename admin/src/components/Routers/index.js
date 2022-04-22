import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      <Component {...props} />
    )} />
  );
};

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (

    <Route
      {...rest}
      render={(props) => {
        let componentRender = <Component {...props} />;
        let accessToken = localStorage.getItem('accessToken')
        let loginCompoent = <Redirect
              to='/dang-nhap'
            />
        let userLocal = localStorage.getObject('user');
        if(!userLocal?.role || userLocal?.role === 'USER' || userLocal?.status === 'BLOCK') return loginCompoent;
        //check login
        if (!accessToken) return loginCompoent;
        return componentRender

      }}
    />
  )
}