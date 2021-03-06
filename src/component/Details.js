import React, { Component } from 'react'

export default class Details extends Component {
    
    constructor(props){
        super(props)

        this.state={

        }
    }

    componentDidMount(){
        if(this.props.location.state === undefined){
            this.props.history.push('/')
        }else{
            this.setState({title: this.props.location.state.title,
                 price: this.props.location.state.price, 
                 client: this.props.location.state.client, 
                 description: this.props.location.state.description})
        }
    } 
    
    render() {
        return (
            <>
                <h1 className="jumbotron"> {this.state.title} </h1>
                <text>{this.state.description}</text>
            </>
        )
    }
}
