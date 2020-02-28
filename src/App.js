import React, { Component } from 'react';
import NavBar from './components/NavBar'
import CoffeeList from './containers/CoffeeList'
import './App.css';

class App extends Component {
  // state = {
  //   coffee_shops: []
  // }

  // componentDidMount(){
  //   fetch("http://localhost:3001/coffee_shops")
  //   .then(r=>r.json())
  //   .then(r=>console.log(r))
  // }
  render(){
  return (
    <div class="ui top attached tabular menu">
    <a class="active item">
    </a>
    NotAStarBucks
    <NavBar/>
    <CoffeeList/>
    </div>
  
  )
  }
}

export default App;
