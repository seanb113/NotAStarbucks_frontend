import React from "react"
const Coffee  = props => {
        return(
            <div onClick={()=>props.selectShop(props.coffee)}>
                {props.coffee.name}
            </div>
        )

}
export default Coffee