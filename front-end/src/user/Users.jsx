// Native modules import
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Personal modules import
import { /*usersPerPage*/ listAllUsers } from "./apiUser";
import defaultProfilePic from "../images/default-image.png";

class Users extends Component {
  state = {
    users: [],
    // page: 1
  };

  listAllUsers = async () => {
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
      console.error(`Couldn't list all users because of error: ${error}.`);
    }
  };

  // getMoreUsers = (num) => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.loadUsers(this.state.page + num);
  // };

  // getLessUsers = (num) => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.loadUsers(this.state.page - num);
  // };

  // componentDidMount = async () => {
  //   this.loadUsers(this.state.page);
  // };

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
      console.error(`Couldn't list all users because of error: ${error}.`);
    }
  };

  renderUsers = (users) => (
    <div
      className="row"
      style={{ justifyContent: "center", position: "relative" }}
    >
      {users.map((user, i) => {
        const { photo, _id, pseudo, about } = user;
        if (photo) {
          return (
            <div
              className="card card-block col-sm-12 col-md-6 col-lg-4 col-xl-3"
              key={i}
              style={{
                backgroundColor: "#D9D9D9",
                marginRight: "30px",
                marginBottom: "30px",
                boxShadow: "3px 3px 5px grey",
              }}
            >
              <img
                style={{
                  height: "auto",
                  width: "auto",
                  marginTop: "15px",
                  borderRadius: "25%",
                }}
                src={`${process.env.REACT_APP_API_URI}/user/photo/${_id}`}
                onError={(img) => (img.target.src = `${defaultProfilePic}`)}
                className="img-thumbnail mb-3"
                alt={pseudo}
              />

              <div className="card-body d-flex flex-column" key={i}>
                <h5 className="card-title text-center font-weight-bold">
                  {pseudo}
                </h5>
                <p className="card-text text-justify lead">{about}</p>
              </div>

              <Link
                to={`/user/${_id}`}
                className="btn btn-lg btn-block btn-outline-success text-center font-weight-bold"
              >
                Visiter sa planque
              </Link>
            </div>
          );
        } else {
          return (
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
                style={{
                  height: "auto",
                  width: "auto",
                  marginTop: "15px",
                  borderRadius: "50%",
                }}
                src={`${defaultProfilePic}`}
                onError={(img) => (img.target.src = `${defaultProfilePic}`)}
                className="img-thumbnail mb-3"
                alt={pseudo}
              />
              <div className="card-body d-flex flex-column" key={i}>
                <h5 className="card-title text-center">{pseudo}</h5>
                <p className="card-text lead mb-3">{about}</p>
                <Link
                  to={`/user/${_id}`}
                  className="btn btn-lg btn-block btn-outline-success text-center font-weight-bold"
                >
                  Visiter sa planque
                </Link>
              </div>
            </div>
          );
        }
      })}
    </div>
  );

  render() {
    const { users/*, page*/} = this.state;
    return (
      <div className="jumbotron">
        <h2 className="mt-3 mb-3 text-center" style={{ fontWeight: "bold" }}>
          Les pirates de la Taverne
        </h2>
        {this.renderUsers(users)}

        {/* <div className="row">
          <div className="col text-right">
            {page > 1 ? (
              <button
                className="btn btn-raised btn-info mt-5 mb-5"
                onClick={() => this.getLessUsers(1)}
                style={{boxShadow: "3px 3px 5px grey"}}
              >
                Page précédente
              </button>
            ) : (
              ""
            )}
          </div>

          <div className="col text-left">
            {users.length > page ? (
              <button
                className="btn btn-raised btn-info mt-5 mb-5"
                onClick={() => this.getMoreUsers(1)}
                style={{boxShadow: "3px 3px 5px grey"}}
              >
                Page suivante
              </button>
            ) : (
              ""
            )}
          </div>
        </div> */}
      </div>
    );
  }
}

export default Users;
