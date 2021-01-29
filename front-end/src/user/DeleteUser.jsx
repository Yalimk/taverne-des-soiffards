// Native modules import
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Personal modules import
import { isLoggedIn } from "../auth/index";
import { remove } from "./apiUser";
import { signout } from "../auth/index";

class DeleteUser extends Component {
  state = {
    redirection: false,
  };

  deleteAccount = async () => {
    let token;
    let response;
    try {
      token = isLoggedIn().token;
    } catch (error) {
      console.error(`Couldn't get the token because of error: ${error}.`);
    }
    if (token) {
      const userId = this.props.userId;
      try {
        response = await remove(userId, token);
      } catch (error) {
        console.error(
          `COuldn't get a response from server because of error: ${error}.`
        );
      }
      if (response.error) {
        console.error(
          `An error occured during account deletion: ${response.error}.`
        );
      } else {
        try {
          signout(() => {
            console.log(`User has been deleted.`);
          });
          this.setState({
            redirection: true,
          })
        } catch (error) {
          console.error(`Couldn't signout because of error: ${error}.`)
        }
      }
    } else {
      console.error(`There is no valid token.`);
    }
  };

  deleteConfirmation = () => {
    let answer = window.confirm(
      "Tu vas détruire ton profil, moussaillon, tu es sûr ?"
    );
    if (answer) {
      this.deleteAccount();
    }
  };

  render() {
    if (this.state.redirection) {
      return <Redirect to="/"/>
    }
    return (
      <button
        onClick={this.deleteConfirmation}
        className="btn btn-raised btn-danger"
      >
        Supprimer
      </button>
    );
  }
}

export default DeleteUser;
