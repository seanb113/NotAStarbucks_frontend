import React, { Component } from 'react';
import NavBar from './components/NavBar'
import CoffeeList from './containers/CoffeeList'
import CoffeeCard from "./components/CoffeeCard"
import LoginForm from "./components/LoginForm"
import UserProfile from "./components/UserProfile"
import TitleBar from "./components/TitleBar"
// import GoBackButton from "./components/GoBackButton"
import SortControl from "./components/SortControl"
import About from "./components/About"
import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css';
import {fetchCurrentUser} from './actions/User'



class App extends Component {
  state = {
    coffeeShops: [],
    displayedShops: [],
    selectedShop: null,
    currentUser: null,
    loggingIn: false,
    onProfilePage: false,
    favorites: [],
    searchText: "",
    sort: "price"
    // sortT: "rating"
  }
  
  componentDidMount(){
    fetch("http://localhost:4000/coffee_shops")
    .then(r=>r.json())
    .then(coffeeList=>
      this.setState({
        coffeeShops: coffeeList})
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
      // this.postFavorite(shop)
    }
  }

  // removeFromFavorites =(shop)=>{
  //   let newArray = this.state.favorites.map(s=> s === shop ? s.remove() : s)
  //   this.setState({favorites : newArray})
  // }

  // postFavorite = (coffeeShop) => {
  //   let userObject = fetchCurrentUser()
  //   fetch('http://localhost:4000/favorites', {
  //       method: 'POST',
  //       headers: {
  //               "Content-Type": "application/json",
  //               "Accept": "application/json"
  //       },
  //       body: JSON.stringify({user_id: userObject.id, coffeeshop_id: coffeeShop.id}),
  //   })
  //   .then((r)=> r.json())
  //   .then(data => {console.log("this is data", data)}
  //     )
  //   }
    
  loginSubmit = (user) =>{
    let username = user.name
    this.setState({
      loggingIn: false,
      currentUser: username
    })
  }

  onSearch = (event) => {
    this.setState({searchText: event.target.value})
    
  }

handleSort = (value) => {
  // debugger
    value === "Price"
    ?
    this.setState({sort: "price"})
    :
    this.setState({sort: "rating"})
  }
  getSorted(){
    // debugger
    let value = this.state.sort
    return this.state.displayedShops.sort((shop1, shop2) => shop1[value] > shop2[value] ? 1 : -1)
    // this.setState({
    //   displayedShops: withSort
    // })
  }
  
  resetList = () =>{
    let allShops = this.state.coffeeShops
    this.setState({
      selectedShop: null,
      displayedShops: allShops,
      searchText: ""
      })
  }
  selectShop = (shop) =>{
    this.setState({selectedShop: shop})
  }

  goToProfile = () =>{
    
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

    let sortedShops = this.getSorted(this.state.sort)
    let searchedShops = sortedShops.filter(s => s.name.toLowerCase().includes(this.state.searchText.toLowerCase()))
  return (
    <div className="App">
      <TitleBar  />
   
    {this.state.currentUser && this.state.displayedShops.length > 0 ? <NavBar user={this.state.currentUser} loginClick={this.loginClick} onSearch={this.onSearch}/>: null}
    {this.state.currentUser && this.state.displayedShops.length > 0  ? <SortControl sort={this.state.sort} getSorted={this.getSorted} handleSort={this.handleSort}/>: null}<br/>
            
     <Switch>
            <Route path="/coffeeshops/:id" render={(props) => {
              // debugger
              let id = parseInt(props.match.params.id)
              let selectedShop = this.state.coffeeShops.find(s=>s.id === id)
              return <CoffeeCard
              shop={selectedShop} addToFavorites={this.addToFavorites} goBack={this.resetList}/>
            }} />
            <Route exact path="/coffeeshops" render={()=>
              <CoffeeList coffee_shops={searchedShops} selectShop={this.selectShop} goToProfile={this.goToProfile}/>
            }/>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route exact path="/profile" render={() => {
              return this.state.currentUser ? <UserProfile user={this.state.currentUser} display = {this.state.favorites} goBack={this.resetList} selectShop={this.selectShop} getSorted={this.getSorted}/> :
                <Redirect to="/login"/>
            }} />
            <Route exact path="/login" render={() => {
              return this.state.currentUser ? <Redirect to="/profile"/> : <LoginForm
                loginSubmit={this.loginSubmit}
              />
            }} />
          </Switch>

    {/* {this.state.onProfilePage === true ? <UserProfile user = {this.state.currentUser} display = {this.state.displayedShops} favorites = {this.state.favorites}/> : null }
    {this.state.selectedShop !== null ? <CoffeeCard coffeeCard = {this.state.selectedShop} goBack = {this.resetList} addToFavorites={this.addToFavorites}/>: <CoffeeList coffee_shops={searchedShops} selectShop={this.selectShop} goToProfile={this.goToProfile}/>} */}
    {/* {this.state.onProfilePage || this.state.selectedShop!== null ? <GoBackButton goBack = {this.resetList}/> : null} */}
   
    </div>
  
  )
  }
}

export default App;
