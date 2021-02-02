// Native modules import
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Personal modules import
import { listAllPosts } from "./apiPost";
import defaultPostPic from "../images/beautiful-sea.jpg";

class Posts extends Component {
  state = {
    posts: [],
  };

  componentDidMount = async () => {
    try {
      const allPosts = await listAllPosts();;
      if (allPosts) {
        this.setState({
          posts: allPosts,
        });
      } else {
        console.error(
          `No posts were retrieved from the server because of error.`
        );
      }
    } catch (error) {
      console.error(
        `Couldn't change state of posts because of error: ${error}.`
      );
    }
  };

  renderPosts = (posts) => {
    return (
      <div className="row" style={{justifyContent: "center"}}>
        {posts.map((post, i) => {
          const posterId = post.author ? `/user/${post.author._id}` : "";
          const posterPseudo = post.author ? post.author.pseudo : "un Inconnu";
          return (
            <div
              className="card card-block col-md-3"
              key={i}
              style={{
                backgroundColor: "#D5E5F2",
                marginRight: "30px",
                marginBottom: "30px",
                boxShadow: "3px 3px 5px grey",
                width: "300px"
              }}
            >
              <div className="card-body" key={i}>
                <img
                  className="img-thumbnail mb-3"
                  style={{ height: "auto", width: "auto", borderRadius: "50%" }}
                  src={`${process.env.REACT_APP_API_URI}/post/photo/${post._id}`}
                  alt={post.title}
                  onError={(img) => img.target.src = `${defaultPostPic}`}
                />
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text lead">{post.body.substring(0, 50)}</p>
                <br />
                <p className="font-italic mark">
                  Posté par <Link to={posterId}>{posterPseudo}</Link> le{" "}
                  {new Date(post.created).toLocaleDateString()}
                </p>
              </div>

              <Link
                to={`/post/${post._id}`}
                className="btn btn-raised btn-primary btn-block"
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  marginBottom: "15px",
                  boxShadow: "3px 3px 5px grey",
                  backgroundColor: "#81A65D"
                }}
              >
                Lire plus
              </Link>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { posts } = this.state;
    return (
      <div className="jumbotron">
        <h2 className="mt-3 mb-3 text-center" style={{fontWeight: "bold"}}>
          {!posts.length
            ? "Chargement..."
            : "Messages des Pirates de la Taverne"}
        </h2>
        {this.renderPosts(posts)}
      </div>
    );
  }
}

export default Posts;
