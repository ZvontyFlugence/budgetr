import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import banner from '../BudgetrBanner.svg';
import '../styles/BudgetrNavbar.scss';

class BudgetrNavbar extends React.Component {    
    logout() {
        localStorage.removeItem('token');
        window.location.reload();
    }

    render() {
        let navActions = !localStorage.getItem('token') ? (
            <Nav.Link href="/login" style={{color: '#71db77'}}>Login</Nav.Link>
        ) : (
            <NavDropdown title="Account" id="budgetr-nav-dropdown">
                <NavDropdown.Item className="budgetr-nav-dropdown-item" href="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className="budgetr-nav-dropdown-item" href="#" onClick={this.logout}>Logout</NavDropdown.Item>
            </NavDropdown>
        );
        return (
            <Navbar className="Budgetr-navbar" collapseOnSelect expand="lg">
                <Navbar.Brand href="/">
                    <img src={banner} width="150" className="d-inline-block align-top" alt="Budgetr" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="budgetr-navbar-nav" />
                <Navbar.Collapse id="budgetr-navbar-nav">
                    <Nav className="ml-auto">
                        {navActions}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default BudgetrNavbar;