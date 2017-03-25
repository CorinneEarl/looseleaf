import React, { Component } from 'react';
import {browserHistory} from 'react-router';

class Home extends Component {

  componentWillMount() {
    if(this.props.notLoggedIn()){
      browserHistory.push('/login')
    }
    browserHistory.push('/artboard')
  }

  render() {
    return (
      <div id="intro">
        Looseleaf offers the <span id="freedom">freedom of a blank page </span>
        without the bulk and constraints of a paper planner. 
      </div>
    )
  }
}

export default Home;
