import React from "react"
import {Link} from 'react-router-dom'
class CoffeeCard extends React.Component {
    render(){
        console.log(this.props)
        return(
            <div id="letter">
              {this.props.shop.name}<br/>
             <img alt ="image" src ={this.props.shop.image_url} /><br/>
              Price: {this.props.shop.price}<br/>
              Phone number: {this.props.shop.display_phone}<br/>
              Rating: {this.props.shop.rating}<br/>
              Location: {this.props.shop.location}<br/>
              <button className="ui negative basic button" onClick={()=>this.props.addToFavorites(this.props.shop)}>Add to your favorites </button>
              {/* <button className="ui negative basic button" onClick={()=>this.props.removeFromFavorites(this.props.shop)}</button> */}
              <p>
             <img src={`https://maps.googleapis.com/maps/api/staticmap?zoom=17&size=400x300&markers=size:small%7Ccolor:red%7C${this.props.shop.latitude},${this.props.shop.longitude}&key=${process.env.REACT_APP_GOOGLEMAPS_API_KEY}`}/>
                </p>
          <Link to="/coffeeshops">
          <button className="ui primary basic button" onClick={this.props.goBack}>See all coffee shops in DC</button>
          </Link>
              
            </div>
        )
    }
}
export default CoffeeCard