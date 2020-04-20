import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import './index.css';
// import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AdminLayout from './layout/admin/AdminLayout';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './reducer/rootReducer';
import AuthLayout from './layout/auth/AuthLayout';
import { registerServiceWorker } from './config/register-sw';
import { messaging } from './config/init-fcm';
import { notification } from 'antd';
import * as authService from './service/authService';
import { setTokenSentToServer, isTokenSentToServer } from './util/auth';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

registerServiceWorker();

messaging.requestPermission()
  .then(async function () {
    if (!isTokenSentToServer()) {
      const token = await messaging.getToken();
      await authService.subscribeFirebaseToken(token);
      console.log('subscribed token');
      setTokenSentToServer(true);
    } else {
      console.log(`Token already sent to server so won't send it again unless it changes`);
    }
  })
  .catch(function (err) {
    setTokenSentToServer(false);
    console.log("Unable to get permission to notify.");
  });

messaging.onTokenRefresh(() => {
  messaging
    .getToken()
    .then(async (refreshedToken) => {
      console.log('Token refreshed.');
      await authService.subscribeFirebaseToken(refreshedToken);
      setTokenSentToServer(true);
    })
    .catch(err => {
      console.log('Unable to retrieve refreshed token ');
    });
});

messaging.onMessage((payloads) => {  
  const { notification: notificationData } = payloads;
  const { title, body } = notificationData;
  notification.info({
    message: title,
    description: body,
  });
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/admin' render={props => <AdminLayout {...props} />} />
        <Route path='/auth' render={props => <AuthLayout {...props} />} />
        <Redirect from='/' to='/admin/error/404' />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// serviceWorker.unregister();
