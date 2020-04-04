import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BudgetrNavbar from './components/BudgetrNavbar';
import Index from './components/Index';
import Login from './components/Login';
import Register from './components/Register';
import './App.scss';

function App() {
  return (
    <Router>
      <BudgetrNavbar />
      
      <Switch>
        <Route exact path="/">
          <Index />        
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
