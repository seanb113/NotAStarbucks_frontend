import React, { Component } from 'react';
import NavBar from './components/NavBar'
import CoffeeList from './containers/CoffeeList'
import CoffeeCard from "./components/CoffeeCard"
import LoginForm from "./components/LoginForm"
import UserProfile from "./components/UserProfile"
import GoBackButton from "./components/GoBackButton"
import './App.css';


class App extends Component {
  state = {
    coffeeShops: [],
    displayedShops: [],
    selectedShop: null,
    currentUser: null,
    loggingIn: false,
    onProfilePage: false,
    favorites: [],
    searchText: ""
  }
  
  componentDidMount(){
    fetch("http://localhost:4000/coffee_shops")
    .then(r=>r.json())
    .then(coffeeList=>
      this.setState({
        coffeeShops: coffeeList,
        displayedShops: coffeeList})
      )
    }
    
  loginClick = () =>{
    this.setState({loggingIn: true})
  }

  addToFavorites =(shop)=>{
    if(this.state.currentUser === null){
      alert("please login")
    }
    else if(this.state.favorites.includes(shop)){
      alert("You already added this shop to your favorites")
    }else{
      let newShop = [...this.state.favorites, shop]
      this.setState({favorites : newShop})
    }
    
  }
    
  loginSubmit = (user) =>{
    this.setState({
      loggingIn: false,
      currentUser: user
    })
  }

  onSearch = (event) => {
    this.setState({searchText: event.target.value})
  }
  
  resetList = () =>{
    let allShops = this.state.coffeeShops
    this.setState({
      selectedShop: null,
      displayedShops: allShops
      })
  }
  selectShop = (shop) =>{
    this.setState({selectedShop: shop})
  }

  goToProfile = () =>{
    debugger
    let favorites = this.state.favorites
    this.state.currentUser
    ?
    this.setState({
      displayedShops: favorites,
      onProfilePage: true})
    :
    alert("please login")
  }

  render(){
    let favorites = this.state.favorties
    let searchedShops = this.state.displayedShops.filter(s => s.name.toLowerCase().includes(this.state.searchText))
  return (
    <div className="ui top attached tabular menu">
    <a className="active item">
    </a>
    NotAStarbucks
    {this.state.loggingIn === true ? <LoginForm loginSubmit={this.loginSubmit}/> : <NavBar user={this.state.currentUser} loginClick={this.loginClick} onSearch={this.onSearch}/>}
    {this.state.onProfilePage === true ? <UserProfile user = {this.state.currentUser} display = {this.state.displayedShops} favorites = {this.state.favorites}/> : null }
    {this.state.selectedShop !== null ? <CoffeeCard coffeeCard = {this.state.selectedShop} goBack = {this.resetList} addToFavorites={this.addToFavorites}/>: <CoffeeList coffee_shops={searchedShops} selectShop={this.selectShop} goToProfile={this.goToProfile}/>}
    {this.state.onProfilePage || this.state.selectedShop!== null ? <GoBackButton goBack = {this.resetList}/> : null}
    </div>
  
  )
  }
}

export default App;
