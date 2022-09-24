import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage"
import MainPage from "./components/MainPage"
import CardDetails from "./components/CardDetails"
import RegisterLocal from "./components/RegisterLocal"
import Profile from "./components/Profile"
import ShopCart from "./components/ShopCart";
import PutArtwork from "./components/PutArtwork"
import { useAuth0 } from "@auth0/auth0-react";

import "./App.css";
import { useDispatch } from "react-redux";
import { getUser } from "./actions";
import { useEffect } from "react";


function App() {
  const dispatch = useDispatch()

   const {isLoading,isAuthenticated, user} = useAuth0()

   const userData = isAuthenticated?{
    name:user.given_name,
    lastname:user.family_name,
    email:user.email,
    dateBorn:"0",
    password:"123"

  }:{
    name:JSON.parse(localStorage.getItem("user")).given_name,
    lastname:JSON.parse(localStorage.getItem("user")).family_name,
    email:JSON.parse(localStorage.getItem("user")).email,
    dateBorn:"0",
    password:"123"}


   isAuthenticated? localStorage.setItem("user", JSON.stringify(user)):localStorage.setItem("user", JSON.stringify([]))
   if(isAuthenticated)dispatch(getUser(userData))

   useEffect(()=>{
    
   },[])

  return (
    <div className="App">
        <Route exact path="/" component={LandingPage}/> 
        <Route path="/MainPage" component={MainPage} />
        <Route path="/Products/:id" component={CardDetails}/>
        <Route path='/Register' component={RegisterLocal}/>
        <Route path="/Profile" component={Profile}/>
        <Route path="/ShopCart" component={ShopCart}/>
        <Route path='/PutArtwork/:id' component={PutArtwork}/>
    </div>
  );
}

export default App;
