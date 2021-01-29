// Native modules import
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Personal modules import
import { signin, logUserIn } from "../auth/index";

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      loading: false,
      redirection: false,
    };
  }

  signinForm = (email, password) => {
    return (
      <form action="">
        <div className="form-group">
          <label htmlFor="Email" className="text-muted">
            E-mail
          </label>
          <input
            onChange={this.handleChange("email")}
            type="email"
            className="form-control"
            value={email}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Password" className="text-muted">
            Mot de passe
          </label>
          <input
            onChange={this.handleChange("password")}
            type="password"
            className="form-control"
            value={password}
            required
          />
        </div>
        <button
          onClick={this.signinSubmit}
          type="submit"
          className="btn btn-raised btn-primary"
        >
          Entrer dans la Taverne
        </button>
      </form>
    );
  };

  handleChange = (name) => (event) => {
    this.setState({
      error: "",
    });
    this.setState({
      [name]: event.target.value,
    });
  };

  signinSubmit = async (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const { email, password } = this.state;
    const user = { email, password };
    if ("" !== email && "" !== password) {
      let response;
      try {
        response = await signin(user);
      } catch (error) {
        console.error(`Couldn't retrive data using signin method.`);
      }
      if (response.error) {
        try {
          this.setState({
            loading: false,
            error: response.error,
          });
        } catch (error) {
          console.error(`Couldn't change state because of error: ${error}.`);
        }
      } else {
        try {
          logUserIn(response, () => {
            this.setState({
              redirection: true,
            });
          });
        } catch (error) {
          console.error(`Couldn't change state because of error: ${error}.`);
        }
      }
    } else {
      try {
        this.setState({
          loading: false,
          error: `Tu dois renseigner un e-mail et un mot de passe, sacrebleu !`,
        });
      } catch (error) {
        console.error(`Couldn't change state because of error: ${error}.`);
      }
    }
  };

  render() {
    const { email, password, error, redirection, loading } = this.state;
    if (redirection) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        {loading ? (
          <div
            className="jumbotron"
            style={{
              margin: "0",
              padding: "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vw",
              width: "100vw",
            }}
          >
            <h3
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Chargement...
            </h3>
          </div>
        ) : (
          <div className="container jumbotron">
            <h2 className="mt-5 mb-5">Bienvenue, moussaillon !</h2>

            <div
              className="alert alert-warning"
              style={{ display: error ? "" : "none" }}
            >
              {error}
            </div>

            {this.signinForm(email, password)}
          </div>
        )}
      </div>
    );
  }
}

export default Signin;
