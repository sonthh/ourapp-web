import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AdminLayout from './layout/admin/AdminLayout';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducer/rootReducer';
import AuthLayout from './layout/auth/AuthLayout';
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/admin' render={props => <AdminLayout {...props} />} />
        <Route path='/auth' render={props => <AuthLayout {...props} />} />
        <Redirect from='/' to='/error/404' />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
