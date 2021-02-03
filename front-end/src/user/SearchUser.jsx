// // Native modules import
// import React, { Component } from 'react'

// // Personal modules import
// import {searchUser} from '../user/apiUser';

// class SearchUser extends Component {
//   state = {
//     search: "",
//   }


//   handleChange = (name) => (event) => {
//     this.setState({ error: "" });
//     const value = name === "photo" ? event.target.files[0] : event.target.value;
//     const fileSize = name === "photo" ? event.target.files[0].size : 0;
//     this.userData.set(name, value);
//     this.setState({
//       [name]: value,
//       fileSize,
//     });
//   };

//   searchSubmit = async (event) => {
//     event.preventDefault();
//     this.setState({ loading: true });
//       const userPseudo = this.props.match.params.userPseudo;
//       console.log(
//         `[front-end/src/user/EditProfile => searchSubmit:28] => userPseudo: ${userPseudo}`
//       );
//       const data = await searchUser(userPseudo);
//       // console.info(`[front-end/src/user/EditProfile => searchSubmit => after updateUser:31]: data: ${data}`)
//       if (data.error) {
//         this.setState({ error: data.error });
//       } else {
//         // console.info(`[front-end/src/user/EditProfile => searchSubmit => before updateInfo:190]: data: ${data}`)
//         // updateInfo(data, () => {
//         //   this.setState({ redirectionProfile: true });
//         // });
//       }
//   };

//   searchForm = (search) => (
//     <form action="">
//       <div className="form-group">
//         <input
//           className="form-control mr-sm-2"
//           onChange={this.handleChange("search")}
//           type="search"
//           aria-label="Search"
//           autoFocus
//           placeholder="Cherchez le pseudo d'un pirate"
//           value={search}
//         />
//       </div>
//       <button
//         onClick={this.searchSubmit}
//         type="submit"
//         className="btn btn-raised btn-primary"
//       >
//         Modifier
//       </button>
//     </form>
//   );

//   render() { 
//     return ( 
//       <div>
//         {this.searchForm}
//       </div>
//      );
//   }
// }
 
// export default SearchUser;