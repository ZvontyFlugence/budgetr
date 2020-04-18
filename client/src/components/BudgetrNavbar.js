import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import banner from '../BudgetrBanner.svg';
import '../styles/BudgetrNavbar.scss';

class BudgetrNavbar extends React.Component {
    state = {
        username: "Account",
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        
        if (token) {
            fetch('http://localhost:5000/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            })
            .then(response => response.json())
            .then(data => {
                let user = data.user;
                if (user) {
                    this.setState({ username: user.username });
                }
            })
        }
    }
    

    logout() {
        localStorage.removeItem('token');
        window.location.reload();
    }

    render() {
        let navActions = !localStorage.getItem('token') ? (
            <Nav.Link href="/login" style={{color: '#71db77'}}>Login</Nav.Link>
        ) : (
            <NavDropdown title={this.state.username} id="budgetr-nav-dropdown">
                <NavDropdown.Item className="budgetr-nav-dropdown-item" href="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className="budgetr-nav-dropdown-item" href="#" onClick={this.logout}>Logout</NavDropdown.Item>
            </NavDropdown>
        );
        return (
            <Navbar className="Budgetr-navbar" collapseOnSelect expand="lg">
                <Navbar.Brand href="/">
                    <img src={banner} className="d-inline-block align-top budgetr-nav-logo" alt="Budgetr" />
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