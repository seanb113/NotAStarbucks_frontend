import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'semantic-ui-react'

const NavBar = (props) => {
return(
    <div title="ui input" color="ui brown"> {props.user ? props.user : <button onClick={props.loginClick}>Log In</button>, "Search By Name"}
        <input className="form-control" placeholder="Search by name..." onChange={props.onSearch}/>
        {/* <Button color="red">Submit</Button> */}
        <button className="ui red button">Submit</button>
        {/* <button onClick={props.loginClick}>Log In</button> */}
    </div>
)
}
export default NavBar