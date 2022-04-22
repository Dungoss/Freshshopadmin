import React, { Suspense, lazy } from 'react';
import configLocalStorage from './utils/storage';
import 'antd/dist/antd.css';

import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from './components/Routers/index';
import {
  Row,
  Spin
} from 'antd';
const LoginPage = lazy(() => import('./views/Login/LoginPage'));
const HomePage = lazy(() => import('./views/HomePage'));
const ProfilePage = lazy(() => import('./views/ProfilePage'));
const UserPage = lazy(() => import('./views/UserPage'));
const NotFound = lazy(() => import('./views/NotFound/NotFoundPage'));


configLocalStorage();
// import NotFound from './components/NotFound';
export default function App() {
  return (
    <Suspense fallback={<Row align="middle" justify="center" style={{ width: '100vw', height: '100vh' }}><Spin></Spin></Row>}>
      <Router>
        <Switch>
          <PublicRoute component={LoginPage} path="/dang-nhap" />
          <PrivateRoute exact component={HomePage} path="/" />
          <PrivateRoute exact component={UserPage} path="/user" />
          <PrivateRoute exact component={ProfilePage} path="/profile" />
          <PrivateRoute exact={true} path="/*" component={NotFound} />
        </Switch>
      </Router>
    </Suspense>
  );
}