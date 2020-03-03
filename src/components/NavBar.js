import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'semantic-ui-react'

const NavBar = (props) => {
return(
    <div id={"sortLabel"} className="ui basic big horizontal label"> 
        <input className="form-control" placeholder="Search by name..." onChange={props.onSearch}/>
        {/* <Button color="red">Submit</Button> */}
        <button className="ui yellow button">Submit</button>
        {/* <button onClick={props.loginClick}>Log In</button> */}
    </div>
)
}
export default NavBar