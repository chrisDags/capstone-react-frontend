import './LoginComponent.css'
import './ApiService.jsx'

import React,{Component} from 'react'
import ApiService from "./ApiService.jsx";

class LoginComponent extends Component{
    constructor(props){
       
        super(props)
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleValidation = this.handleValidation.bind(this)
    }
    shouldComponentUpdate(nextProps, nextState){
        return true
    }

    componentDidMount(){
    }

    componentDidUpdate(){
    }


    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }


    handleKeyPress = event => {
        if (event.key === 'Enter') {
            this.handleLogin()
        }
      };


     async handleLogin(){

       await ApiService.sendLoginRequestJwt(this.state.username, this.state.password)
        .then(response => {

            ApiService.registerSuccessfulLoginJwt(this.state.username, response.data.jwt);

            ApiService.getIsUserAdmin().then(response =>{

                sessionStorage.setItem('isUserAdmin', true) 
                 this.props.history.push('/')
                 window.location.reload(false);
                 
             }).catch(() =>{
                 this.props.history.push('/')
                 window.location.reload(false);
             })  

        }).catch(()=>{
            this.setState({hasLoginFailed: true})
        })
      
    } 
    
    handleValidation(){
    //    ApiService.getIsUserAdmin().then(response =>{

    //         sessionStorage.setItem('isUserAdmin', true) 
    //          console.log(response.data)
    //          this.props.history.push('/')
    //          window.location.reload(false);
             
    //      }).catch(() =>{
    //          this.props.history.push('/')
    //          window.location.reload(false);
    //      })
 
    //       this.props.history.push('/')
          //window.location.reload(false);

    }
    
    render(){
                return(
                    <div>
                        <div style={{paddingTop: '75px'}} >
                        {this.state.hasLoginFailed && <div className="alert alert-danger">Invalid Credentials</div>}
                            <h1>{ApiService.isUserLoggedIn() ? 'Login As Another User' : 'Login'}</h1>
                            <div className="custom-div">Username: <input type ="text" name = "username" value = {this.state.username} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/></div>
                            <div className="custom-div">Password: <input type ="password" name = "password" value ={this.state.password} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/></div>
                            <div className="custom-div"><button className="btn btn-success" onClick={this.handleLogin} loading={this.state.load}>Login</button></div>                    
                        </div>
                    </div>
                )
    }
}


export default LoginComponent