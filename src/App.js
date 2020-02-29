import React, { Component } from 'react';
import NavBar from './components/NavBar'
import CoffeeList from './containers/CoffeeList'
import CoffeeCard from "./components/CoffeeCard"
import './App.css';


class App extends Component {
  state = {
    coffee_shops: [],
    selected_shop: null
  }

  componentDidMount(){
    fetch("http://localhost:3001/coffee_shops")
    .then(r=>r.json())
    .then(coffeeList=>
      this.setState({coffee_shops: coffeeList})
    )
  }

  resetList = () =>{
    this.setState({selected_shop: null})
  }
  selectShop = (shop) =>{
    console.log("I am clicking this shop", shop)
   
    this.setState({selected_shop: shop})
  }
  render(){
  return (
    <div className="ui top attached tabular menu">
    <a className="active item">
    </a>
    NotAStarBucks
    <NavBar/>
    {this.state.selected_shop !== null ?
    <CoffeeCard coffeeCard = {this.state.selected_shop} goBack = {this.resetList}/>: <CoffeeList coffee_shops={this.state.coffee_shops} selectShop={this.selectShop}/>}
    </div>
  
  )
  }
}

export default App;
