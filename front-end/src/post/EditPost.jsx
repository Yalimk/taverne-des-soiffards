// Native modules import
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Personal modules import
import { isLoggedIn } from "../auth/index";
import { viewPost, updatePost } from "./apiPost";
import defaultPostPic from "../images/beautiful-sea.jpg";

class EditPost extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      title: "",
      body: "",
      redirectionProfile: false,
      error: "",
      loading: false,
      fileSize: 0,
    };
  }

  init = async (postId) => {
    console.info(`postId dans la méthode init de EditPost : ${postId}`);
    try {
      const data = await viewPost(postId);
      if (data.error) {
        // console.error("dans le If data.error de init dans EditPost");
        this.setState({
          redirectionProfile: true,
        });
      } else {
        console.info(
          `data.author._id dans la méthode init de EditPost : ${data.author._id}`
        );
        this.setState({
          id: data._id,
          title: data.title,
          body: data.body,
          error: "",
        });
      }
    } catch (error) {
      console.error(
        `The init method inside EditPost encountered the following error: ${error}`
      );
    }
  };

  componentDidMount() {
    this.postData = new FormData();
    try {
      const postId = this.props.match.params.postId;
      if (postId) {
        this.init(postId);
      } else {
        console.error("No postId found.");
      }
    } catch (error) {
      console.error("Something went wrong with componentDidMount method.");
    }
  }

  isValid = () => {
    const { title, body, fileSize } = this.state;
    if (fileSize > 1000000) {
      this.setState({
        loading: false,
        error: "Le poids du fichier ne doit pas dépasser 1Mb ! Déconne pas !",
      });
      return false;
    }
    if (title.length === 0 || title.length > 50) {
      this.setState({
        loading: false,
        error:
          "Le titre est requis et doit faire moins de 50 caractères, marin d'eau douce !",
      });
      return false;
    }
    if (body.length === 0) {
      this.setState({
        loading: false,
        error: `Un message est requis pour envoyer un... message, moussaillon.`,
      });
      return false;
    }
    return true;
  };

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.postData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  submitUpdate = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const postId = this.props.match.params.postId;
      const token = isLoggedIn().token;
      try {
        const data = await updatePost(postId, token, this.postData);
        if (data.error) {
          this.setState({ error: data.error });
        }
        this.setState({
          loading: false,
          title: "",
          body: "",
          redirectionProfile: true,
        });
      } catch (error) {
        console.error(`updatePost in EditPost coudldn't retrive data because of error: ${error}.`)
      }
    }
  };

  postUpdateForm = (title, body) => (
    <form action="">
      <div className="form-group">
        <label className="text-muted">Image</label>
        <input
          onChange={this.handleChange("photo")}
          type="file"
          accept="image/*"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Titre</label>
        <input
          onChange={this.handleChange("title")}
          type="text"
          className="form-control"
          value={title}
          autoFocus
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Message</label>
        <textarea
          onChange={this.handleChange("body")}
          type="body"
          className="form-control"
          value={body}
        />
      </div>

      <button
        onClick={this.submitUpdate}
        className="btn btn-raised btn-primary"
      >
        Envoyer
      </button>
    </form>
  );

  render() {
    const { id, title, body, redirectionProfile, error, loading } = this.state;
    console.log("id inside render de EditPost: ", id);
    // console.log("user._id inside render: ", isLoggedIn().user._id);
    // console.log("user inside render: ", isLoggedIn().user);

    if (redirectionProfile) {
      // console.log(`redirection vers /user/${isLoggedIn().user._id}` );
      // console.log(`redirection bis vers ${process.env.REACT_APP_API_URI}/user/${isLoggedIn().user._id}` );
      // <Redirect to={`${process.env.REACT_APP_API_URI}/user/${isLoggedIn().user._id}`}/>;
      return <Redirect to={`/post/${id}`}/>;
    }
    return (
      <div>
        {/* {JSON.stringify(this.state)} */}
        <div className="card-body">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>

          {loading ? (
            <div className="jumbotron text-center">
              <h2>Loading...</h2>
            </div>
          ) : (
            ""
          )}
          <img
            style={{ height: "200px", width: "auto" }}
            className="img-thumbnail mb-3"
            // src={`${defaultPostPic}`}
            src={`${process.env.REACT_APP_API_URI}/post/photo/${id}?${new Date().getTime()}`}
            onError={(img) => (img.target.src = `${defaultPostPic}`)}
            alt={title}
          />

          <h3 className="card-title mt-3 mb-3">{title}</h3>

          {this.postUpdateForm(title, body)}
        </div>
      </div>
    );
  }
}

export default EditPost;
