import React from 'react'
const SortControl = (props) => {
    return (
        <div class="filterWrapper">

            <div id={"sortLabel"} class="ui basic big horizontal label">Sort By:</div> 
            <button
                class="ui red button"
                onClick={(event) => props.handleSort(event.target.innerText)}
            >Price</button>
            <button
                class="ui primary button"
                onClick={(event) => props.handleSort(event.target.innerText)}
            >Rating</button>
        </div>
    )
  }


export default SortControl