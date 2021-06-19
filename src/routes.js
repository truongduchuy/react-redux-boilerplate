import Articles from 'components/Articles';
import ArticleDetails from 'components/ArticleDetails';
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/articles" component={Articles} />
        <Route exact path="/articles/:id" component={ArticleDetails} />
        <Redirect to="/articles" />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
