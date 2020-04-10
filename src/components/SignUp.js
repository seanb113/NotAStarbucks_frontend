import React, {Component} from 'react';
// import {Route, Switch, Redirect, Link} from 'react-router-dom'

class SignUp extends Component {
  state = {
    name: "",
    password: "",
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleLoginSubmit = (e) => {
    fetch('http://localhost:4000/users', {
    method: "POST",
    headers: {
      "Content-Type" :"application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: this.state.name,
      password: this.state.password
    })
  }).then(res => res.json())
  .then(data => {
    debugger
    localStorage.setItem("token", data.jwt)
    this.props.loginSubmit(data.user)
  })}

  render() {
    const {name, password} = this.state
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleLoginSubmit}>
          <input
            placeholder="name"
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          <input 
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <button placeholder="submit" type="submit">
            Sign Up
          </button>
      
        </form>
        <div>
          {
            this.state.errors ? this.handleErrors() : null
          }
        </div>
      </div>
    );
  }
}

export default SignUp