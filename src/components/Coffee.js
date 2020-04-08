import React from "react"
import {Link} from 'react-router-dom'
import { FaBeer, FaBacon, FaIceCream} from 'react-icons/fa'
import { GiCoffeeCup, GiBookshelf, GiCupcake, GiSandwich} from 'react-icons/gi'
import { IoMdWine } from 'react-icons/io'

const Coffee  = props => {
    // console.log(props)
        return(
            <Link to={`/coffeeshops/${props.coffee.id}`}> 
                <div className="column" onClick={()=>props.selectShop(props.coffee)}>
                <div  id="letter2" className="ui segment">
              <img  className= "ui image" src={props.coffee.image_url} style={{width: 250, height: 200}}/>
                {props.coffee.name}<br/> 
                <div id="letters">
                Rating:{props.coffee.rating}<br/> Price:{props.coffee.price}
                </div>
                <div>
                {props.coffee.categories.includes('coffee') ? <GiCoffeeCup id="coffeeCup" /> : null}
                {props.coffee.categories.includes('bookstores') ? <GiBookshelf id="bookstore"/> : null}
                {props.coffee.categories.includes('bakeries') ? <GiCupcake id="bakery"/> : null}
                {props.coffee.categories.includes('sandwiches') ? <GiSandwich id="lunch"/> : null}
                {props.coffee.categories.includes('breakfast_brunch') ? <FaBacon id="breakfast"/> : null}
                {props.coffee.categories.includes('icecream') ? <FaIceCream id="icecream"/> : null}
                {props.coffee.categories.includes('gelato') ? <FaIceCream id="icecream"/> : null}
                {props.coffee.categories.includes('cocktailbars') ? <IoMdWine id="alcohol"/> : null}
                {props.coffee.categories.includes('wine_bars') ? <IoMdWine id="alcohol"/> : null}
                </div>
                </div>
            </div> 
                </Link>

        )

}
export default Coffee