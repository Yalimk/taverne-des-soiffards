// Native modules import
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Components import
import Menu from "./components/core/Menu";
import Taverne from "./components/chat/Taverne";
import Users from "./components/user/Users";
import Signup from "./components/user/Signup";
import Signin from "./components/user/Signin";
import Profile from "./components/user/Profile";
import EditProfile from "./components/user/EditProfile";
import Posts from "./components/post/Posts";
import NewPost from "./components/post/NewPost";
import OnePost from "./components/post/OnePost";
import EditPost from "./components/post/EditPost";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import AdminInterface from "./components/admin/Admin";
import PrivateRoute from "./components/auth/PrivateRoute";

const App = () => (
  <BrowserRouter>
    <Menu />
    <Switch>
      <Route exact path="/" component={Taverne} />
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
  </BrowserRouter>
);

export default App;
