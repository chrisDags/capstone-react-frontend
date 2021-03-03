import React,  { useEffect, useState } from "react";
import "./Box.css";
import { Card } from "react-bootstrap";
import axios from "axios";
import ApiService from './ApiService.jsx'
import { Redirect, useHistory } from "react-router";
import { Link } from 'react-router-dom';
import SearchField from "react-search-field";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngry, faBan, faBarcode, faCode, faCross, faEdit, faEyeDropper, faHighlighter, faSkullCrossbones, faTrash } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
    const [albums, setAlbums] = useState([]);
    const [didUserLogin, setDidUserLogin] = React.useState(null);

    var total = 0;
    var username = "";
    var id = 0;
    username = ApiService.getUsername();
    
    const history = useHistory();

    const items = 0;
    const [currentTotal, setCurrentTotal] = React.useState(0);

    useEffect(() => {
      ApiService.getAllAlbums().then(response => {
         setAlbums(response.data)
      }).catch(error => console.log(error));

      if(ApiService.isLoginSuccessfulJwt()){
          setDidUserLogin(true)
      }else{
          setDidUserLogin(false)
      }

      console.log(albums);
    }, []);

  
    

  const deleteItem = (id) =>{
    ApiService.deleteAlbumById(id).then(response =>{
        refresh()
    }).catch(error => console.log(error))
  }
    
  const refresh = () =>{
    ApiService.getAllAlbums().then(response => {
        setAlbums(response.data)
     }).catch(error => console.log(error));

     if(ApiService.isLoginSuccessfulJwt()){
         setDidUserLogin(true)
     }else{
         setDidUserLogin(false)
     }
  }


  const getLoginValue = () =>{
    if(ApiService.isLoginSuccessfulJwt()){
        return true
    }
    return false;
  }  

 const renderCard = (card, index) => {

    return (
        <tbody>
          {

          
          <tr key = {card.id}>
                  <td>{id = id + 1}</td>
                  <td>{card.title}</td>
                  <td>{card.format}</td>
                  <td>{card.genre}</td>
                  <td>{card.price}</td>
                  <td>{card.artist}</td>
                  <td>{card.description}</td>
                  <td>{card.stock}</td>
                  <td>
                        <Link className="nav-link" to={`/edit/${card.id}`}>
                            <FontAwesomeIcon icon={faEdit} transform="down-4 grow-2.5"/>
                        </Link>                                          
                        <Link className="nav-link" onClick={() => deleteItem(card.id)}>
                            <FontAwesomeIcon icon={faTrash} transform="down-4 grow-2.5" color="darkRed"/>
                        </Link>
                  </td>                                          
              </tr>    
          }     
        </tbody>
                       
    );
  };
    return (
      <>
      {didUserLogin === false && <div style={{paddingTop: '55px'}}><h1>Please Login</h1> <button className="btn btn-primary" onClick={ () => history.push('/login')}>Login Page</button> </div>}
      {didUserLogin && <div> <h1 style={{paddingTop: '100px'}}> Modify Album List</h1></div>}
      {didUserLogin && <div><table className="table table-striped" style={{width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
      <thead className="thead-dark"><tr><th>#</th> <th>TITLE</th><th>FORMAT</th><th>GENRE</th><th>PRICE</th>
       <th>ARTIST</th><th>DESCRIPTION</th><th>Available</th><th></th></tr></thead>{albums.map(renderCard)}</table></div>}
      
    </>
    )
};

export default Cart;
