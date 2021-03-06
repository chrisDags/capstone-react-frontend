import React, {useEffect} from 'react'
import ApiService from './ApiService';
import { useHistory } from "react-router-dom";

const CheckoutComponent = (props) => {
    
    const [creditCard, setCreditCard] = React.useState("");
    const [creditCardName, setCreditCardName] = React.useState("");
    const [cvv, setCvv] = React.useState("");
    const [expirationDate, setExpirationDate] = React.useState("")
    const [shippingAddress, setShippingAddress] = React.useState("")
    const [billingAddress, setBillingAddress] = React.useState("")
    const [cartItems, setCartItems] = React.useState([])  

    const history = useHistory();
    const [hasErrors, setHasErrors] = React.useState(false)

    useEffect(() => {
        ApiService.getAllFromCart().then(response => {
           setCartItems(response.data)
        }).catch(error => console.log(error));
      }, []);
  


    const deleteAll = () =>{
        cartItems.map((item) => 
            ApiService.deleteItemFromCart(item.id).then(response =>{
                history.push('/cart')
            }).catch(error =>{
                history.push('/')
            })

        )
    }
 

    const handleNameChange = (event) =>{
        setCreditCardName(event.target.value)
        
    }
    /*
        albumName, quantity, albumPrice
    */

    var currentDate = new Date().toISOString().slice(0,10)

    const postCartItems = (orders) =>{

        let id = orders.id
    

        cartItems.map(item =>{
            ApiService.createOrderItem(item.album.title, item.quantity, item.album.price, id).then().catch(() =>{
                history.push("/")
            })
        })

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


        if(creditCard === "" || creditCardName === "" || cvv === "" || expirationDate === "" || shippingAddress === ""|| billingAddress === ""){
            setHasErrors(true)
            return
        }else{
            setHasErrors(false)
        }

        let mytotal = props.location.state.total

        ApiService.createNewOrder(creditCard,creditCardName,cvv,expirationDate,shippingAddress,billingAddress, mytotal).then(resp =>{
            
            postCartItems(resp.data)
            
            history.push("/")
            alert("Order Completed!")            

        }).catch(() =>{
            history.push("/")
        })

        deleteAll()
    }
    
    return (


         
    <>
            {/* {isOrderSuccessful && <div className="alert alert-success">Order Completed!</div>} */}
            <div className="form-group" style={{width: "50%", display:"inline-block"}}>
            
            <form onSubmit={e => {e.preventDefault() 
            handleSubmit()}}>  
                <div style={{paddingTop: '100px'}} className="form-group">
                    {hasErrors && <h1 style={{display:"inline-block"}} className="alert alert-danger">Error</h1>}    
                    <h1>Name on Card</h1>
                    <input type="text" minLength="2" maxLength="46" className="form-control" name="client" value={creditCardName}  onChange={handleNameChange}/>              
                    <h1>Credit Card #</h1>
                    <input type="text" minLength="16" maxLength="16" name="client" value={creditCard}  onChange={handleNumberChange}/>
                    <h1>CVV</h1>
                    <input type="text"  minLength = "3" maxLength = "3" className="form-control" name="client" value={cvv}  onChange={handleCvvChange}/>
                    <h1>Expiration Date</h1>
                    <input type="date"   value = {currentDate} min = {currentDate} className="form-control datepicker" name="client" value={expirationDate}  onChange={handleDateChange}/ >        
                    <h1>Shipping Address</h1>
                    <input type="text"  minLength="5" maxLength="46" className="form-control" name="client" value={shippingAddress}  onChange={handleShippingChange}/ >       
                    <h1>Billing Address</h1>
                    <input type="text" minLength="5" maxLength="46" className="form-control" name="client" value={billingAddress}  onChange={handleBillingChange}/ >             
                </div>  
                <submit className="btn btn-success"  type="button" onClick={handleSubmit}>Confirm Order</submit>
            </form>
            <h1>Your total: ${props.location.state.total}</h1>
            <div style={{paddingTop: '15px'}}><button className="btn btn-primary"  type="button" onClick={() => history.push('/cart')}>Back to Cart</button></div>
            </div>
        </>
    )
}

export default CheckoutComponent
