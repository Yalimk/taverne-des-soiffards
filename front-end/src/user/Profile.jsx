// Native modules import
import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

// Components import
import DeleteUser from "./DeleteUser";
import ProfileTabs from "./ProfileTabs";

// Personal modules import
import { isLoggedIn } from "../auth/index";
import { read } from "./apiUser";
import defaultProfilePic from "../images/default-image.png";
import { listUserPosts } from "../post/apiPost";

class Profile extends Component {
  state = {
    user: "",
    redirectionSignIn: false,
    posts: [],
  };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     user: "",
  //     redirectionSignIn: false,
  //     posts: [],
  //   };
  // }

  init = async (userId) => {
    try {
      const token = isLoggedIn().token;
      const data = await read(userId, token);
      if (data.error) {
        this.setState = {
          redirectionSignIn: true,
        };
      } else {
        // console.log("data (user) dans else de init de Profile: ", data);
        this.setState({
          user: data,
        });
        this.loadPosts(data._id);
      }
    } catch (error) {
      console.error(
        `The init method encountered the following error: ${error}.`
      );
    }
  };

  loadPosts = (userId) => {
    const token = isLoggedIn().token;
    listUserPosts(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };

  componentDidMount() {
    try {
      const userId = this.props.match.params.userId;
      if (userId) {
        this.init(userId);
      } else {
        console.error("No userId found.");
      }
    } catch (error) {
      console.error("Something went wrong with componentDidMount method.");
    }
  }

  componentWillReceiveProps(props) {
    try {
      const userId = props.match.params.userId;
      if (userId) {
        this.init(userId);
      } else {
        console.error("No userId found.");
      }
    } catch (error) {
      console.error(
        "Something went wrong with componentWillReceiveProps method."
      );
    }
  }

  render() {
    const { redirectionSignIn, user, posts } = this.state;
    // console.log('user.about dans render de Profile: ', user.about);
    // console.log('user dans render de Profile: ', user);
    if (redirectionSignIn) {
      return <Redirect to="/signin" />;
    }

    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URI}/user/photo/${
          user._id
        }?${new Date().getTime()}`
      : defaultProfilePic;

    return (
      <div className="container">
        <h3 className="mb-5 mt-5">{user.pseudo}</h3>
        <div className="row">
          <div className="col-md-4">
            <img
              style={{ height: "300px", width: "auto", borderRadius: "50%" }}
              className="img-thumbnail"
              src={photoUrl}
              onError={(img) => (img.target.src =`${defaultProfilePic}`)}
              alt={user.pseudo}
            />
          </div>

          <div className="col-md-8">
            <div className="lead mt-2">
              <p>{`Inscription : ${new Date(
                user.created
              ).toLocaleDateString()}`}</p>
              <p>{`E-mail : ${user.email}`}</p>
            </div>
            {isLoggedIn().user && isLoggedIn().user._id === user._id && (
              <div className="d-inline-block">
                <Link
                  to={`/post/create`}
                  className="btn btn-raised btn-info mr-5 mb-3"
                >
                  Poster un message
                </Link>
                <Link
                  to={`/user/edit/${user._id}`}
                  className="btn btn-raised btn-success mr-5 mb-3"
                >
                  Modifier les informations
                </Link>
                <DeleteUser userId={user._id} />
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-5">
            <hr />
            <p className="lead">{user.about}</p>
            <hr />

            <ProfileTabs
              posts={posts}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
