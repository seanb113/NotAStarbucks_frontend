import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Coffee from '../containers/Coffee'

class CoffeeList extends Component {

  state = {
      shops: this.props.cofffee_shops,
      currentPage: 1,
      shopsPerPage: 8
    }

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render(){
    const { currentPage, shopsPerPage } = this.state;
    const indexOfLastShop = currentPage * shopsPerPage;
    const indexOfFirstShop = indexOfLastShop - shopsPerPage;
    const currentShops = this.props.coffee_shops.slice(indexOfFirstShop, indexOfLastShop);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.coffee_shops.length / shopsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });
  return (
    <div>
    <div>
          <Link to="/profile">
          <div className="ui labeled button" tabIndex="0">
      <button className="ui inverted button"onClick={this.props.goToProfile}>See your favorites</button><br/>
      </div>
      </Link>
      </div>
      <br/><div className="ui four column grid"> 
        {currentShops.map(coffee=>
          <Coffee coffee={coffee} key = {coffee.id} selectShop={this.props.selectShop}/>)}
      </div>
        <ul id="page-numbers">
          {renderPageNumbers}
        </ul>
      </div>
  )
  }
}

export default CoffeeList
