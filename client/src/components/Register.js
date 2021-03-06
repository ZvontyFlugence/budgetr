import React from 'react';
import history from '../history';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirm: '',
        };
    }

    // TODO: Complete Registration Method
    register(event) {
        let {username, email, password, confirm} = this.state;
        
        if (password !== confirm) {
            this.props.error('Passwords Do Not Match');
        }

        // TODO: Use a config to decide what url to use
        fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status_code === 201) {
                localStorage.setItem('token', data.token)
                history.push('/dashboard');
                window.location.reload();
            } else {
                this.props.error(data.error);
            }
        })
        
        event.preventDefault();
    }

    render() {
        return (
            <div className="Budgetr">
                <header className="Budgetr-header">
                    <Card bg="secondary" text="primary" border="primary" style={{width: '30rem', textAlign: 'left'}}>
                        <Card.Body>
                            <Card.Title style={{textAlign: 'center'}}>Register</Card.Title>
                            <Form onSubmit={e => this.register(e)}>
                                <Form.Group controlId="registerUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Username" onChange={e => this.setState({ ...this.state, username: e.target.value })} />
                                </Form.Group>
                                <Form.Group controlId="registerEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email" onChange={e => this.setState({ ...this.state, email: e.target.value })} />
                                </Form.Group>
                                <Form.Group controlId="registerPass">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={e => this.setState({ ...this.state, password: e.target.value })} />
                                </Form.Group>
                                <Form.Group controlId="registerConfirmPass">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm" onChange={e => this.setState({ ...this.state, confirm: e.target.value })} />
                                </Form.Group>
                                <Button variant="primary" type="submit">Register</Button>
                                <p style={{textAlign: 'center'}}>Already have an account? <a href="/login">Login!</a></p>
                            </Form>
                        </Card.Body>
                    </Card>
                </header>
            </div>
        );
    }
}

export default Register;