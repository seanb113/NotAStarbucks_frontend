import React from 'react'
import {Link} from 'react-router-dom'

const TitleBar = (props) => {
    return(
<div className="ui right  menu" id="title">
  <a className="active item" id ="cup">
    Not A Starbucks
  </a>
<button onClick={props.logOut}>Log out</button>
</div>
    )
}
export default TitleBar