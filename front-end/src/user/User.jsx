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
    let allUsers;
    try {
      allUsers = await listAllUsers();
    } catch (error) {
      console.error(
        `The list of all users couldn't be retrieved because of error: ${error}.`
      );
    }
    if (allUsers) {
      try {
        this.setState({
          users: allUsers,
        });
      } catch (error) {
        console.error(
          `Couldn't change state of users because of error: ${error}.`
        );
      }
    } else {
      console.error(
        `No users were retrieved from the server because of error.`
      );
    }
  };

  renderUsers = (users) => (
    <div className="row">
      {users.map((user, i) => (
        <div
          className="card col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
          key={i}
        >
          <img
            className="card-img-top"
            src={defaultProfilePic}
            style={{ width: "100%", heigth: "15vw", objectFit: "cover" }}
            alt={user.pseudo}
          />
          <div className="card-body" key={i}>
            <h5 className="card-title">{user.pseudo}</h5>
            <p className="card-text">{user.email}</p>
            <p className="card-text">{user.backstory}</p>
            <Link
              to={`/user/${user._id}`}
              className="btn btn-raised btn-sm"
              style={{ color: "#5E8C5D" }}
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
