import React from "react"
const Coffee  = props => {
        return(
            <div onClick={()=>props.selectShop(props.coffee)}>
                {props.coffee.name} Rating:{props.coffee.rating} Price:{props.coffee.price}

                
            </div>
        )

}
export default Coffee