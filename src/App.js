import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'

import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import SignUp from './Components/singup';
import Register from './Components/Register';
import './App.css';

import Dashboard from './Components/Dashboard';
function App() {
  return(
  <Router>
  
       <Switch>
            <Route exact path="/" component={Register} />
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/dashboard" component ={Dashboard} />
        </Switch> 
</Router>
  );
}
export default App;
