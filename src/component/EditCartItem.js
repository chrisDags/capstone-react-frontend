import React, { Component } from 'react'
import ApiService from './ApiService';


export default class EditCartItem extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            cartItem: [],
            quantity: "0"
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
        
    componentDidMount(){
         ApiService.getCartItem(this.state.id).then(response =>{
            this.setState({
                cartItem: [response.data]
            })   
         }).catch(() => this.props.history.push('/cart'))
         
         this.state.cartItem.map((item) => this.setState({quantity: item.quantity}))     
    }

    handleChange(event){
        this.setState({quantity: event.target.value})
    }

    handleSubmit(){
        ApiService.updateCartItemQuantity(this.state.id, this.state.quantity).then(response =>{
            this.props.history.push("/cart")
        }).catch(error =>{
            this.setState({
                hasError: true
            })
        })
    }

    render() {
        return (
            
            <div className="form-group" style={{width: "50%", display:"inline-block", paddingTop: "110px"}}>       
                {this.state.hasError && <h1>Error: Please enter a valid quantity</h1>}
                <h1>Change Quantity</h1>
                <input type="number" min="1" max="100" className="form-control" name="quantity" value={this.state.quantity}  onChange={this.handleChange}/ >
                <div style={{paddingTop: "20px"}}><button className="btn btn-success" onClick={this.handleSubmit}>Update</button></div>
            </div>
        )
    }
}
