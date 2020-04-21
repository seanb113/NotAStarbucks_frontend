import React, { Component } from 'react'
import Coffee from '../containers/Coffee'
import {Link} from 'react-router-dom'
class UserProfile extends Component {
    state ={
        editPic: false,
        url: null,
        picture: ""
    }
    editImage = () => {
        console.log("clicked")
        this.setState({
            editPic: true
        })
        }

    uploadImage = () => {
        debugger
    let id = this.props.user.id
    let profile_pic = this.state.url
    fetch(`http://localhost:4000/users/${id}`, {
        method: "POST",
        headers: {
            "Content-Type" :"application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            profile_pic: profile_pic,
        })})
    .then(r=>r.json())
    .then(r=>
      this.setState({
        url: null,
        editPic: false,
        picture: profile_pic})
      )
    }
        render(){
        return(
            <div>
        
                <div className="content">
                <h2 className="header">{this.props.user.name}</h2>
                </div>
            <div class="ui two column centered grid">
            <div class="two wide column">
                <h3>Bio: <i onClick={this.editImage} class="icon edit"></i></h3>
                My name is Sean. I love coffee, donuts and DC.
                <br/>
                I discovered coffee in Brazil in 2009.
                <br/>
                My favortie coffee drink is a cortado
                <br/>
                My least favorite coffee drink is a frappucino
                <br/>
                But I will drink any and all coffee even decaf.
                </div>
                <div class="two wide column">
                <div className="ui medium image">
                 <img alt="" src={this.state.picture === "" ? this.props.user.profile_pic : this.state.picture}/>
                 <i onClick={this.editImage} class="icon edit"></i>
            <div className={this.state.editPic === false ? 'hidden' : ''}>
            <input onChange={(event)=>this.setState({url: event.target.value})} placeholder="image url"></input>
            <button onClick={this.uploadImage}>Submit</button>
            </div>
            </div>
                </div>
                </div>
            
             
            <div id="letter" >Here are {this.props.user.name}'s favorite coffee shops:<br/>
            <br/><div className="ui four column grid"> 
            {this.props.display.map(shop=> 
                <Coffee coffee={shop} selectShop={this.props.selectShop}/>
            )}
            
             </div><br/>
             <br/><Link to="/coffeeshops">
              <div className="ui labeled button" tabIndex="0">
             <button className="ui inverted button"onClick={this.props.goBack}> See all coffee shops in DC</button>
             </div>
             </Link>
             </div>
             </div>

      )
        }
   
}
export default UserProfile