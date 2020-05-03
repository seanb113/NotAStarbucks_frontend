
import React from "react"
import {Link} from 'react-router-dom'
import { Button, Form, Segment } from "semantic-ui-react"
class LoginForm extends React.Component {
    state = {
        name: "",
        password: ""
    }

    handleLoginSubmit = (e) => {
      fetch('http://localhost:4000/login', {
      method: "POST",
      headers: {
        "Content-Type" :"application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        password: this.state.password
      })
    }).then(res => res.json())
    .then(data => {
      debugger
      console.log(data)
      if(data.successful){
        let user = data.data
        localStorage.setItem("jwt", data.token)
        this.props.loginSubmit(user)
        fetch(`http://localhost:4000/users/${user.id}/coffeeshops`)
        .then(r=>r.json())
        .then(r=>this.props.recallFavs(r)
        
          )
        }else{
          alert(data.message)
        }})
    }
    render(){
     
        return(

        <Segment id="loginSegment">
        <Form
            onSubmit={this.handleLoginSubmit}
            >
            <Form.Group widths="equal">
            <Form.Input
            label="username" value={this.state.name} onChange={(event)=>this.setState({name: event.target.value})}
            />
            <Form.Input            
            type="password" label="password" value={this.state.password} onChange={(event)=>this.setState({password: event.target.value})}/>
            </Form.Group>
            <button className="ui inverted button" type="submit">Login </button>
            <Link to="/signup">
              <Button className="ui inverted button">Sign Up</Button>
            </Link>
            </Form>
            </Segment>
        ) 
    }
}

export default LoginForm