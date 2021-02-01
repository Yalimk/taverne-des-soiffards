// Native modules import
import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

// Personal modules import
import { resetPassword } from "../auth/index";

class ResetPassword extends Component {
  state = {
    newPassword: "",
    message: "",
    error: "",
    redirectionHome: false,
  };
  // constructor(props) {
  //   super(props)
  //   this.state = props;
  // }

  startResetProcess = async (event) => {
    const { newPassword, message, error } = this.state;
    event.preventDefault();
    this.setState({
      message: "",
      error: "",
    });
    try {
      console.info(`resetPasswordToken avant le fetch: ${this.props.match.params.resetPasswordToken}.`)
      const data = await resetPassword({
        newPassword: newPassword,
        resetPasswordLink: this.props.match.params.resetPasswordToken,
      });
      if (data.error) {
        this.setState({
          error: data.error,
        });
        console.error(`An error occured: ${error}.`);
      } else {
        this.setState({
          message: data.message,
        });
        console.info(`Message received inside data: ${message}`);
      }
    } catch (error) {
      console.error(`Password couldn't be reset because of error: ${error}.`);
    }
  };

  render() {
    const { newPassword, redirectionHome } = this.state;
    if (redirectionHome) {
      return <Redirect to="/" />
    }
    return (
      <div className="container jumbotron">
        <h2 className="mt-5 mb-5">Modification du mot de passe</h2>

        {this.state.message && (
          <h5 className="alert alert-warning">{this.state.message}</h5>
        )}
        {this.state.error && (
          <h5 className="alert alert-danger">{this.state.error}</h5>
        )}

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
            onClick={this.startResetProcess}
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
