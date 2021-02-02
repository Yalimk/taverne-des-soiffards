/* eslint-disable no-lone-blocks */
// Native modules import
import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
// import io from "socket.io-client";

// Personal modules import
// import { isLoggedIn } from "../auth/index";

// const socket = io(process.env.CLIENT_URI, {
//   transports: ["websocket", "polling"],
// });
// const socket = io("http://localhost:9092");
// const socket = io('http://localhost:9092/', {
//   transports: ["websocket", "polling"],
// });

// eslint-disable-next-line no-empty-pattern
const Home = ({}) => {
  // const [users, setUsers] = useState([]);
  // const [message, setMessage] = useState("");
  // const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   if (isLoggedIn()) {
  //     const socket = io("http://localhost:9092");
  //     // Reception/Emission type events
  //     socket.on("connect", () => {
  //       console.log(
  //         `[front-end/src/core/Homepage.jsx => socket.on('connect')] : pseudo: ${
  //           isLoggedIn().user.pseudo
  //         }`
  //       );
  //       socket.emit("pseudo", isLoggedIn().user.pseudo);
  //     });

  //     // Reception only type events
  //     socket.on("connected", (user) => {
  //       console.log(
  //         `[front-end/src/core/Homepage.jsx => socket.on('connected')] : user: ${user}`
  //       );
  //       setUsers((users) => [...users, user]);
  //     });

  //     socket.on("users", (users) => {
  //       console.log(
  //         `[front-end/src/core/Homepage.jsx => socket.on('users')] : users: ${users}`
  //       );
  //       setUsers(users);
  //     });

  //     socket.on("message", (message) => {
  //       setMessages((messages) => [...messages, message]);
  //     });

  //     socket.on("disconnect", (id) => {
  //       console.log(
  //         `[front-end/src/core/Homepage.jsx => socket.on('disconnect')] : id of disconnected user: ${id}`
  //       );
  //       setUsers((users) => {
  //         return users.filter((user) => user.id !== id);
  //       });
  //     });
  //   }
  // }, []);

  // const submitForm = (event) => {
    // event.preventDefault();
    // if (isLoggedIn()) {
    //   const socket = io("http://localhost:9092");
    //   socket.emit("send", message);
    //   console.log(
    //     `[front-end/src/core/Homepage.jsx => submitForm] : message: ${message}`
    //   );
    //   setMessage("");
    // }
  // };

  // if (isLoggedIn()) {
  //   return (
  //     <div className="container jumbotron">
  //       <div className="row">
  //         <div className="col-md-12 mt-5 mb-5">
  //           <h4 className=" text-center" style={{fontWeight: "bold"}}>Bienvenue dans la Taverne, {isLoggedIn().user.pseudo}</h4>
  //         </div>
  //       </div>
        {/* <div className="row">
          <div className="col-md-8">
            <h5>Messages</h5>
            <div>
              {messages.map(({ user, message, date }, index) => (
                <div key={index} className="row mb-2">
                  <div className="col-md-2">{date}</div>
                  <div className="col-md-2">{user.pseudo}</div>
                  <div className="col-md-2">{message}</div>
                </div>
              ))}
            </div>
            <form action="" onSubmit={submitForm}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => setMessage(event.currentTarget.value)}
                  value={message}
                />
                <span className="input-group-btn">
                  <button className="btn btn-primary btn-sm">Envoyer</button>
                </span>
              </div>
            </form>
          </div>
          <div className="col-md-4">
            <h5>Pirates présents</h5>
            <ul>
              {users.map(({ name, id }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          </div>
        </div> */}
      {/* </div>
    );
  } else { */}
    return (
      <div className="container jumbotron">
        <div className="row">
          <div className="col-md-12 mt-5 mb-5">
            <h4 className=" text-center" style={{fontWeight: "bold"}}>Bienvenue dans la Taverne, pirate !</h4>
          </div>
        </div>
      </div>
    );
  }
// };

export default Home;
