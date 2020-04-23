import React from 'react';
import history from '../history';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    componentDidUpdate() {
        if (localStorage.getItem('token')) {
            history.push('/dashboard');
            window.location.reload();
        }
    }

    login(e) {
        let {email, password} = this.state;

        // TODO: Use a config to decide what url to see
        fetch("http://localhost:5000/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status_code === 200) {
                localStorage.setItem('token', data.token);
                window.location.reload();
            } else {
                this.props.error(data.error);
            }
        });

        e.preventDefault();
    }

    render() {
        return (
            <div className="Budgetr">
                <header className="Budgetr-header">
                    <Card bg="secondary" text="primary" border="primary" style={{width: '30rem', textAlign: 'left'}}>
                        <Card.Body>
                            <Card.Title style={{textAlign: 'center'}}>Login</Card.Title>
                            <Form onSubmit={e => this.login(e)}>
                                <Form.Group controlId="loginEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email" onChange={e => this.setState({ ...this.state, email: e.target.value })} />
                                </Form.Group>
                                <Form.Group controlId="loginPass">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={e => this.setState({ ...this.state, password: e.target.value })} />
                                </Form.Group>
                                <Button variant="primary" type="submit">Login</Button>
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