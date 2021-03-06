import React, { Component } from 'react'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import ApiService from './ApiService';


export default class EditCartItem extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            album: [],
            quantity: "input" 
        };

        this.handleChange = this.handleChange.bind(this)
    }
        
    componentDidMount(){
        console.log(this.state.id)
         ApiService.getAlbumById(this.state.id).then(response =>{
            this.setState({
                album: [response.data]
            })   
         }).catch(() => this.props.history.push('/cart'))
         
         this.state.album.map((item) => this.setState({quantity: item.quantity}))     
    }

    handleChange(event){
        this.setState({quantity: event.target.value})
    }

    render() {
        return (

            <div className="form-group" style={{width: "50%", display:"inline-block", paddingTop: "110px"}}>
            
                <h1>Change Quantity</h1>
                <input type="text" className="form-control" name="quantity" value={this.state.quantity}  onChange={this.handleChange}/ >
            </div>
        )
    }
}
