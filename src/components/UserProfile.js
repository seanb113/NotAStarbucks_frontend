import React, { Component } from 'react'
import Coffee from '../containers/Coffee'
import {Link} from 'react-router-dom'
class UserProfile extends Component {
    state ={
        editPic: false,
        url: null,
        picture: this.props.picture,
        bio: this.props.bio ? this.props.bio : "This person does not have a bio",
        editBio: false,
        text: ""
    }
    editImage = () => {
        this.setState({
            editPic: true
        })
        }
    editBio = () => {
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
    formData.append("profile_pic", this.state.url);
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
      }),
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
      this.props.changeBio(bio)
    }
        render(){
        return(
            <div>
                <div class="ui special centered cards">
  <div class="card" style={{ boxShadow: "20px 20px 60px #242b30, -20px -20px 60px #303b40"}}>
    <div class="blurring dimmable image">
      <div class="ui dimmer">
        <div class="content" >
          <div class="center">
            <i onClick={this.editImage} class="icon edit"></i>
          </div>
        </div>
      </div>
      <img id="profimage" alt="" src={this.state.picture === "" ? "https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg" : this.state.picture}/>
    </div>
    {this.state.editPic === false ? <i onClick={this.editImage} class="icon edit" style={{marginTop: "-1.3em", zIndex: "0"}}></i> : null}
    {this.state.editPic ? 
    <div>
    <input type="file" style={{width: "75%"}} name="newPhoto"accept="image/png, image/jpeg" onChange={console.log("clicked")} />
    <button onClick={this.uploadImages}>Submit</button>
    </div>
    :
    null}
    <div class="content" style={{backgroundColor: "black"}}>
      <h3 id="profileLetters" className="header">{this.props.user.name}</h3>
    </div>
    <div class="extra content" style={{backgroundColor: "black"}}>
        <div class="header" id="profileLetters"> <i style={{color: "white"}} onClick={this.editBio} class="icon edit"></i>Bio</div>
        {this.state.editBio ? <textarea type="text" value={this.state.text} onChange={(event)=>this.setState({text: event.target.value})}></textarea> : null}
        {this.state.editBio ? <button onClick={this.handleBioSubmit}>Submit Changes</button> : null}
        {!this.state.editBio ? <div class="content" id="profileLetters">{this.state.bio}</div> : null}
    </div>
  </div>
   </div>








{/*         
                <div id="profileLetters" className="content">
                <h2 id="profileLetters" className="header">{this.props.user.name}</h2>
                </div>
            <div class="ui centered cards">
                <div class="ui raised card">
                <div class="header" id="profileLetters2"> <i onClick={this.editBio} class="icon edit"></i>Bio</div>
                {this.state.editBio ? <textarea type="text" value={this.state.text} onChange={(event)=>this.setState({text: event.target.value})}></textarea> : null}
                {this.state.editBio ? <button onClick={this.handleBioSubmit}>Submit Changes</button> : null}
                {!this.state.editBio ? <div class="content" id="profileLetters4">{this.state.bio}</div> : null}
                </div>
            <div class="blurring dimmable image">
                <div class="ui dimmer">
                 <div class="content">
                    <div class="center">
                    <div class={this.state.editPic === false ? "extra content" : "hidden"}>
                    <i onClick={this.editImage} class="icon edit"></i>
                 {/* <img alt="" src={this.state.picture === "" ? this.props.user.profile_pic : this.state.picture}/> */}
                 {/* </div>
                 </div>
                 </div>
            <div className={this.state.editPic === false ? 'hidden' : 'extra content'}>
            <input type="file" style={{width: "75%"}} name="newPhoto"accept="image/png, image/jpeg" onChange={console.log("clicked")} />
            <button onClick={this.uploadImages}>Submit</button>
                 </div>
            </div>
            {/* </div> */}
                 {/* <img id="profimage" alt="" src={this.state.picture === "" ? "https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2019/05/17/1dcc0740f66c48eabb99b66f44565a6b_French-Press.png" : this.state.picture}/>
            </div>
                </div> */}
                
            
             
            <div id="profileLetters3" >Here are {this.props.user.name}'s favorite coffee shops:<br/>
            </div>
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

      )
        }
   
}
export default UserProfile