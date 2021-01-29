/* eslint-disable no-useless-escape */
// Navite modules import
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Personal modules import
import { isLoggedIn } from "../auth/index";
import { read, updateUser } from "./apiUser";
// import { signout } from '../auth/index';

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      pseudo: "",
      email: "",
      password: "",
      redirectionProfile: false,
      error: "",
    };
  }

  init = async (userId) => {
    let token;
    try {
      token = isLoggedIn().token;
    } catch (error) {
      console.error(`Couldn't retrieve token because of error: ${error}.`);
    }
    if (token) {
      let data;
      try {
        data = await read(userId, token);
      } catch (error) {
        console.error(`Couldn't retrieve data because of error: ${error}.`);
      }
      if (data.error) {
        try {
          this.setState = {
            redirectionProfile: true,
          };
        } catch (error) {
          console.error(`Couldn't set state of redirectionProfile.`);
        }
      } else {
        try {
          this.setState({
            id: data._id,
            pseudo: data.pseudo,
            email: data.email,
            error: "",
          });
        } catch (error) {
          console.error(`Couldn't change the value of the state.`);
        }
      }
    } else {
      console.error(`Token inside init method is ${typeof token}.`);
    }
  };

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  isValid = () => {
    const { pseudo, email, password } = this.state;
    if (pseudo.length === 0 && email.length === 0 && password.length === 0) {
      this.setState({ error: "Il n'y a rien à changer, là, moussaillon !" });
      return false;
    } else {
      if (pseudo.length >= 1 && (pseudo.length < 4 || pseudo.length > 30)) {
        this.setState({
          error:
            "Ton pseudo doit faire entre 4 et 30 caractères, marin d'eau douce !",
        });
        return false;
      }
      if (
        password.length >= 1 &&
        !/^(?=(?:[^A-Z]*[A-Z]){1,}(?![^A-Z]*[A-Z]))(?=(?:[^a-z]*[a-z]){1,}(?![^a-z]*[a-z]))(?=(?:[^0-9]*[0-9]){1,}(?![^0-9]*[0-9]))(?=(?:[^!'#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~]*[!'#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~]){1,}(?![^!'#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~]*[!'#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~])).{8,}$/.test(
          password
        )
      ) {
        this.setState({
          error:
            "Ton mot de passe doit contenir au moins 8 caractères dont une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.",
        });
        return false;
      }
      if (
        email.length >= 1 &&
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        )
      ) {
        this.setState({
          error:
            "Tu dois renseigner une adresse de courrier électronique valide, moussailon !",
        });
        return false;
      }
      return true;
    }
  };

  updateSubmit = async (event) => {
    event.preventDefault();
    if (this.isValid()) {
      const { pseudo, email, password } = this.state;
      const user = {
        pseudo: pseudo || undefined,
        email: email || undefined,
        password: password || undefined,
      };
      const userId = this.props.match.params.userId;
      const token = isLoggedIn().token;
      let response;
      try {
        response = await updateUser(userId, token, user);
      } catch (error) {
        console.error(`Encore une erreur à la con...`);
      }
      if (response.error) {
        this.setState({ error: response.error });
      } else {
        this.setState({ redirectionProfile: true });
      }
    }
  };

  updateForm = (pseudo, email, password) => {
    return (
      <form action="">
        <div className="form-group">
          <label htmlFor="Name" className="text-muted">
            Pseudo
          </label>
          <input
            onChange={this.handleChange("pseudo")}
            type="text"
            className="form-control"
            value={pseudo}
            placeholder="Laisser vide pour conserver le pseudo actuel."
          />
        </div>
        <div className="form-group">
          <label htmlFor="Email" className="text-muted">
            E-mail
          </label>
          <input
            onChange={this.handleChange("email")}
            type="email"
            className="form-control"
            value={email}
            placeholder="Laisser vide pour conserver l'e-mail actuel."
          />
          <small id="emailHelp" className="form-text text-muted">
            Votre e-mail ne sera partagé avec aucune tierse partie
          </small>
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
            placeholder="Laisser vide pour conserver le mot de passe actuel."
          />
        </div>
        <button
          onClick={this.updateSubmit}
          type="submit"
          className="btn btn-raised btn-primary"
        >
          Modifier
        </button>
      </form>
    );
  };

  render() {
    const {
      id,
      pseudo,
      email,
      password,
      redirectionProfile,
      error,
    } = this.state;
    if (redirectionProfile) {
      return <Redirect to={`/user/${id}`} />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit Profile</h2>
        <div
          className="alert alert-warning"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {this.updateForm(pseudo, email, password)}
      </div>
    );
  }

  componentDidMount() {
    try {
      const userId = this.props.match.params.userId;
      if (userId) {
        this.init(userId);
      } else {
        console.error("No userId found.");
      }
    } catch (error) {
      console.error("Something went wrong with componentDidMount method.");
    }
  }
}

export default EditProfile;
