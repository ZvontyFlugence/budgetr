import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import logo from '../BudgetrBanner.svg';

function Index() {
    return (
      <div className="Budgetr">
        <header className="Budgetr-header">
          <img src={logo} className="Budgetr-logo" alt="logo" />
          <p style={{fontSize: 'calc(10px + 2vmin)', color: 'white'}}>Money Management Web Application</p>
          <div style={{display: 'inline-block'}}>
            <Link to="/login"><Button className="mr-4" variant="primary">Login</Button></Link>
            <Link to="/register"><Button variant="primary">Register</Button></Link>
          </div>
        </header>
      </div>
    );
  }

  export default Index;