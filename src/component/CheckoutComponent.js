import { setNestedObjectValues } from 'formik';
import React from 'react'
import ApiService from './ApiService';
import { useHistory } from "react-router-dom";

function CheckoutComponent() {
    
    const [creditCard, setCreditCard] = React.useState("");
    const [creditCardName, setCreditCardName] = React.useState("");
    const [cvv, setCvv] = React.useState("");
    const [expirationDate, setExpirationDate] = React.useState("")
    const [shippingAddress, setShippingAddress] = React.useState("")
    const [billingAddress, setBillingAddress] = React.useState("")  

    const history = useHistory();

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
        // ApiService.putChanges(this.state.id, this.state.title, this.state.artist, this.state.description, this.state.price, this.state.genre, this.state.format, this.state.stock).then((response) =>{
        //     this.props.history.push('/admin')
        // }).catch(() => {
        //     this.props.history.push('/')
        // })

        console.log("REACHED THIS POINT")

        ApiService.createNewOrder(creditCard,creditCardName,cvv,expirationDate,shippingAddress,billingAddress).then(() =>{
            history.push("/")
        }).catch(() =>{
            history.push("/")
        })
    }
    
    return (
         
    <>
            <div className="form-group" style={{width: "50%", display:"inline-block"}}>
            <form onSubmit={e => {e.preventDefault() 
            handleSubmit()}}>  
                <div style={{paddingTop: '100px'}} className="form-group">    
                    
                    <h1>Name on card</h1>
                    <input type="text" className="form-control" name="client" value={creditCardName}  onChange={handleNameChange}/>              
        
                    <h1>Credit Card #</h1>
                    <input type="text" className="form-control" name="client" value={creditCard}  onChange={handleNumberChange}/>
                    
                    <h1>cvv</h1>
                    <input type="text" className="form-control" name="client" value={cvv}  onChange={handleCvvChange}/>
                    
                    <h1>Expiration Date</h1>
                    <input type="text" className="form-control" name="client" value={expirationDate}  onChange={handleDateChange}/ >
                    
                    <h1>Shipping Address</h1>
                    <input type="text" className="form-control" name="client" value={shippingAddress}  onChange={handleShippingChange}/ >
                    
                    <h1>Billing Address</h1>
                    <input type="text" className="form-control" name="client" value={billingAddress}  onChange={handleBillingChange}/ >             
                </div>  
            </form>
            <button className="btn btn-success"  type="button" onClick={handleSubmit}>Confirm Order</button>
            <div style={{paddingTop: '15px'}}><button className="btn btn-primary"  type="button" onClick={() => history.push("/cart")}>Back to Cart</button></div>
            </div>
        </>
    )
        
    
}

export default CheckoutComponent
