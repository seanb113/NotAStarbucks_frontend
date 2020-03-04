import React from 'react'
import { Button, Form, Segment, Message } from "semantic-ui-react"
const SortControl = (props) => {
    return (
        <div className="filterWrapper">

            <div id={"sortLabel"} className="ui basic big horizontal label">Sort By:</div> 
            <button
                className="ui red button"
                onClick={(event) => props.handleSort(event.target.innerText)}
            >Price</button>
            <button
                className="ui primary button"
                onClick={(event) => props.handleSort(event.target.innerText)}
            >Rating</button>
        </div>
    )
  }


export default SortControl