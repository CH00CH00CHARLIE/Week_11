import React, { Component } from "react";
import fetch from 'node-fetch'

class App extends Component {
  state = {
    newTodo: "",
    todos: []
  };

  async componentDidMount() {
    const response = await fetch(`https://web-hackerspace-backend.now.sh/all`);
    const json = await response.json();
    console.log(json)
    const items = json.map(item => item.name);
    console.log(items)
    this.setState({ todos: items });
  }

  handleDelete = event => {
    var newTodoList = [...this.state.todos]; 
    var index = newTodoList.indexOf(event.target.value);
    newTodoList.splice(index, 1);
    this.setState({todos: newTodoList});
  };

  handleChange = event => {
    this.setState({ newTodo: event.target.value });
  };

  handleSubmit = event => {
    fetch('https://web-hackerspace-backend.now.sh/add/' + this.state.newTodo);
    this.setState({ newTodo: "" });
  };

  render() {
    return (
      <div>
        <h1> How to make boba at home</h1>
        {this.state.todos.map(todo => (
          <div>
            <li key={todo}>
              {todo + " "}
              <button  value={todo} onClick={this.handleDelete}>X</button>
            </li>
          </div>
        ))}

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.newTodo}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}> + </button>
        </form>
      </div>
    );
  }
}

export default App;