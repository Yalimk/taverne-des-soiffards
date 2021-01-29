// Native modules import
import React from 'react';
import {Route, Switch} from 'react-router-dom';

// Components import
import Home from './core/Homepage';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Menu from './core/Menu';
import Profile from './user/Profile';
import Users from './user/User';
import EditProfile from './user/EditProfile';
import DeleteUser from './user/DeleteUser';

const MainRouter = () => (
  <div>
    <Menu></Menu>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      {/* <Route exact path="/signout" component={Signin} /> */}
      <Route exact path="/user/:userId" component={Profile} />
      <Route exact path="/user/edit/:userId" component={EditProfile} />
      <Route exact path="/user/delete/:userId" component={DeleteUser} />
    </Switch>
  </div>
)

export default MainRouter;