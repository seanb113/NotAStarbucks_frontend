import React, { Component } from 'react';
import NavBar from './components/NavBar'
import CoffeeList from './containers/CoffeeList'
import CoffeeCard from "./components/CoffeeCard"
import LoginForm from "./components/LoginForm"
import UserProfile from "./components/UserProfile"
import TitleBar from "./components/TitleBar"
import SignUp from "./components/SignUp"
import SortControl from "./components/SortControl"
import About from "./components/About"
import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css';
// import {fetchCurrentUser} from './actions/User'



class App extends Component {
  state = {
    coffeeShops: [],
    displayedShops: [],
    selectedShop: null,
    currentUser: null,
    loggingIn: false,
    onProfilePage: false,
    favorites: [],
    allFavorties: [],
    searchText: "",
    sort: "price",
    currentUserObj: []
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
    
  recallFavs = (favs)=>{
    debugger
    console.log(favs)
    this.setState({
      favorites: favs,
      displayedShops: favs
    })
  }


  addToFavorites =(shop)=>{
      let newShop = [...this.state.favorites, shop]
      this.setState({favorites : newShop})
      this.postFavorite(shop)
    }

  removeFromFavorites =(shop)=>{
    debugger
    let newArray = this.state.favorites.filter(s=> s.id !== shop.id)
    this.setState({favorites : newArray})
    this.deleteFavorite(shop)
  }

  postFavorite = (coffeeShop) => {
    debugger
    let userObject = this.state.currentUserObj
    fetch(`http://localhost:4000/users/${userObject.id}/coffeeshops`, {
        method: 'POST',
        headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
        },
        body: JSON.stringify({user_id: userObject.id, coffee_shop_id: coffeeShop.id}),
    }).then(r=>r.json())
      .catch(error => console.error('Error:', error))
      .then(r=> console.log(r)
      )
      alert("Added to favorites")
    }

    deleteFavorite = (coffeeShop) => {
    debugger
    let favorite = this.state.favorites.find(c=>c.id === coffeeShop.id)
    let id = favorite.favorites[0].id
    fetch(`http://localhost:4000/favorites/${id}`, {
        method: 'DELETE'

    })
    .then(r => r.text())
    .then(console.log("deleted")
      )
      alert("Removed from favorites")
    }

  // fetchCurrentUser = () => {
  //   debugger
  //   fetch('http://localhost:4000/profile', {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('jwt')}`
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(({ user }) =>{
  //       return user})
      
  // }

  loginSubmit = (user) =>{
    this.setState({
      currentUser: user.name,
      currentUserObj: user
    })
  }

  logOut = () =>{
    // debugger
    this.setState({
      currentUserObj: null
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
    return(
    value === "price"
    ?
    (this.state.displayedShops.sort((shop1, shop2) => shop1[value] > shop2[value] ? 1 : -1))
    :
    (this.state.displayedShops.sort((shop1, shop2) => shop1[value] > shop2[value] ? -1 : 1)))
  }
  
  resetList = () =>{
    debugger
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
    this.state.currentUserObj
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
      <TitleBar logOut={this.logOut}/>
   
    {this.state.currentUser && this.state.displayedShops.length > 0 && this.state.selectedShop === null && this.state.displayedShops.length !== this.state.favorites.length ? <NavBar user={this.state.currentUserObj} loginClick={this.loginClick} onSearch={this.onSearch}/>: null}
    {this.state.currentUser && this.state.displayedShops.length > 0  && this.state.selectedShop === null && this.state.displayedShops.length !== this.state.favorites.length ? <SortControl sort={this.state.sort} getSorted={this.getSorted} handleSort={this.handleSort}/>: null}<br/>
            
     <Switch>
            <Route path="/coffeeshops/:id" render={(props) => {
              // debugger
              let id = parseInt(props.match.params.id)
              let selectedShop = this.state.coffeeShops.find(s=>s.id === id)
              return <CoffeeCard
              shop={selectedShop} addToFavorites={this.addToFavorites} favorites={this.state.favorites} goBack={this.resetList} removeFromFavorites={this.removeFromFavorites}/>
            }} />
            <Route exact path="/coffeeshops" render={()=>
              <CoffeeList coffee_shops={searchedShops} selectShop={this.selectShop} goToProfile={this.goToProfile}/>
            }/>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route exact path="/profile" render={() => {
              return this.state.currentUserObj ? <UserProfile user={this.state.currentUserObj} display = {searchedShops} goBack={this.resetList} selectShop={this.selectShop} getSorted={this.getSorted}/> :
                <Redirect to="/login"/>
            }} />
            <Route exact path="/login" render={() => {
              return this.state.currentUser ? <Redirect to="/profile"/> : <LoginForm
                loginSubmit={this.loginSubmit} recallFavs={this.recallFavs}
              />
            }} />
            <Route exact path="/signup" render={() => {
             return !this.state.currentUser ? <SignUp loginSubmit = {this.loginSubmit}f/> : <Redirect to="/profile"/>
            }
            }/>
          </Switch>

    {/* {this.state.onProfilePage === true ? <UserProfile user = {this.state.currentUser} display = {this.state.displayedShops} favorites = {this.state.favorites}/> : null }
    {this.state.selectedShop !== null ? <CoffeeCard coffeeCard = {this.state.selectedShop} goBack = {this.resetList} addToFavorites={this.addToFavorites}/>: <CoffeeList coffee_shops={searchedShops} selectShop={this.selectShop} goToProfile={this.goToProfile}/>} */}
    {/* {this.state.onProfilePage || this.state.selectedShop!== null ? <GoBackButton goBack = {this.resetList}/> : null} */}
   
    </div>
  
  )
  }
}

export default App;
