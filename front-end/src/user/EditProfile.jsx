/* eslint-disable no-useless-escape */
// Navite modules import
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Personal modules import
import { isLoggedIn } from "../auth/index";
import { read, updateUser, updateInfo } from "./apiUser";
import defaultProfilePic from "../images/default-image.png";

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
      fileSize: 0,
      loading: false,
      about: "",
    };
  }

  init = async (userId) => {
    try {
      const token = isLoggedIn().token;
      const data = await read(userId, token);
      if (data.error) {
        this.setState = {
          redirectionProfile: true,
        };
      } else {
        this.setState({
          id: data._id,
          pseudo: data.pseudo,
          email: data.email,
          about: data.about, // this used to be data.about || "" (don't rembember why I wrote it as such, maybe this will solve my bug of the bio not being rendered)
          error: "",
        });
      }
    } catch (error) {
      console.error(`The init method encountered the following error: ${error}`);
    }
  };

  componentDidMount() {
    this.userData = new FormData();
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

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize =
      name === "photo" ? event.target.files[0].size : 0;
    this.userData.set(name, value);
    this.setState({
      [name]: value,
      fileSize,
    });
  };

  isValid = () => {
    const { pseudo, email, password, fileSize, about } = this.state;
    if (
      pseudo.length === 0 &&
      email.length === 0 &&
      password.length === 0 &&
      about.length === 0
    ) {
      this.setState({
        loading: false,
        error: "Il n'y a rien à changer, là, moussaillon !",
      });
      return false;
    } else {
      if (fileSize > 1000000) {
        this.setState({
          loading: false,
          error: "Le poids du fichier ne doit pas dépasser 1Mb ! Déconne pas !",
        });
        return false;
      }
      if (pseudo.length >= 1 && (pseudo.length < 4 || pseudo.length > 30)) {
        this.setState({
          loading: false,
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
          loading: false,
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
          loading: false,
          error:
            "Tu dois renseigner une adresse de courrier électronique valide, moussailon !",
        });
        return false;
      }
      if (about.length > 300) {
        this.setState({
          loading: false,
          error: `Tu te présentes, moussaillon, tu ne rédiges pas ta biographie ! Pas plus de 300 caractères !`,
        });
        return false;
      }
      return true;
    }
  };

  updateSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    if (this.isValid()) {
      const userId = this.props.match.params.userId;
      const token = isLoggedIn().token;
      // console.log(
      //   `INSIDE UPDATESUBMIT, userId: ${userId} and token: ${token} and this.userData: ${this.userData}`
      // );
      const data = await updateUser(userId, token, this.userData);
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        updateInfo(data, () => {
          this.setState({ redirectionProfile: true });
        });
      }
    }
  };

  updateForm = (pseudo, email, password, about) => (
    <form action="">
      <div className="form-group">
        <label className="text-muted">Photo de profil (ou de face...)</label>
        <input
          onChange={this.handleChange("photo")}
          type="file"
          accept="image/*"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Pseudo</label>
        <input
          onChange={this.handleChange("pseudo")}
          type="text"
          className="form-control"
          value={pseudo}
          placeholder="Laisser vide pour conserver le pseudo actuel."
          autoFocus
        />
      </div>
      <div className="form-group">
        <label className="text-muted">E-mail</label>
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
        <label className="text-muted">Mot de passe</label>
        <input
          onChange={this.handleChange("password")}
          type="password"
          className="form-control"
          value={password}
          placeholder="Laisser vide pour conserver le mot de passe actuel."
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Bio</label>
        <textarea
          onChange={this.handleChange("about")}
          type="text"
          className="form-control"
          value={about}
          // placeholder="Raconte-nous ton histoire, flibustier ! Ou raconte des conneries, c'est toi qui vois..."
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

  render() {
    const {
      id,
      pseudo,
      email,
      password,
      redirectionProfile,
      error,
      loading,
      about,
    } = this.state;
    if (redirectionProfile) {
      return <Redirect to={`/user/${id}`} />;
    }

    const photoUrl = id
      ? `${
          process.env.REACT_APP_API_URI
        }/user/photo/${id}?${new Date().getTime()}`
      : defaultProfilePic;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit Profile</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {loading ? (
          <div className="jumbotron text-center">
            <h3>Chargement...</h3>
          </div>
        ) : (
          ""
        )}
        
        <img
          style={{ height: "200px", width: "auto" }}
          className="img-thumbnail"
          src={photoUrl}
          onError={(img) => (img.target.src = defaultProfilePic)}
          alt={pseudo}
        />

        {this.updateForm(pseudo, email, password, about)}
      </div>
    );
  }
}

export default EditProfile;
