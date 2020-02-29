import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = (props) => {
return(
    <div title="ui input" color="ui brown">Hello: {props.user}
        <input type="text" className="form-control" placeholder="Search By Zip"/>
        <button onClick={props.loginClick}>Log In</button>
    </div>
)
}
export default NavBar