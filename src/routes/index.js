import React from 'react';
import {
  Route,
  IndexRoute,
  Redirect,
} from 'react-router';
import {
  AppView,
  UserView,
  UsersView,
  NotFoundView,
} from '../views';

export default (
  <Route path="/" component={AppView}>
    <IndexRoute component={UsersView} />
    <Route path="user/new" component={UserView} />
    <Route path="user/:userId" component={UserView} />

    <Route path="*" component={NotFoundView} />
    <Redirect from="*" to="404" />
  </Route>
);
