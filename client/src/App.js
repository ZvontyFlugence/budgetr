import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import BudgetrNavbar from './components/BudgetrNavbar';
import Index from './components/Index';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.scss';

function App() {
  return (
    <Router>
      <BudgetrNavbar />
      
      <Switch>
        <Route exact path="/">
          {!localStorage.getItem('token') ? <Index /> : <Redirect from="/" to="/dashboard" />}       
        </Route>
        <Route path="/login">
          {!localStorage.getItem('token') ? <Login /> : <Redirect from="/" to="/dashboard" />}
        </Route>
        <Route path="/register">
          {!localStorage.getItem('token') ? <Register /> : <Redirect from="/" to="/dashboard" />}
        </Route>
        <Route path="/dashboard">
          {!localStorage.getItem('token') ? <Redirect from="/dashboard" to="/" /> : <Dashboard />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
