import React, { Component } from 'react';
import Goals from './Goals';
import Journal from './Journal';
import Notepad from './Notepad';
import Todo from './Todo';
import Calendar from './Calendar';

class Artboard extends Component {
  componentWillMount() {
    $.ajax ({
      method: 'GET',
      url: config.serverRoute + '/verification'
    }).done(function(data) {
      constructor(props) {
        super(props)
        this.state = {
          username: config.usernamePlaceholder,
        };
    })
  }
  render() {
    return (
    	<div id="artboard">
          <Goals></Goals>
          <Journal></Journal>
          <Notepad></Notepad>
          <Todo></Todo>
          <Calendar></Calendar>
    	</div>

    );
  }
}

export default Artboard;
