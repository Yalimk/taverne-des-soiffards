// Native modules import
import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

// Personal modules import
import { isLoggedIn } from "../auth/index";
import { read } from "./apiUser";
import defaultProfilePic from "../images/default-image.png";
import DeleteUser from "./DeleteUser";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      redirectionSignIn: false,
    };
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.user.user_id !== state.user) {
  //     return {
  //       //...
  //     }
  //   } else {
  //     return null;
  //   }
  // };

  init = async (userId) => {
    let token;
    try {
      token = isLoggedIn().token;
    } catch (error) {
      console.error(`Couldn't retrieve token because of error: ${error}.`);
    }
    if (token) {
      let data;
      try {
        data = await read(userId, token);
      } catch (error) {
        console.error(`Couldn't retrieve data because of error: ${error}.`);
      }
      if (data) {
        try {
          if (data.error) {
            try {
              this.setState = {
                redirectionSignIn: true,
              };
            } catch (error) {
              console.error(`Couldn't set state of redirectionSignIn.`);
            }
          } else {
            try {
              this.setState({
                user: data,
              });
            } catch (error) {
              console.error(`Couldn't set state or of user.`);
            }
          }
        } catch (error) {
          console.error(
            `No error property inside data object was found because of error: ${error}.`
          );
        }
      } else {
        console.error(`No data object was found.`);
      }
    } else {
      console.error(`Token inside init method is ${typeof token}.`);
    }
  };

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
  };

  render() {
    const { redirectionSignIn, user } = this.state;
    if (redirectionSignIn) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container">
        <h3 className="mb-5 mt-5">Planque de {user.pseudo}</h3>
        <div className="row">
          <div className="col-md-6">
            <img
              className="card-img-top"
              src={defaultProfilePic}
              style={{ width: "100%", height: "20vw", objectFit: "cover" }}
              alt={user.pseudo}
            />
          </div>

          <div className="col-md-6">
            <div className="lead mt-2">
              <p>Hello {user.pseudo}</p>
              <p>{`Inscription : ${new Date(
                user.created
              ).toLocaleDateString()}`}</p>
              <p>{`E-mail : ${user.email}`}</p>
            </div>
            {isLoggedIn().user && isLoggedIn().user._id === user._id && (
              <div className="d-inline-block">
                <Link
                  to={`/user/edit/${user._id}`}
                  className="btn btn-raised btn-success mr-5"
                >
                  Modifier
                </Link>
                <DeleteUser userId={user._id}/>
              </div>
            )}
          </div>
        </div>
      </div>
    );
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
};

export default Profile;
