import React from "react"
class LoginForm extends React.Component {
    state = {
        value: ""
    }
    render(){
     
        return(


            <form onSubmit={()=>this.props.loginSubmit(this.state.value)}>
            <label>Username:
            <input type="text" value={this.state.value} onChange={(event)=>this.setState({value: event.target.value})}/>
            </label>
            <input type="submit" value="submit" />
            </form>


        ) 
    
    }
}

export default LoginForm