import React from 'react'
import {Link} from 'react-router-dom'

const TitleBar = (props) => {
    return(
<div className="ui right  menu" id="title">
  <div class="header item" style={{color: "white", fontFamily: "'Courier New', Courier, monospace", fontSize: "xx-large"}}>Local Joe</div>
  {props.user !== null ?   <Link style={{paddingTop: "2.5rem"}} to={"/profile"}><a href="/profile" style={{color: "white", marginLeft: "1120px", paddingTop: "2.5rem"}}>
    <i class="user circle outline icon" style={{fontSize: "xx-large"}}></i>
  </a></Link> : null}
  </div>
// {/* <button onClick={props.logOut}>Log out</button> */}
    )
}
export default TitleBar