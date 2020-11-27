import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import RedirectPage from '../pages/RedirectPage';
import StatusPage from '../pages/StatusPage';
import PageNotFound from '../pages/PageNotFound';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/:code" component={RedirectPage} />
      <Route exact path="/:code/status" component={StatusPage} />
      <Route component={PageNotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
