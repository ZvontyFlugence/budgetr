import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

class DashboardContent extends React.Component {
    render() {
        return (
            <div id="budgetr-dashboard-content">
                <Row className="budgetr-dashboard-banner">
                    <h4>Dashboard</h4>
                    <div className="ml-auto">
                        <Button variant="primary">Add Income</Button>
                        <Button variant="primary">Generate Statement</Button>
                    </div>
                </Row>
                <Row style={{paddingTop: '5vh'}}>
                    <Col>
                        <Card bg="secondary" text="primary" border="primary" className="budgetr-category-list">
                            <Card.Header>
                                <Row>
                                    <Col>Budget Categories</Col>
                                    <Col md={2}>
                                        <Button variant="primary" size="sm">+</Button>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <ListGroup variant="flush">
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col>Col 2</Col>
                </Row>
                <Row>
                    <p style={{margin: '0 auto', paddingTop: '5vh'}}>Row 3</p>
                </Row>
            </div>
        );
    }
}

export default DashboardContent;