import React from 'react'

import  { Component } from 'react'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import ApiService from './ApiService';

export default class EditAlbumComponent extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            title: '',
            artist: '',
            description: '',
            price: '',
            genre: '',
            format: '',
            stock: ''
        };
    }

    
    componentDidMount(){

        console.log(this.state.id)
        ApiService.getAlbumById(this.state.id)
        .then(response => this.setState({
                title: response.data.title,
                artist: response.data.artist,
                description: response.data.description,
                price: response.data.price,
                genre: response.data.genre,
                format: response.data.format,
                stock: response.data.stock
        }))
    }
    
    
    render() {
        return (
            <div style={{paddingTop: '200px'}}>
               hi {this.state.title}
            </div>
        )
    }
}

