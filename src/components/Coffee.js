import React from "react"
import {Link} from 'react-router-dom'
const Coffee  = props => {
    // console.log(props)
        return(
            <div onClick={()=>props.selectShop(props.coffee)}>
            <Link to={`/coffeeshops/${props.coffee.id}`}>
              <img  src={props.coffee.image_url} style={{width: 250, height: 200}}/><br/>
                {props.coffee.name} Rating:{props.coffee.rating} Price:{props.coffee.price}
                </Link>
            </div>
        )

}
export default Coffee