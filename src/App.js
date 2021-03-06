import React from 'react';
import "./App.css"
import Navbar from "./component/Navbar";
import MainPageProducts from "./component/MainPageProducts";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Details from './component/Details';
import LoginComponent from './component/LoginComponent';
import LogoutComponent from './component/LogoutComponent';
import Cart from './component/Cart.js';
import Admin from './component/Admin';
import EditAlbumComponent from './component/EditAlbumComponent';
import CheckoutComponent from './component/CheckoutComponent';
import EditCartItem from './component/EditCartItem';


const NavBar = () => {
    return(
        <div className="App">
        <Router>
            <Navbar  component={() => NavBar}/>
         <Switch>
          <Route path="/Login" component={LoginComponent}/>    
          <Route path="/cart" component={Cart}/>
          {/* <Route path="/item/:id" component={EditCartItem}/> */}
          <Route path="/admin" component={Admin}/>
          <Route path="/edit/:id" component={EditAlbumComponent}/>
          <Route path="/logout" component={LogoutComponent}/>
          <Route path="/details" component={Details}/>
          <Route path="/checkout" component={CheckoutComponent}/>
          <Route path="/" component={() => MainPageProducts}>
            <MainPageProducts />
          </Route>
        </Switch>
    </Router>
        </div>
    )
}

export default NavBar;