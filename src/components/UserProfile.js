import React from "react"
import Coffee from '../components/Coffee'
import {Link} from 'react-router-dom'
const UserProfile  = props => {
    console.log(props)
        return(
            <div id="letter" >Here are {props.user}'s favorite coffee shops:
            {props.display.map(shop=>
                <Coffee coffee={shop} selectShop={props.selectShop}/>
            )}
           <Link to="/coffeeshops">
          <button className="ui brown basic button"onClick={props.goBack}> See all coffee shops in DC</button>
          </Link>
      </div>
        )
}
export default UserProfile