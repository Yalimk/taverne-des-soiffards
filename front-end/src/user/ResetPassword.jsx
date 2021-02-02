// Native modules import
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Personal modules import
import { resetPassword } from "../auth/index";

class ResetPassword extends Component {
  state = {
    newPassword: "",
    message: "",
    error: "",
    redirectionHome: false,
  };

  resetPassword = async (event) => {
    event.preventDefault();
    this.setState({ message: "", error: "" });
    try {
      console.info(
        `[ResetPassword resetPassword front-end] : newPassword (avant le fetch): ${this.state.newPassword}`
      );
      console.info(
        `[ResetPassword resetPassword front-end] : this.props.match.params.resetPasswordToken (avant le fetch): ${this.props.match.params.resetPasswordToken}`
      );
      const data = await resetPassword({
        newPassword: this.state.newPassword,
        resetPasswordLink: this.props.match.params.resetPasswordToken,
      });
      console.log(`[ResetPassword resetPassword front-end] : data: ${data}`);
      if (data.error) {
        this.setState({ error: data.error, newPassword: "" });
        console.error(
          `[ResetPassword resetPassword front-end] : data.error: ${data.error}`
        );
      } else {
        this.setState({ message: data.message, newPassword: "" });
        console.info(
          `[ResetPassword resetPassword front-end] : data.message: ${data.message}`
        );
      }
    } catch (error) {
      console.error(`Password couldn't be reset because of error: ${error}`);
    }
  };

  render() {
    const { newPassword, redirectionHome, message, error } = this.state;
    if (redirectionHome) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container jumbotron">
        <h2 className="mt-5 mb-5">Modification du mot de passe</h2>

        {message && <h5 className="alert alert-warning">{message}</h5>}
        {error && <h5 className="alert alert-danger">{error}</h5>}

        <form>
          <div className="form-group mt-5">
            <input
              type="password"
              className="form-control"
              placeholder="Choisis ton nouveau mot de passe... et tâche de le noter cette fois-ci, mille sabords !"
              value={newPassword}
              name="newPassword"
              onChange={(event) =>
                this.setState({
                  newPassword: event.target.value,
                  message: "",
                  error: "",
                })
              }
              autoFocus
            />
          </div>
          <button
            onClick={this.resetPassword}
            className="btn btn-raised btn-primary"
          >
            Modifier le mot de passe
          </button>
        </form>
      </div>
    );
  }
}

export default ResetPassword;
