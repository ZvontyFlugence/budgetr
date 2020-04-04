import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import banner from '../BudgetrBanner.svg';
import '../styles/BudgetrNavbar.scss';

function BudgetrNavbar() {
    return (
        <Navbar className="Budgetr-navbar">
            <Navbar.Brand href="/">
                <img src={banner} width="150" className="d-inline-block align-top" alt="Budgetr" />
            </Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Link style={{color: '#71db77'}} href="/login">Login</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default BudgetrNavbar;