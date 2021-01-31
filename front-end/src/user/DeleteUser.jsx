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
    try {
      const token = isLoggedIn().token;
      const userId = this.props.userId;
      const response = await remove(userId, token);
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
          });
        } catch (error) {
          console.error(`Couldn't signout because of error: ${error}.`);
        }
      }
    } catch (error) {
      console.error(
        `COuldn't get a response from server because of error: ${error}.`
      );
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
        Quitter définitivement la Taverne
      </button>
    );
  }
}

export default DeleteUser;
