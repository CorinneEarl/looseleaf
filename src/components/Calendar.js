import React, { Component } from 'react';
import $ from 'jquery';
var config = require('../../config');
var DatePicker = require('react-datepicker');
var moment = require('moment');
import { Glyphicon } from 'react-bootstrap';

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entry: '',
      date: Date.now(),
      list: [],
      asc: 1,
      startDate: moment(),
      message: "What's coming up?"
    };
  }

  handleChange(date){
    this.setState({
         startDate: date
       });
  }

  componentWillMount(){
    if(this.props.username){
      this.updateCurrentCalendar();
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.username !== nextProps.username){
      this.updateCurrentCalendar(nextProps.username);
    }
  }

  entryChange(e) {
    this.setState( {entry: e.target.value} )
  }

  createList(){
    var list = this.state.list;
    return list
      .filter(({eventDate}) => eventDate)
      .sort((a,b)=> this.state.asc* (new Date(a.eventDate)-new Date(b.eventDate)))
    .map(function(entry){
      return (
        <li>
          {moment(entry.eventDate).format('MMMM Do YYYY')}: {entry.entry}
        </li>)
    });
  }

  updateCurrentCalendar(username){
    var self = this;
    username = username || self.props.username
    $.ajax ({
      method: 'GET',
      url: config.serverRoute + '/currentCalendar/' + username
    }).done(function(data) {
      self.setState( {list: data} );
    })
  }

  blankEntry () {
    this.state.message === "What's coming up?" ? this.setState(
      {message: "Time passes irrevocably."} ) : this.setState(
        {message:  "What's coming up?"}
      )
  }

  createCalendarEvent(){
    if (this.state.entry === "") {
      this.blankEntry();
    } else {
      var data = Object.assign({username: this.props.username}, this.state)
      $.ajax ({
        method: 'POST',
        url: config.serverRoute + '/createcalendarevent',
        data: JSON.stringify(data),
        contentType: 'application/json'
      }).done(()=>{
          console.log("calendarEvent2")
        this.setState({ entry:'' });
        this.updateCurrentCalendar();
      });
    }
  }

  render() {
    if(!this.props.username)
      return (
        <div>
          Loading...
        </div>)
    return (
      <div>
        <div>
          <h1 className="Chead">
            Events Calendar
          </h1>
        </div>
        <div className="flex add">
          <input type="text" className="singleText"
            placeholder={this.state.message} value={this.state.entry}
            onChange={this.entryChange.bind(this)} />
          <DatePicker className="singleText" selected={this.state.startDate}
            onChange={this.handleChange.bind(this)} />
          <button className="glyphy button calendar" id="createNote"
            onClick={this.createCalendarEvent.bind(this)}>
            <Glyphicon glyph="plus" />
          </button>
        </div>
        <div>
          <ul id="calendarItem">{ this.createList() }</ul>
        </div>
      </div>
    );
  }
}

export default Calendar;
