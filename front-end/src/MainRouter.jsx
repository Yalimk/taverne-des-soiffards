// Native modules import
import React from 'react';
import {Route, Switch} from 'react-router-dom';

// Components import
import Home from './core/Homepage';
import Signup from './user/Signup';

const MainRouter = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
    </Switch>
  </div>
)

export default MainRouter;