import React from "react";
import "../App.css";
import * as ReactBootStrap from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import ApiService from "./ApiService.jsx";
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const NavBar = () => {

  const toggleMe = () =>{
    ApiService.logout()
    window.location.reload(false);

  }

  return (
    <div className="App" style={{position: 'fixed', width:'100%', top:'0', zIndex:'1'}}>
      <ReactBootStrap.Navbar
        collapseOnSelect
        expand="xl"
        bg="dark"
        variant="dark"
        className="nava"
      >
      <Link to="/">
        <ReactBootStrap.Navbar.Brand>
            THE MUSIC CD SHOP      
        </ReactBootStrap.Navbar.Brand>
        </Link>
        
        <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootStrap.Navbar.Collapse   id="responsive-navbar-nav">
          <ReactBootStrap.Nav style={{marginLeft:'5%'}} className="mr-auto">
          
            <Link to="/cart" >
              <ReactBootStrap.Nav.Link style={{color:'whitesmoke'}} href="#all">
                    <FontAwesomeIcon icon={faShoppingCart} transform="down-4 grow-2.5" color="yellow"/>
              </ReactBootStrap.Nav.Link>
            </Link>
            
            <Link to="/">
              <ReactBootStrap.Nav.Link style={{color:'whitesmoke'}}  href="#all">
               All Products
              </ReactBootStrap.Nav.Link>
            </Link>


          <Link to="/login"><ReactBootStrap.Nav.Link style={{color:'whitesmoke'}} href="#all">Login</ReactBootStrap.Nav.Link></Link>
          {ApiService.isLoginSuccessfulJwt() && <Link to="/" onClick={toggleMe}><ReactBootStrap.Nav.Link style={{color:'whitesmoke'}} href="#all">Logout</ReactBootStrap.Nav.Link></Link>}
          {sessionStorage.getItem('isUserAdmin') && <Link to="/admin"><ReactBootStrap.Nav.Link style={{color:'whitesmoke'}}  href="#all"> Admin </ReactBootStrap.Nav.Link></Link>}
          
          </ReactBootStrap.Nav>
          <ReactBootStrap.Nav>
          </ReactBootStrap.Nav>
        </ReactBootStrap.Navbar.Collapse>
      </ReactBootStrap.Navbar>
    </div>
  );
};

export default NavBar;
