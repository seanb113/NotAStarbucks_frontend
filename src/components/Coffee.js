import React from "react"
import {Link} from 'react-router-dom'

const Coffee  = props => {
    // console.log(props)
        return(
            <div  onClick={()=>props.selectShop(props.coffee)}>
            <Link to={`/coffeeshops/${props.coffee.id}`}>
            <div className="ui container three column grid">
            <div className="column">
                <div  id="letters" className="ui segment">
              <img  className= "ui image" src={props.coffee.image_url} style={{width: 250, height: 200}}/>
                {props.coffee.name}<br/> Rating:{props.coffee.rating}<br/> Price:{props.coffee.price}
                </div>
            </div> 
            </div>
                </Link>
            </div>

        )

}
export default Coffee