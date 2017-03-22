import React, { Component } from 'react';
import $ from 'jquery';
var config = require('../../config');

class Goals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entry: '',
      date: Date.now(),
      current: true,
      list: [],
      asc: 1
    };
  }

  componentWillMount(){
    if(this.props.username){
      this.updateGoals();
    }
  }

componentWillReceiveProps(nextProps){
  if(this.props.username !== nextProps.username){
    this.updateGoals(nextProps.username);
  }
}

  entryChange(e) {
    this.setState( {entry: e.target.value} )
  }

  createGoalList(){
    var list = this.state.list;
      return list.sort((a,b)=> this.state.asc* (new Date(b.date)-new Date(a.date)))
      .map(function(entry){
      return (<li>{entry.entry} </li>)
    })
  }

  updateGoals(username){
    var self = this;
    username = username || self.props.username
    $.ajax ({
      method: 'GET',
      url: config.serverRoute + '/currentgoals/' + username
    }).done(function(data) {
      self.setState( {list: data} );
    })
  }

  createGoalEvent(e){
    console.log('adding goal')
    e.preventDefault()
    var data = Object.assign({username: this.props.username}, this.state)
    $.ajax ({
      method: 'POST',
      url: config.serverRoute + '/creategoal',
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).done(()=>{
      this.setState({ entry:'' });
      this.updateGoals();
    })
  }

  render() {
    return (
      <div id="goals">
         <div><h1>Goals</h1></div>
        <textarea placeholder="goal item"  className='immobile' value={this.state.entry} onChange={this.entryChange.bind(this)} />
        <input type="button" className="button immobile" id="createGoal" value="Add goal" onClick={this.createGoalEvent.bind(this)} />
        <input type="button" className="button immobile" id="listGoals" value="List Goals" onClick={this.updateGoals.bind(this)} />
        <div>
          <ul id="goalItem">{ this.createGoalList() }</ul>
        </div>
      </div>
    );
  }
}

export default Goals;
