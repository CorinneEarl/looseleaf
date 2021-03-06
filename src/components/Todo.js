import React, { Component } from 'react';
import $ from 'jquery';
import { Glyphicon } from 'react-bootstrap';
var config = require('../../config');

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entry: '',
      date: Date.now(),
      list: [],
      asc: 1,
      message: "To-do item..."
    };
  }

  componentWillMount(){
    if(this.props.username){
      this.updateCurrentTodo();
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.username !== nextProps.username){
      this.updateCurrentTodo(nextProps.username);
    }
  }

  entryChange(e) {
    this.setState( {entry: e.target.value} )
  }

  createList(){
    const sortByDate = (a,b) =>
        this.state.asc * (new Date(b.date)-new Date(a.date))
    var list = this.state.list;
      return list
        .sort(sortByDate)
        .filter(entry => entry.current)
        .map((entry) => <TodoItem key={entry._id} entry={entry} updateCurrentTodo={this.updateCurrentTodo.bind(this)}/> )
  }

  updateCurrentTodo(username){
    var self = this;
    username = username || self.props.username
    console.log('updating todos for ' + username)
    $.ajax ({
      method: 'GET',
      url: config.serverRoute + '/currentTodos/' + username
    }).done(function(data) {
      console.log('All the data', [])
      self.setState({list: data} );
    });
  }

  blankEntry () {
    this.state.message === "To-do item..." ? this.setState(
      {message: "Be clenched, curious."}
    ) : this.setState( {message:  "To-do item..."} )
  }

  createTodoEvent(){
    if (this.state.entry === "") {
      this.blankEntry();
    } else {
      var data = Object.assign({username: this.props.username}, this.state)
      $.ajax ({
        method: 'POST',
        url: config.serverRoute + '/createtodo',
        data: JSON.stringify(data),
        contentType: 'application/json'
        }).done(()=>{
        this.setState({ entry:'' });
        this.updateCurrentTodo();
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
            <h1 className="Thead">
              Tasks
            </h1>
          </div>
          <div className="flex add">
            <input type="text" className="singleText" placeholder={this.state.message}
              value={this.state.entry} onChange={this.entryChange.bind(this)} />
            <button className="button glyphy todo" id="createTodo"
              onClick={this.createTodoEvent.bind(this)} ><Glyphicon glyph="plus" />
            </button>
          </div>
          <div className="flex">
            <span className="todoItems">{this.createList()}</span>
            <button className="button glyphy todo"
              onClick={()=>this.setState({asc: this.state.asc * -1})}>
              <Glyphicon glyph="sort" />
            </button>
          </div>
        </div>
      );
    }
  }

  class TodoItem extends Component {
    taskComplete(e){
      $.ajax ({
        method: 'PUT',
        url: config.serverRoute + '/taskComplete/' + this.props.entry._id
      }).done(()=>this.props.updateCurrentTodo());
    }

    render(){
      return (
        <span className="todoItems">
          <input type="checkbox" name="todoitem"
            onClick={this.taskComplete.bind(this)}/> {this.props.entry.entry}
          <br />
        </span>);
    }
  }

  export default Todo;
