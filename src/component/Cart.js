import React,  { useEffect, useState } from "react";
import "./Box.css";
import ApiService from './ApiService.jsx'
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


const Cart = () => {
    const [albums, setAlbums] = useState([]);
    const [didUserLogin, setDidUserLogin] = React.useState(null);
    const [creditCard] = React.useState("");
    const [creditCardName] = React.useState("");
    const [cvv] = React.useState("");
    const [expirationDate] = React.useState("")
    const [shippingAddress] = React.useState("")
    const [billingAddress] = React.useState("")
    

    var total = 0;
    var username = "";
    var id = 0;
    var albumNames = []
    var userTotal = 0;

    const setUserTotal = (value) =>{
        userTotal = value
    }
    
    username = ApiService.getUsername();

    const now = new Date;
    const until = new Date(now.getFullYear() + 10, now.getMonth());
    

    const history = useHistory();

    const handleSubmit = () =>{


        if(creditCard === "" || creditCardName === null || cvv === null || expirationDate === null || shippingAddress === null || billingAddress === null){
            history.push("/cart")
            return 
        }

        ApiService.createNewOrder(creditCard,creditCardName,cvv,expirationDate,shippingAddress,billingAddress, total, albumNames).then(() =>{
            history.push("/")
        }).catch(() =>{
            history.push("/")
        })
    }


    useEffect(() => {
      ApiService.getAllFromCart().then(response => {
         setAlbums(response.data)
      }).catch(error => console.log(error));

      if(ApiService.isLoginSuccessfulJwt()){
        
        setDidUserLogin(true)
      }else{
          setDidUserLogin(false)
      }

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


 const renderCard = (card, index) => {
  
    var temp = card.quantity
    total  = total + (card.quantity * card.album.price)
    setUserTotal(total)

    
    albumNames.push(card.album.title)

    return (
        <tbody>
          {

          
          <tr key = {card.album.id}>
                  <td>{id = id + 1}</td>
                  <td><b>{card.album.title}</b></td>
                  <td><b>{card.album.format}</b></td>
                  <td><b>${card.album.price}</b></td>
                  <td><b>{card.quantity}</b></td>
                  <td>
                        {/* <Link className="nav-link" onClick ={() => history.push(`/item/${card.album.id}`)}>
                            <FontAwesomeIcon icon={faEdit} transform="down-4 grow-2.5"/>
                        </Link>   */}
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
      {didUserLogin && <div><table className="table table-striped" style={{width: '70%', marginLeft: 'auto', marginRight: 'auto' }}><thead className="thead-dark"><tr><th>#</th> <th>TITLE</th><th>FORMAT</th><th>PRICE</th> <th>QUANTITY</th><th></th></tr></thead>{albums.map(renderCard)}</table><div style={{color: 'darkRed'}}><b>Your Total ${total}</b></div>{total !== 0 && <button onClick={() => history.push({pathname: "/checkout",
      
          state: {
              total: total
          }
      }) }className="btn btn-success">Checkout</button>}</div>}

      
    </>
    )
};

export default Cart;
