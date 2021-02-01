// Native modules import
import React from 'react';
import {Route, Switch} from 'react-router-dom';

// Components import
import Home from './core/Homepage';
import Menu from './core/Menu';
import Users from './user/Users';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Profile from './user/Profile';
import EditProfile from './user/EditProfile';
import Posts from './post/Posts';
import NewPost from './post/NewPost';
import OnePost from './post/OnePost';
import EditPost from './post/EditPost';
import ForgotPassword from './user/ForgotPassword';
import ResetPassword from './user/ResetPassword';
import AdminInterface from './admin/Admin';
import PrivateRoute from './auth/PrivateRoute';

const MainRouter = () => (
  <div>
    <Menu></Menu>
    <Switch>
      <Route exact path="/" component={Home} />
      <PrivateRoute exact path="/admin" component={AdminInterface} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword} />
      <Route exact path="/users" component={Users} />
      <PrivateRoute exact path="/posts" component={Posts} />
      <PrivateRoute exact path="/post/create" component={NewPost} />
      <PrivateRoute exact path="/post/:postId" component={OnePost} />
      <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
      <PrivateRoute exact path="/user/:userId" component={Profile} />
    </Switch>
  </div>
)

export default MainRouter;