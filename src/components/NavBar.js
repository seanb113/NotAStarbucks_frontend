import React from 'react'

const NavBar = (props) => {
return(
    <div id="searchContainer">
    <div id="searchLabel" className="ui basic big horizontal label"> 
        <input className="form-control" onChange={props.onSearch}/>
        <i class="icon search"></i>
      
    </div>
    </div>
)
}
export default NavBar