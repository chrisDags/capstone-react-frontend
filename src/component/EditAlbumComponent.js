import React from 'react'

import  { Component } from 'react'
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
            format: ''
           
        };

    
        this.handleSubmit = this.handleSubmit.bind(this)
        this.priceChange = this.priceChange.bind(this)
        this.titleChange = this.titleChange.bind(this)
        this.artistChange = this.artistChange.bind(this)
        this.descriptionChange = this.descriptionChange.bind(this)
        this.genreChange = this.genreChange.bind(this)
        this.formatChange = this.formatChange.bind(this)
    }


    componentDidMount(){
        
        ApiService.getAlbumById(this.state.id)
        .then(response => this.setState({
                title: response.data.title,
                artist: response.data.artist,
                description: response.data.description,
                price: response.data.price,
                genre: response.data.genre,
                format: response.data.format
        })).catch(()=>{
            this.props.history.push('/')
        })
    }

    handleSubmit(){
        ApiService.putChanges(this.state.id, this.state.title, this.state.artist, this.state.description, this.state.price, this.state.genre, this.state.format, this.state.stock).then((response) =>{
            this.props.history.push('/admin')
        }).catch(() => {
            this.props.history.push('/')
        })
    }
    
    priceChange(event){

        this.setState({price: event.target.value})

    }

    titleChange(event){

        this.setState({title: event.target.value})

    }

    artistChange(event){

        this.setState({artist: event.target.value})

    }

    descriptionChange(event){

        this.setState({description: event.target.value})

    }

    genreChange(event){

        this.setState({genre: event.target.value})

    }

    formatChange(event){

        this.setState({format: event.target.value})

    }
    
    render() {
        return (
            <>
             <div className="form-group" style={{width: "50%", display:"inline-block"}}>
                <form onSubmit={e => {e.preventDefault() 
                this.handleSubmit()}}>  
                   <div style={{paddingTop: '100px'}} className="form-group">    
                        <h1>Title</h1>
                        <input type="text" className="form-control" value={this.state.title}  onChange={this.titleChange}/>              
                        <h1>Artist</h1>
                        <input type="text" className="form-control" value={this.state.artist}  onChange={this.artistChange}/>
                        <h1>Description</h1>
                        <input type="text" className="form-control" value={this.state.description}  onChange={this.descriptionChange}/>
                        <h1>Price</h1>
                        <input type="number" className="form-control" min="1" name="client" value={this.state.price}  onChange={this.priceChange}/ >
                        <h1>Genre</h1>
                        <input type="text" className="form-control" value={this.state.genre}  onChange={this.genreChange}/ >
                        <h1>Format</h1>
                        <input type="text" className="form-control" value={this.state.format}  onChange={this.formatChange}/ >             
                   </div>  
                </form>
                <button className="btn btn-success"  type="button" onClick={() => this.handleSubmit()}>Submit Changes</button>
                <div style={{paddingTop:"10px"}}><button className="btn btn-primary" onClick={() => this.props.history.push("/finance")}>Return To List</button></div>
             </div>
             </>
        )
    }
}

