import React from "react"
import {Link} from 'react-router-dom'
const Coffee  = props => {
    // console.log(props)
        return(
            <div onClick={()=>props.selectShop(props.coffee)}>
            <Link to={`/coffeeshops/${props.coffee.id}`}>
                {props.coffee.name} Rating:{props.coffee.rating} Price:{props.coffee.price}
                </Link>
            </div>
        )

}
export default Coffee