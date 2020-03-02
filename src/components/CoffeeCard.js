import React from "react"
class CoffeeCard extends React.Component {
    render(){
        return(
            <div>
              {this.props.coffeeCard.name}<br/>
             <img alt ="image" src ={this.props.coffeeCard.image_url} /><br/>
              Price: {this.props.coffeeCard.price}<br/>
              Phone number: {this.props.coffeeCard.display_phone}<br/>
              Rating: {this.props.coffeeCard.rating}<br/>
              Location: {this.props.coffeeCard.location}<br/>

              {/* <button onClick={ this.props.goBack}>Go Back</button><br/> */}
              <button onClick={()=>this.props.addToFavorites(this.props.coffeeCard)}>Add to your favorites </button>
              
            </div>
        )
    }
}
export default CoffeeCard