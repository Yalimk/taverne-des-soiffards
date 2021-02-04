/* eslint-disable no-lone-blocks */
// Native modules import
import React, { Component } from "react";
import PropTypes from "prop-types";

// Personal modules import
import { isLoggedIn } from "../auth/index";
import SoTWP from "../images/sot-wp.jpg";

class ChatForm extends Component {
  static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired,
  };
  state = {
    message: "",
  };

  render() { 
    if (isLoggedIn()) {
      return (
        <div className="container jumbotron" style={{ padding: "32px 32px" }}>
          <div className="row">
            <div className="col-md-12 mt-3 mb-3">
              <h4 className=" text-center" style={{ fontWeight: "bold" }}>
                Bienvenue dans la Taverne, {isLoggedIn().user.pseudo}
              </h4>
            </div>

            <form
              action=""
              onSubmit={(event) => {
                event.preventDefault();
                this.props.onSubmitMessage(this.state.message);
                this.setState({ message: "" });
              }}
              className="jumbotron text-center"
            >
              <input
                type="text"
                placeholder={`Ecris ici ce que tu as à dire, ${isLoggedIn().user.pseudo}...`}
                value={this.state.message}
                style={{width: "444px"}}
                onChange={(event) =>
                  this.setState({ message: event.target.value })
                }
              />
              <input type="submit" value={"Envoyer"} />
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container jumbotron">
          <div className="row">
            <div className="col-md-12 mt-5 mb-5">
              <h4 className=" text-center" style={{ fontWeight: "bold" }}>
                Bienvenue dans la Taverne, pirate !
              </h4>
              <img src={`${SoTWP}`} alt="wall-paper-sea-of-thieves" style={{width: "auto", height: "100%", maxWidth: "auto", maxHeight: "auto", boxShadow: "3px 3px 10px grey"}}/>
            </div>
          </div>
        </div>
      );
    }
  }
}
 
export default ChatForm;