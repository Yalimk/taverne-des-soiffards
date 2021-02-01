// Native modules import
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

// Personal modules import
import { viewPost, remove } from "./apiPost";
import defaultPostPic from "../images/beautiful-sea.jpg";
import { isLoggedIn } from "../auth/index";

class OnePost extends Component {
  state = {
    post: "",
    redirectionPosts: false,
  };

  componentDidMount = async () => {
    const postId = this.props.match.params.postId;
    const onePost = await viewPost(postId);
    // console.log("onePost dans componentDidMount", onePost);
    if (onePost.error) {
      console.log(`An error happened when getting the post information.`);
    } else {
      this.setState({
        post: onePost,
      });
    }
  };

  deleteConfirmation = () => {
    let answer = window.confirm(
      "Es-tu sûr de vouloir supprimer ton message, moussaillon ?"
    );
    if (answer) {
      this.deletePost();
    }
  };

  deletePost = async () => {
    try {
      const postId = this.props.match.params.postId;
      const token = isLoggedIn().token;
      const response = await remove(postId, token);
      // console.log(`dans la méthode deletePost de OnePost: response: ${response}, postId: ${postId}, token: ${token}`);
      if (response.error) {
        console.log(`The response couldn't be retrieved from the server. `);
      } else {
        this.setState({
          redirectionPosts: true,
        });
      }
    } catch (error) {
      console.error(
        `The deletePost method encountered the following error: ${error}.`
      );
    }
  };

  renderPost = (post) => {
    const posterId = post.author ? `/user/${post.author._id}` : "";
    const posterPseudo = post.author ? post.author.pseudo : "un Inconnu";
    // console.log("post dans renderPost", post);
    // console.log("post._id dans renderPost", post._id);
    return (
      <div className="card col-12" style={{ backgroundColor: "#D5E5F2" }}>
        <div className="card-body">
          <img
            // src={`${defaultPostPic}`}
            src={`${process.env.REACT_APP_API_URI}/post/photo/${post._id}`}
            onError={(img) => (img.target.src = `${defaultPostPic}`)}
            className="img-thumbnail mb-3"
            style={{ height: "auto", width: "auto", objectFit: "cover" }}
            alt={post.title}
          />
          <h2 className="mt-3 mb-3 display-2">{post.title}</h2>
          <p className="card-text lead" style={{ padding: "20px" }}>
            {post.body}
          </p>
          <br />
          <p className="font-italic mark">
            Posté par <Link to={posterId}>{posterPseudo}</Link> le{" "}
            {new Date(post.created).toLocaleDateString()}
          </p>
        </div>

        <div className="inline-block">
          <Link
            to={`/posts`}
            className="btn btn-raised btn-primary mr-5 btn-sm"
            style={{
              fontWeight: "bold",
              fontSize: "1.1rem",
              marginBottom: "15px",
            }}
          >
            Retour aux messages
          </Link>
          {isLoggedIn().user && isLoggedIn().user._id === post.author._id && (
            <>
              <Link
                to={`/post/edit/${post._id}`}
                className="btn-btn-raised btn-info mr-3 btn-sm"
                style={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  marginBottom: "15px",
                  cursor: "pointer",
                }}
              >
                Modifier
              </Link>
              <button
                className="btn-btn-raised btn-danger"
                style={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  marginBottom: "15px",
                  cursor: "pointer",
                }}
                onClick={this.deleteConfirmation}
              >
                Supprimer
              </button>
            </>
          )}
          <div>
            {isLoggedIn().user &&
              isLoggedIn().user.right === "Roi des Pirates" && (
                <div className="card mt-5">
                  <div className="card-body">
                    <h5 className="card-title">Interface du Roi des Pirates</h5>
                    <p className="mb-2 text-danger">
                      Modifier/Supprimer en tant que Roi
                    </p>
                    <Link
                      to={`/post/edit/${post._id}`}
                      className="btn btn-raised btn-info mr-5"
                    >
                      Modifier en tant que Roi
                    </Link>
                    <button
                      onClick={this.deleteConfirmation}
                      className="btn btn-raised btn-danger"
                    >
                      Supprimer en tant que Roi
                    </button>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { post, redirectionPosts } = this.state;
    if (redirectionPosts) {
      return <Redirect to={`/posts/`} />;
    }
    return (
      <div className="jumbotron">
        {!post ? (
          <div className="jumbotron text-center">
            <h2>Chargement...</h2>
          </div>
        ) : (
          this.renderPost(post)
        )}
      </div>
    );
  }
}

export default OnePost;
