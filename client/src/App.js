import React, {useState} from 'react';
import {
  Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import BudgetrNavbar from './components/BudgetrNavbar';
import Index from './components/Index';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import history from './history';
import './App.scss';

import Alert from 'react-bootstrap/Alert';

function App() {

  const [showAlert, setShowAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const alertClose = () => {
    setShowAlert(false);
    setErrorMsg('');
  }

  const alertOpen = (error) => {
    setShowAlert(true);
    setErrorMsg(error);
  }

  return (
    <Router history={history}>
      <BudgetrNavbar />
      <Alert show={showAlert} variant="danger" onClose={alertClose} dismissible>
        {errorMsg}
      </Alert>
      <Switch>
        <Route exact path="/">
          {!localStorage.getItem('token') ? <Index /> : <Redirect from="/" to="/dashboard" />}       
        </Route>
        <Route path="/login">
          {!localStorage.getItem('token') ? <Login error={alertOpen} /> : <Redirect from="/" to="/dashboard" />}
        </Route>
        <Route path="/register">
          {!localStorage.getItem('token') ? <Register error={alertOpen} /> : <Redirect from="/" to="/dashboard" />}
        </Route>
        <Route path="/dashboard">
          {!localStorage.getItem('token') ? <Redirect from="/dashboard" to="/" /> : <Dashboard error={alertOpen} />}
        </Route>
        <Route path="/settings">
          {!localStorage.getItem('token') ? <Redirect from ="/settings" to="/" /> : <Settings error={alertOpen} />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
