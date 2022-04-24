import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { message } from 'antd'
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
        if(!userLocal?.role || userLocal?.role === 'USER') {
          message.error("Bạn không có quyền")
          return loginCompoent;
        }
        if(userLocal?.status === 'BLOCK') {
          message.error("Tài khoản của bạn đã bị khóa")
          return loginCompoent;
        }
        //check login
        if (!accessToken) return loginCompoent;
        return componentRender

      }}
    />
  )
}