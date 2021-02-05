// Native modules import
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

// Personal modules import
import {searchUser} from '../../logic/user/apiUser';

class SearchUser extends Component {
  state = {
    pseudo: "",
    visitProfile: false,
    error: "",
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  submitSearch = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
      const user = await searchUser(userPseudo);
      // console.info(`[front-end/src/user/EditProfile => submitSearch => after updateUser:31]: user: ${user}`)
      if (user.error) {
        this.setState({ error: user.error });
      } else {
       this.setState({
         visitProfile: true,
         pseudo: user,
       })
      }
  };

  searchForm = (pseudo) => (
    <form action="">
      <div className="form-group">
        <input
          className="form-control mr-sm-2"
          onChange={this.handleChange("pseudo")}
          type="search"
          aria-label="Search"
          autoFocus
          placeholder="Tapez un pseudo..."
          value={pseudo}
        />
      </div>
      <button
        onClick={this.submitSearch}
        type="submit"
        className="btn btn-raised btn-primary"
      >
        Trouver
      </button>
    </form>
  );

  render() {
    const {pseudo} = this.state
    const {visitProfile, search} = this.state;
    if (visitProfile) {
      return <Redirect to={`/user/${search._id}`} />
    }
    return ( 
      <div>
        {this.searchForm(pseudo)}
      </div>
     );
  }
}
 
export default SearchUser;
