import React, { Component } from 'react'
import Coffee from '../containers/Coffee'
import {Link} from 'react-router-dom'
class UserProfile extends Component {
    state ={
        editPic: false,
        url: null,
        picture: "",
        bio: this.props.user.bio ? this.props.user.bio : "This person does not have a bio",
        editBio: false,
        text: ""
    }
    editImage = () => {
        this.setState({
            editPic: true
        })
        }
    editBio = () => {
        console.log("clicked")
        this.setState({
            editBio: !this.state.editBio,
            text: this.state.bio
        })
        }

    handleImageChange = e => {
    if (e.target.files[0]) this.setState({ url: e.target.files[0] });
    };

    uploadImage = () => {
    const formData = new FormData();
    formData.append("file", this.state.url);
    let id = this.props.user.id
    fetch(`http://localhost:4000/users/${id}`, {
        method: "PATCH",
        body: formData
        })
    .then(r=>r.json())
    .then(r=>
      this.setState({
        url: null,
        editPic: false
      })
      )
    }
    handleBioSubmit = () => {
    let id = this.props.user.id
    let bio = this.state.text
    fetch(`http://localhost:4000/users/${id}`, {
        method: "POST",
        headers: {
            "Content-Type" :"application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            bio: bio,
        })})
    .then(r=>r.json())
    .then(r=>
      this.setState({
        text: "",
        editBio: false,
        bio: bio})
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
                <h3>Bio: <i onClick={this.editBio} class="icon edit"></i></h3>
                {this.state.editBio ? <textarea type="text" value={this.state.text} onChange={(event)=>this.setState({text: event.target.value})}></textarea> : null}
                {this.state.editBio ? <button onClick={this.handleBioSubmit}>Submit Changes</button> : null}
                {!this.state.editBio ? <p>{this.state.bio}</p> : null}
                </div>
                <div class="two wide column">
                <div className="ui medium image">
                 <img alt="" src={this.state.picture === "" ? this.props.user.profile_pic : this.state.picture}/>
                 <i onClick={this.editImage} class="icon edit"></i>
            <div className={this.state.editPic === false ? 'hidden' : ''}>
            <input type="file" name="newPhoto"accept="image/png, image/jpeg" onChange={this.handleImageChange} />
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
             <div class="returnButton">
             <br/><Link to="/coffeeshops">
              <div className="ui labeled button">
             <button className="ui inverted button"onClick={this.props.goBack}> See all coffee shops in DC</button>
             </div>
             </Link>
             </div>
             </div>
             </div>

      )
        }
   
}
export default UserProfile