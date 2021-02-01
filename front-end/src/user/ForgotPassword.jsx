// Native modules import
import React, { Component } from "react";

// Personal modules import
import { forgotPassword } from "../auth/index";

class ForgotPassword extends Component {
  state = {
    email: "",
    message: "",
    error: "",
  };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     email: "",
  //     message: "",
  //     error: "",
  //   };
  // }

  forgotPassword = async (event) => {
    event.preventDefault();
    this.setState({
      message: "",
      error: "",
    });
    try {
      const data = await forgotPassword(this.state.email);
      if (data.error) {
        console.log(
          `There is an error with the data retrieved in forgotPassword in ForgotPassword: ${data.error}.`
        );
        this.setState({
          error: data.error,
        });
      } else {
        console.info(
          `This is data.message inside forgotPassword in ForgotPassword: ${data.message}.`
        );
        this.setState({
          message: data.message,
        });
      }
    } catch (error) {
      console.error(
        `The method forgotPassword in ForgotPassword encountered an error of type: ${error}.`
      );
    }
  };

  render() {
    return (
      <div className="container jumbotron">
        <h2 className="mt-5 mb-5">Réinitialisation du mot de passe</h2>

        {this.state.message && (
          <h5 className="alert alert-warning">{this.state.message}</h5>
        )}
        {this.state.error && (
          <h5 className="alert alert-danger">{this.state.error}</h5>
        )}

        <form>
          <div className="form-group mt-5">
            <input
              type="email"
              className="form-control"
              placeholder="L'adresse e-mail liée à votre compte sur la Taverne des Soiffards."
              value={this.state.email}
              name="email"
              onChange={(event) =>
                this.setState({
                  email: event.target.value,
                  message: "",
                  error: "",
                })
              }
              autoFocus
            />
          </div>
          <button
            onClick={this.forgotPassword}
            className="btn btn-raised btn-primary"
          >
            Envoyer le lien de réinitialisation
          </button>
        </form>
      </div>
    );
  }
}

export default ForgotPassword;
