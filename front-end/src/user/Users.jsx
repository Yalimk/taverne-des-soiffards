// Native modules import
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Personal modules import
import { listAllUsers } from "./apiUser";
import defaultProfilePic from "../images/default-image.png";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount = async () => {
    try {
      const allUsers = await listAllUsers();
      if (allUsers) {
          this.setState({
            users: allUsers,
          });
          // console.log('all users: ', allUsers);
        } else {
        console.error(
          `No users were retrieved from the server because of error.`
        );
      }
    } catch (error) {
      console.error(`Couldn't list all users because of error: ${error}.`)
    }
  };

  renderUsers = (users) => (
    <div className="row">
      {users.map((user, i) => (
        <div
        className="card card-block col-sm-12 col-md-6 col-lg-4 col-xl-3"
        key={i}
        style={{
          backgroundColor: "#D5E5F2",
          marginRight: "30px",
          marginBottom: "30px",
        }}
        >
          <img
            style={{ height: "auto", width: "auto", marginTop: "15px", borderRadius: "50%" }}
            src={`${process.env.REACT_APP_API_URI}/user/photo/${user._id}`}
            onError={(img) => (img.target.src = `${defaultProfilePic}`)}
            className="img-thumbnail mb-3"
            alt={user.pseudo}
          />
          <div className="card-body" key={i}>
            <h5 className="card-title">{user.pseudo}</h5>
            <p className="card-text">{user.about}</p>
            <Link
              to={`/user/${user._id}`}
              className="btn btn-raised btn-primary btn-sm"
                style={{
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  marginBottom: "15px",
                }}
            >
              Visiter sa planque
            </Link>
          </div>
        </div>
      ))}
    </div>
  );

  render() {
    const { users } = this.state;
    return (
      <div className="jumbotron">
        <h2 className="mt-3 mb-3">Les pirates de la Taverne</h2>
        {this.renderUsers(users)}
      </div>
    );
  }
}

export default Users;
