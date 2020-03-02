import React from 'react'
import {Link} from 'react-router-dom'

const GoBackButton = (props) => {
return(
    <div>
    <button onClick={props.goBack}>Go Back</button>
    </div>
)
}
export default GoBackButton