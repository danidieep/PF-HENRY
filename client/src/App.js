import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import MainPage from "./components/MainPage";
import CardDetails from "./components/CardDetails";
import RegisterLocal from "./components/RegisterLocal";
import Profile from "./components/Profile";
import ShopCart from "./components/ShopCart";
import PutArtwork from "./components/PutArtwork";
import PostArtwork from "./components/PostArtwork";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser, sendUserInfo, setUser } from "./actions";
import { useEffect } from "react";
import LoginLocal from "./components/Loginlocal";
import Users from "./components/Users";
import ArtistsPost from "./components/ArtistsPost";
import Favoritos from "./components/Favoritos";
import ResetPassword from "./components/ResetPassword";
import profileEdit from "./components/profileEdit";
import Security from "./components/Security";
import PayForm from "./components/PayForm";
import AllUserOrders from "./components/AllUserOrders";
import OrderByUser from "./components/OrderByUser";
import AboutUs from "./components/AbouUs";
import Maps from "./components/Maps";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { isAuthenticated, user } = useAuth0();

  //creamos en el local storege un array vacío
  !localStorage.getItem("user")
    ? localStorage.setItem("user", JSON.stringify([]))
    : console.log("va");
  //si esta autenticado sse subo los datos de auth0 al local storage, caso contrario se convertira en un array vacío
  !localStorage.getItem("product")
    ? localStorage.setItem("product", JSON.stringify([]))
    : console.log("va");
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
        idAuth: JSON.parse(localStorage.getItem("user")).idAuth,
        dateBorn: "0",
        password: "123",
        role: JSON.parse(localStorage.getItem("user")).role,
      };

  //si no esta autenticado userData sera igual a los datos del localStorage subidos anteriormente
  //tuve que hacer esto porque si recargas la pagina los datos de auth0 tardan en cargar
  //y al haber cargado una sola vez ya estan en localstorage

  useEffect(() => {
    if (isAuthenticated) dispatch(getUser(userData));
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
      <Route path="/PostArtwork" component={PostArtwork} />
      <Route path="/Users" component={Users} />
      <Route path="/PostArtist" component={ArtistsPost} />
      <Route path="/Favourites" component={Favoritos} />
      <Route path="/ProfileEdit" component={profileEdit} />
      <Route path="/Security/" component={Security} />
      <Route path="/ResetPassword" component={ResetPassword} />
      <Route path="/PayForm" component={PayForm} />
      <Route path="/AllUserOrders" component={AllUserOrders} />
      <Route path="/OrderByUser" component={OrderByUser} />
      <Route path="/AboutUs" component={AboutUs} />
      <Route path="/Map" component={Maps} />

    </div>
  );
}

export default App;
