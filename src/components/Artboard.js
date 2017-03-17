import React, { Component } from 'react';
// import { Resizable, ResizableBox } from 'react-resizable';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ReactGridLayout = WidthProvider(Responsive);
import Goals from './Goals';
import Journal from './Journal';
import Notepad from './Notepad';
import Todo from './Todo';
import Calendar from './Calendar';
import $ from 'jquery';
import {browserHistory} from 'react-router'
var config = require('../../config');

class Artboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      access: false
    };
  }

  componentWillMount() {
    if(this.props.notLoggedIn()){
      browserHistory.push('/login')
    }
  }

  saveLayoutEvent() {
  $.ajax ({
    method: 'PUT',
    url: config.serverRoute + '/savelayout',
    data: JSON.stringify(this.state),
    contentType: 'application/json'
  });
}

  render() {
    var layouts = [
      {i: '1', x: 0, y: 0, w: 2, h: 3},
      {i: '2', x: 2, y: 0, w: 2, h: 3},
      {i: '3', x: 4, y: 0, w: 2, h: 9},
      {i: '4', x: 0, y: 3, w: 4, h: 3},
      {i: '5', x: 0, y: 6, w: 4, h: 3 }
    ];
    return (
    	<div id="artboard">
        <ReactGridLayout className="layout" layouts={layouts}
      breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
      cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
          <div key={"1"}><Goals username={this.props.username.bind(this)}/></div>
          <div key={"2"}><Journal username={this.props.username.bind(this)}/></div>
          <div key={"3"}><Notepad username={this.props.username.bind(this)}/></div>
          <div key={"4"}><Todo username={this.props.username.bind(this)}/></div>
          <div key={"5"}><Calendar username={this.props.username.bind(this)}/></div>
        </ReactGridLayout>
        <form>
          <input type="button" id="saveLayoutButton" value="Save Default Layout" onClick={this.saveLayoutEvent.bind(this)} />
        </form>
    	</div>
    );
  }
}

export default Artboard;
