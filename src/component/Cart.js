import React,  { useEffect, useState, Input } from "react";
import "./Box.css";
import ApiService from './ApiService.jsx'
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngry, faBan, faBarcode, faCode, faCross, faEdit, faEyeDropper, faHighlighter, faSkullCrossbones, faTrash } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";


const Cart = () => {
    const [albums, setAlbums] = useState([]);
    const [didUserLogin, setDidUserLogin] = React.useState(null);
    const [creditCard, setCreditCard] = React.useState("");
    const [creditCardName, setCreditCardName] = React.useState("");
    const [cvv, setCvv] = React.useState("");
    const [expirationDate, setExpirationDate] = React.useState("")
    const [shippingAddress, setShippingAddress] = React.useState("")
    const [billingAddress, setBillingAddress] = React.useState("")
    
    // const [albumNames, setAlbumNames] = React.useState(...[])

    var total = 0;
    var username = "";
    var id = 0;
    var albumNames = []
    var userTotal = 0;

    const setUserTotal = (value) =>{
        userTotal = value
    }

    const getUserTotal = () =>{
        return userTotal;
    }
    
    username = ApiService.getUsername();

    const now = new Date;
    const until = new Date(now.getFullYear() + 10, now.getMonth());
    

    const history = useHistory();
    const items = 0;
    const [currentTotal, setCurrentTotal] = React.useState(0);
    const handleNameChange = (event) =>{
        setCreditCardName(event.target.value)
        
    }
    
    const handleNumberChange = (event) =>{
        setCreditCard(event.target.value)
        
    }
    
    const handleCvvChange = (event) =>{
        
        setCvv(event.target.value)
    }
    
    const handleDateChange = (event) =>{
        setExpirationDate(event.target.value)
        
    }
    
    const handleShippingChange = (event) =>{
        
        setShippingAddress(event.target.value)
        
    }

    const handleBillingChange = (event) =>{
        
        setBillingAddress(event.target.value)
    }
    const handleSubmit = () =>{

        console.log("REACHED THIS POINT")

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
                        <Link className="nav-link" onClick ={() => history.push(`/item/${card.album.id}`)}>
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
       {/* {total === 0 && <div><b>Your Cart is Empty!</b></div>} */}
      {didUserLogin && <div><table className="table table-striped" style={{width: '70%', marginLeft: 'auto', marginRight: 'auto' }}><thead className="thead-dark"><tr><th>#</th> <th>TITLE</th><th>FORMAT</th><th>PRICE</th> <th>QUANTITY</th><th></th></tr></thead>{albums.map(renderCard)}</table><div style={{color: 'darkRed'}}><b>Your Total ${total}</b></div>{total !== 0 && <button onClick={() => history.push({pathname: "/checkout",
      
          state: {
              total: total
          }
      }) }className="btn btn-success">Checkout</button>}</div>}

      
    </>
    )
};

export default Cart;
