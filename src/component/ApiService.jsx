import axios from "axios";
import React, { Component } from "react";
import { Redirect, withRouter } from 'react-router'

class ApiService extends Component{

    constructor(props){
        super(props)
    }


    getAlbumById(id){
        let token = sessionStorage.getItem('token')
        return axios.get(`http://localhost:8080/albums/lol/${id}`, {headers: {"Authorization": `${token}`}})
    }

    putChanges(id){
        let token = sessionStorage.getItem('token')
        return axios.post(`http://localhost:8080/albums/${id}`, {headers: {"Authorization": `${token}`}})
    }

    getAllAlbums(){
        
        let token = sessionStorage.getItem('token')

        return axios.get("http://localhost:8080/albums", {headers: {"Authorization": `${token}`}})
    }

    deleteAlbumById(id){
        let token = sessionStorage.getItem('token')

        console.log("it was called")
        return axios.delete(`http://localhost:8080/albums/${id}`,{headers: {"Authorization": `${token}`}})
    }


    deleteItemFromCart(id){
        let token = sessionStorage.getItem('token')
        return axios.delete(`http://localhost:8080/cart/${id}`,{headers: {"Authorization": `${token}`}})
    }

    getAllFromCart(){

        let token = sessionStorage.getItem('token')

        return axios.get("http://localhost:8080/cart", {headers: {"Authorization": `${token}`}})

    }

    createNewAlbumInCart(title, quantity){

        let token = sessionStorage.getItem('token')

        console.log( "MY TOKEN HERE" + token)

        console.log("quantity before hitting the backend " + quantity )

        return axios.post("http://localhost:8080/cart", {
            title,
            quantity           
        }, {headers: {"Authorization": `${token}`}})
    }

    getAllTasks(){
        return axios.get(`http://localhost:8080/albums`);
    }

    getAlbumByName(name){
        // let token = sessionStorage.getItem('token')
        return axios.get(`http://localhost:8080/albums/${name}`)
    }

    sendLoginRequest(username, password){
        
        let headers = {
            "Content-Type": "application/json"
        }
        
        return axios.post(`http://localhost:8080/loginme`, {
            username,
            password
        }, headers)
    }

    sendLoginRequestJwt(username, password){
        let headers = {
            "Content-Type": "application/json"
        };

        return axios.post("http://localhost:8080/authenticate", {
            username,
            password
        }, headers)
    }

    setupAxiosInterceptors(token){
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()){                
                    config.headers.authorization = token
                }
                return config
            } 
        )
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem('authenticatedUser')

        if(user === null){
            return false
        }
        return true
    }


    // registerSuccessfulLogin(){
    //     sessionStorage.setItem('loginSuccess', true)
    // }

    registerSuccessfulLoginJwt(username, token){
        sessionStorage.setItem('authenticatedUser', username)
        sessionStorage.setItem('token', 'Bearer '+ token)
        this.token = token;
    }

    getUsername(){
        let username = sessionStorage.getItem('authenticatedUser')
        console.log("HERE" + username)
        return username
    }


    isLoginSuccessfulJwt(){
        let userJwt = sessionStorage.getItem('token')
        
        console.log("successful!")

        if(userJwt === null){
            return false
        }
        return true
    }

    isLoginSuccessful(){
        let user = sessionStorage.getItem('loginSuccess')
        
        if(user === null){
            return false
        }else{
            return true
        }
    }

    logout(){
        sessionStorage.removeItem('authenticatedUser')
        sessionStorage.removeItem('token')
        // history.props.push('/')
        return <Redirect to='/'/>
    }

}

export default  withRouter( new ApiService());