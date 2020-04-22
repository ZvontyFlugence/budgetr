import React from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Settings extends React.Component {
    state = {
        username: '',
        email: '',
        oldPass: '',
        password: '',
        confirm: '',
    }

    componentDidMount() {
        fetch('http://64.225.12.50:5000/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.user) {
                let user = data.user;
                this.setState({ username: user.username, email: user.email })
            }
        })
        .catch(err => console.log(err));
    }

    updateUsername = () => {
        fetch('http://64.225.12.50:5000/update-user/username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({ username: this.state.username })
        })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                console.log(data.error);
            } else {
                window.location.reload();
            }
        })
        .catch(err => console.log(err));
    }

    updateEmail = () => {
        fetch('http://64.225.12.50:5000/update-user/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({ email: this.state.email })
        })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                console.log(data.error);
            } else {
                window.location.reload();
            }
        })
        .catch(err => console.log(err));
    }

    updatePassword = () => {
        if ((this.state.confirm === this.state.password) && this.state.password !== this.state.oldPass) {
            fetch('http://64.225.12.50:5000/update-user/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({ oldPass: this.state.oldPass, password: this.state.password })
            })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    console.log(data.error);
                } else {
                    window.location.reload();
                }
            })
            .catch(err => console.log(err));
        } else {
            // TODO: Throw ERROR
        }
    }

    render() {
        return (
            <Container fluid style={{color: "#71db77", textAlign: "center"}}>
                <div className="budgetr-centered">
                    <Card bg="secondary" text="primary" border="primary" style={{ width: "30vw", textAlign: "left" }}>
                        <Card.Body>
                            <Card.Title style={{textAlign: "center"}}>Settings</Card.Title>
                            <Form>
                                <Form.Group controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={this.state.username}
                                        onChange={e => this.setState({ ...this.state, username: e.target.value })}
                                    />
                                    <br />
                                    <Button variant="primary" onClick={this.updateUsername}>Update</Button>
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        defaultValue={this.state.email}
                                        onChange={e => this.setState({ ...this.state, email: e.target.value })}
                                    />
                                    <br />
                                    <Button variant="primary" onClick={this.updateEmail}>Update</Button>
                                </Form.Group>
                                <Form.Group controlId="pw">
                                    <Form.Label>Change Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Current Password"
                                        onChange={e => this.setState({ ...this.state, oldPass: e.target.value })}
                                    />
                                    <br />
                                    <Form.Control
                                        type="password"
                                        placeholder="New Password"
                                        onChange={e => this.setState({ ...this.state, password: e.target.value })}
                                    />
                                    <br />
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm New Password"
                                        onChange={e => this.setState({ ...this.state, confirm: e.target.value })}
                                    />
                                    <br />
                                    <Button variant="primary" onClick={this.updatePassword}>Update</Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        );
    }
}

export default Settings;