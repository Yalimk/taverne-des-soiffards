// Native modules import
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Personal modules import
import { isLoggedIn, signout } from "../auth/index";
import { remove } from "./apiUser";

class DeleteUser extends Component {
  state = {
    redirectionSignIn: false,
    allMighty: true,
  };

  componentDidMount() {
    if (isLoggedIn().user.right === "Roi des Pirates") {
      this.setState({ allMighty: true });
    }
  };

  deleteAccount = async () => {
    const token = isLoggedIn().token;
    const userId = this.props.userId;
    try {
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
            redirectionSignIn: true,
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
    const { redirectionSignIn, allMighty } = this.state;
    if (redirectionSignIn) {
      return <Redirect to="/signin" />;
    }
    
    if (allMighty) {
      return (
        <button
          onClick={this.deleteConfirmation}
          className="btn btn-raised btn-danger"
        >
          Supprimer en tant que Roi
        </button>
      );
    } else {
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
}

export default DeleteUser;
