import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Coffee from '../components/Coffee'

class CoffeeList extends Component {

  render(){
    console.log(this.props)
  return (
      <div>
        {this.props.coffee_shops.map(coffee=>
          <Coffee coffee={coffee} key = {coffee.id} selectShop={this.props.selectShop}/>)}
      </div>
  )
  }
}

export default CoffeeList