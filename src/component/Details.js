import React, { useEffect, useState, Redirect } from "react";
import ApiService from "./ApiService.jsx";

function Details(props) {
    const [songs, setSongs] = useState([]);
    const [id, setId] = useState(props.location.state.id)
  
    useEffect(() => {
        ApiService.getAllSongsByAlbumId(id).then((response) => {
        setSongs(response.data);
        }).catch();

    }, []);

    return (
        <div>
              <div className="jumbotron"> 
              <h1>{props.location.state.title} by {props.location.state.artist}</h1>
              <h2> Genre: {props.location.state.genre}</h2>
              </div>
              <h1>About</h1>
              <p>{props.location.state.description}</p> 
              <h1>Track List</h1> 
              {songs.map(song => <h2><li>{song.songName}</li></h2>)}
        </div>
    )
}

export default Details

