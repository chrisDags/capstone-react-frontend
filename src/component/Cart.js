import React,  { useEffect, useState } from "react";
import "./Box.css";
import { Card } from "react-bootstrap";
import axios from "axios";
import ApiService from './ApiService.jsx'
import { useHistory } from "react-router-dom";
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
      ApiService.getAllFromCart().then(response => {
         setAlbums(response.data)
      }).catch(error => console.log(error));

      if(ApiService.isLoginSuccessfulJwt()){
        
        console.log("THIS RETURNS TRUE")
        setDidUserLogin(true)
      }else{
          console.log("RETURNED FALSE")
          setDidUserLogin(false)
      }

      console.log(albums);
    }, []);

  
    

  const deleteItem = (id) =>{
    ApiService.deleteItemFromCart(id).then(response =>{
        refresh()
    }).catch(error => console.log(error))
  }
    
  const refresh = () =>{
      ApiService.getAllFromCart().then(response => {
        setAlbums(response.data)
    }).catch(() => history.push('/'));
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

    total  = total + (card.quantity * card.album.price)

    return (
        <tbody>
          {

          
          <tr key = {card.album.id}>
                  <td>{id = id + 1}</td>
                  <td><b>{card.album.title}</b></td>
                  <td><b>{card.album.format}</b></td>
                  <td><b>{card.album.price}</b></td>
                  <td><b>{card.quantity}</b></td>
                  <td><b>{card.album.stock}</b></td>
                  <td>
                        <Link className="nav-link" to={`/`}>
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
      {didUserLogin && <div> <h1 style={{paddingTop: '100px'}}> {username}'s Cart</h1></div>}
      {didUserLogin && <div><table className="table table-striped" style={{width: '70%', marginLeft: 'auto', marginRight: 'auto' }}><thead className="thead-dark"><tr><th>#</th> <th>TITLE</th><th>FORMAT</th><th>PRICE</th> <th>QUANTITY</th><th>STOCK</th><th></th></tr></thead>{albums.map(renderCard)}</table><div style={{color: 'darkRed'}}><b>Your Total ${total}</b></div><button onClick={() => history.push("/checkout")}className="btn btn-success">Checkout</button></div>}
      
    </>
    )
};

export default Cart;
