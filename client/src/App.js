import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage"
import MainPage from "./components/MainPage"
import CardDetails from "./components/CardDetails"
import Register from "./components/Register"

import "./App.css";

function App() {
  return (
    <div className="App">
        <Route exact path="/" component={LandingPage}/> 
        <Route path="/MainPage" component={MainPage} />
        <Route path="/Products/:id" component={CardDetails}/>
        <Route path='/Register' component={Register}/>
        
    </div>
  );
}

export default App;
