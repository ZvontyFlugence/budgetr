import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

class Login extends React.Component {
    state = {
        email: '',
        password: '',
    };

    // TODO: Complete Login Method
    login() {
        // let {email, password} = this.state;
    }

    render() {
        return (
            <div className="Budgetr">
                <header className="Budgetr-header">
                    <Card bg="secondary" text="primary" border="primary" style={{width: '30rem', textAlign: 'left'}}>
                        <Card.Body>
                            <Card.Title style={{textAlign: 'center'}}>Login</Card.Title>
                            <Form>
                                <Form.Group controlId="loginEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email" />
                                </Form.Group>
                                <Form.Group controlId="loginPass">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Button variant="primary">Login</Button>
                                <p style={{textAlign: 'center'}}>Don't have an account? <a href="/register">Sign up!</a></p>
                            </Form>
                        </Card.Body>
                    </Card>
                </header>
            </div>
        );
    }
}

export default Login;