// Native modules import
import React, { Component } from 'react'

// Personal modules import
import {resetPassword} from '../auth/index';

class ResetPassword extends Component {7
  state = {};
  // constructor(props) {
  //   super(props)
  //   this.state = props;
  // }
  render() { 
    return ( 
      <div className="container jumbotron">
        <p>{this.state}</p>
      </div>
     );
  }
}
 
export default ResetPassword;