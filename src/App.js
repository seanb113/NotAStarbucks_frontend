import React, { Component } from 'react';
import NavBar from './containers/NavBar'
import CoffeeList from './components/CoffeeList'
import CoffeeCard from "./components/CoffeeCard"
import LoginForm from "./components/LoginForm"
import UserProfile from "./components/UserProfile"
import TitleBar from "./containers/TitleBar"
import SignUp from "./components/SignUp"
import SortControl from "./containers/SortControl"
import {Route, Switch, Redirect} from 'react-router-dom'
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
    allFavorties: [],
    searchText: "",
    sort: "price",
    currentUserObj: [],
    picture: "",
    bio: ""
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

    handlepicChange = (pic) => {
      this.setState({
      picture: pic
      })
    }

    changeBio = (bio) => {
      this.setState({
        bio: bio
      })
    }
    
  recallFavs = (favs)=>{
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
    let newArray = this.state.favorites.filter(s=> s.id !== shop.id)
    this.setState({favorites : newArray})
    this.deleteFavorite(shop)
  }

  postFavorite = (coffeeShop) => {
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


  loginSubmit = (user) =>{
    this.setState({
      currentUser: user.name,
      currentUserObj: user,
      bio: user.bio
    })
  }

  logOut = () =>{
    this.setState({
      currentUserObj: null
    })
  }

  onSearch = (event) => {
    this.setState({searchText: event.target.value})
    
  }

handleSort = (value) => {
    value === "Price"
    ?
    this.setState({sort: "price"})
    :
    this.setState({sort: "rating"})
  }

getSorted(){
    let value = this.state.sort
    return(
    value === "price"
    ?
    (this.state.displayedShops.sort((shop1, shop2) => shop1[value] > shop2[value] ? 1 : -1))
    :
    (this.state.displayedShops.sort((shop1, shop2) => shop1[value] > shop2[value] ? -1 : 1)))
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

  render(){
    let sortedShops = this.getSorted(this.state.sort)
    let searchedShops = sortedShops.filter(s => s.name.toLowerCase().includes(this.state.searchText.toLowerCase()))
  return (
    <div className="App">
      <TitleBar logOut={this.logOut} user={this.state.currentUser}/>
   
    {this.state.currentUser && this.state.displayedShops.length > 0 && this.state.selectedShop === null && this.state.displayedShops.length !== this.state.favorites.length ? <NavBar user={this.state.currentUserObj} loginClick={this.loginClick} onSearch={this.onSearch}/>: null}
    {this.state.currentUser && this.state.displayedShops.length > 0  && this.state.selectedShop === null && this.state.displayedShops.length !== this.state.favorites.length ? <SortControl sort={this.state.sort} getSorted={this.getSorted} handleSort={this.handleSort}/>: null}<br/>
            
     <Switch>
            <Route path="/coffeeshops/:id" render={(props) => {
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
              return this.state.currentUserObj ? <UserProfile user={this.state.currentUserObj} changeBio={this.changeBio} bio={this.state.bio} handlepicChange={this.handlepicChange} picture={this.state.picture} display = {this.state.favorites} goBack={this.resetList} selectShop={this.selectShop} getSorted={this.getSorted}/> :
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
    </div>
  
  )
  }
}

export default App;
