import React from "react"
import {Link} from 'react-router-dom'
import { FaBacon, FaIceCream} from 'react-icons/fa'
import { GiCoffeeCup, GiBookshelf, GiCupcake, GiSandwich} from 'react-icons/gi'
import { IoMdWine } from 'react-icons/io'

const Coffee  = props => {
        return(
            <Link to={`/coffeeshops/${props.coffee.id}`}> 
                <div className="column" onClick={()=>props.selectShop(props.coffee)}>
                <div  id="letter2" className="ui segment">
              <img  alt= "" className= "ui image" src={props.coffee.image_url} style={{width: 250, height: 200}}/>
                {props.coffee.name}<br/> 
                <div id="letters">
                Rating: {props.coffee.rating} stars<br/> Price:{props.coffee.price}
                </div>
                <div id="icons">
                {props.coffee.categories.includes('coffee') ? <GiCoffeeCup title="Tea + Coffee" id="coffeeCup" /> : null}
                {props.coffee.categories.includes('bookstores') ? <GiBookshelf title="Bookstore" id="bookstore"/> : null}
                {props.coffee.categories.includes('bakeries') ? <GiCupcake title="Bakery" id="bakery"/> : null}
                {props.coffee.categories.includes('sandwiches') ? <GiSandwich title="Lunch" id="lunch"/> : null}
                {props.coffee.categories.includes('breakfast_brunch') ? <FaBacon title="Breakfast" id="breakfast"/> : null}
                {props.coffee.categories.includes('icecream') ? <FaIceCream title="Ice Cream" id="icecream"/> : null}
                {props.coffee.categories.includes('gelato') ? <FaIceCream title="Gelato" id="icecream"/> : null}
                {props.coffee.categories.includes('cocktailbars') ? <IoMdWine title="Cocktail Bar" id="alcohol"/> : null}
                {props.coffee.categories.includes('wine_bars') ? <IoMdWine title="Beer + Wine" id="alcohol"/> : null}
                </div>
                </div>
            </div> 
                </Link>

        )

}
export default Coffee