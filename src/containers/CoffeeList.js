import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Coffee from '../components/Coffee'

class CoffeeList extends Component {

  render(){
  return (
      <div class="ui four column grid"> 
        {this.props.coffee_shops.map(coffee=>
          <Coffee coffee={coffee} key = {coffee.id} selectShop={this.props.selectShop}/>)}
          <Link to="/profile">
      <button className="ui brown basic button"onClick={this.props.goToProfile}>See your favorites</button>
      </Link>
        {this.props.coffee_shops.map(coffee=>
          <Coffee coffee={coffee} key = {coffee.id} selectShop={this.props.selectShop}/>)}
      </div>
  )
  }
}

export default CoffeeList