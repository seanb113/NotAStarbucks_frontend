import React, { Component } from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
// var Slider = require('react-rangeslider')
class SortControl extends React.Component {

 
  render() {
   
    return (
 
  <div className="filterWrapper">
            <div id={"sortLabel"} className="ui basic big horizontal label">Sort By:</div> 
            <button
                className="ui red button"
                onClick={(event) => this.props.handleSort(event.target.innerText)}
            >Price</button>
            <button
                className="ui button"
                onClick={(event) => this.props.handleSort(event.target.innerText)}
            >Rating</button>
        </div>
    )
  }
}

export default SortControl