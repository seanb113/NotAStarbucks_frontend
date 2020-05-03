import React from "react"
import {Link} from 'react-router-dom'
import { FaBacon, FaIceCream} from 'react-icons/fa'
import { GiCoffeeCup, GiBookshelf, GiCupcake, GiSandwich} from 'react-icons/gi'
import { IoMdWine } from 'react-icons/io'
import { Button, Segment } from "semantic-ui-react"

class CoffeeCard extends React.Component {
    render(){
        console.log(this.props)
        console.log(this.props.favorites.map(f=>f.id).includes(this.props.shop.id))
        return(
            <div id="letter">
            <Segment>
             <h3>{this.props.shop.name}</h3><br/>
             <img id="picture" alt ="" src ={this.props.shop.image_url} /><br/>
              Price: {this.props.shop.price}<br/>
              Phone number: {this.props.shop.display_phone}<br/>
              Rating: {this.props.shop.rating} stars<br/>
              Location: {this.props.shop.location}<br/>
             <div>
                {this.props.shop.categories.includes('coffee') ? <GiCoffeeCup title="Tea + Coffee" id="coffeeCup"/> : null}
                {this.props.shop.categories.includes('bookstores') ? <GiBookshelf title="Bookstore" id="bookstore" /> : null}
                {this.props.shop.categories.includes('bakeries') ? <GiCupcake title="Bakery" id="bakery"/> : null}
                {this.props.shop.categories.includes('sandwiches') ? <GiSandwich title="Lunch" id="lunch"/> : null}
                {this.props.shop.categories.includes('breakfast_brunch') ? <FaBacon title="Breakfast" id="breakfast"/> : null}
                {this.props.shop.categories.includes('icecream') ? <FaIceCream title="Ice Cream" id="icecream"/> : null}
                {this.props.shop.categories.includes('gelato') ? <FaIceCream title="Gelato" id="icecream"/> : null}
                {this.props.shop.categories.includes('cocktailbars') ? <IoMdWine title="Cocktail Bar" id="alcohol"/> : null}
                {this.props.shop.categories.includes('wine_bars') ? <IoMdWine title="Beer + Wine" id="alcohol"/> : null}
            </div>
            </Segment>

             <div class="ui buttons">
              <div className="ui labeled button">
              {this.props.favorites.map(f=>f.id).includes(this.props.shop.id) ? <button className="ui inverted button" onClick={()=>this.props.removeFromFavorites(this.props.shop)}>Remove from favorites</button> : <button  className="ui inverted button" onClick={()=>this.props.addToFavorites(this.props.shop)}>Add to your favorites </button>}
              </div>
                        <Link to="/coffeeshops">
          <div>
          <div className="ui labeled button">
          <button className="ui inverted button" onClick={this.props.goBack}>See all coffee shops in DC</button>
          </div>
          </div>
          </Link>
          </div>
             <br/>
             <div id="map">
              <p>
             <img alt="" src={`https://maps.googleapis.com/maps/api/staticmap?zoom=17&size=400x300&markers=size:small%7Ccolor:red%7C${this.props.shop.latitude},${this.props.shop.longitude}&key=${process.env.REACT_APP_GOOGLEMAPS_API_KEY}`}/>
                </p>
                </div>
              
            </div>
        )
    }
}
export default CoffeeCard