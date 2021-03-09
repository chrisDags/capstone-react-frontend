import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import ApiService from './ApiService';

function EditCartItem(props) {

    if(props.location.state === undefined){
        history.push('/')
    }

    const [quantity, setQuantity] = useState(props.location.state.quantity)
    const [cartId, setCartId] = useState(props.location.state.cartId)
    const history = useHistory()

    const handleChange = (e) =>{
        setQuantity(e.target.value)
    }

    const handleSubmit = () =>{

        console.log(cartId)

        ApiService.updateCartItemQuantity(cartId, quantity).then((response) =>{
            alert("Updated quantity")
            history.push('/cart')
        }).catch((error) => history.push('/cart'))
        console.log('submit changes clicked')
    }

    return (
        <div>
           <h1 style={{paddingTop: "80px"}}>Album Selected: {props.location.state.title}</h1>
            <div className="form-group" style={{width: "10%", display:"inline-block"}}>
                <form onSubmit={e =>{
                    e.preventDefault()
                    handleSubmit()
                }}>  
                   <div className="form-group">    
                        <h2>Edit Quantity</h2>
                        <input type="number" className="form-control" min="1" max="100" value={quantity} onChange={handleChange}/>                        
                   </div>  
                </form>
                <button className="btn btn-success"  type="submit" onClick={() => handleSubmit()}>Submit Changes</button>
             </div>
        </div>
    )
}

export default EditCartItem

