import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Coffee from '../components/Coffee'

class CoffeeList extends Component {

  render(){
  return (
      <div>
        {this.props.coffee_shops.map(coffee=>
          <Coffee coffee={coffee} key = {coffee.id} selectShop={this.props.selectShop}/>)}
      <button onClick={this.props.goToProfile}>See your favorites</button>
      </div>
  )
  }
}

export default CoffeeList