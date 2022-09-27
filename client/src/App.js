import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import MainPage from "./components/MainPage";
import CardDetails from "./components/CardDetails";
import RegisterLocal from "./components/RegisterLocal";
import Profile from "./components/Profile";
import ShopCart from "./components/ShopCart";
import PutArtwork from "./components/PutArtwork";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser, sendUserInfo, setUser } from "./actions";
import { useEffect } from "react";
import LoginLocal from "./components/Loginlocal";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { isAuthenticated, user } = useAuth0();

  //creamos en el local storege un array vacío
  !localStorage.getItem("user")?localStorage.setItem("user", JSON.stringify([])):console.log("va")
  //si esta autenticado sse subo los datos de auth0 al local storage, caso contrario se convertira en un array vacío
  console.log(user)
  const userData = isAuthenticated
    ? {
        name: user.given_name,
        lastname: user.family_name,
        email: user.email,
        idAuth: user.sub,
        dateBorn: "0",
        password: "123",
        //si esta auntenticado userData va a ser igual a los datos auth0
      }
    : {
        name: JSON.parse(localStorage.getItem("user")).given_name,
        lastname: JSON.parse(localStorage.getItem("user")).family_name,
        email: JSON.parse(localStorage.getItem("user")).email,
        idAuth:JSON.parse(localStorage.getItem("user")).idAuth, 
        dateBorn: "0",
        password: "123",
      };

     

  //si no esta autenticado userData sera igual a los datos del localStorage subidos anteriormente
  //tuve que hacer esto porque si recargas la pagina los datos de auth0 tardan en cargar
  //y al haber cargado una sola vez ya estan en localstorage

 useEffect(() => {
     if (isAuthenticated)dispatch(getUser(userData));
   }, [user]);

  

  //si esta autenticado se despachara la accion getUser con la data de arriba
  //prestara atencion a los cambios de estados de user

  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route path="/MainPage" component={MainPage} />
      <Route path="/Products/:id" component={CardDetails} />
      <Route path="/LocalRegister" component={RegisterLocal} />
      <Route path="/LocalLogin" component={LoginLocal} />
      <Route path="/Profile" component={Profile} />
      <Route path="/ShopCart" component={ShopCart} />
      <Route path="/PutArtwork/:id" component={PutArtwork} />
    </div>
  );
}

export default App;
