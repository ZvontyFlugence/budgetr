import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

class DashboardContent extends React.Component {

    state = {
        showAddCategoryModal: false,
        name: "",
        limit: 0.00,
    }

    showAddCategoryModal = () => {
        this.setState({ ...this.state, showAddCategoryModal:  true });
    }

    hideAddCategoryModal = () => {
        this.setState({ ...this.state, showAddCategoryModal: false });
    }

    submitAddCategory = () => {
        // let { name, limit } = this.state;        
        // TODO: Use Fetch to Call API to create new budget category
    }

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
                                    <Col style={{lineHeight: 2}}>Budget Categories</Col>
                                    <Col md={2}>
                                        <Button variant="primary" size="sm" onClick={this.showAddCategoryModal}>+</Button>
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
                <Modal show={this.state.showAddCategoryModal} onHide={this.hideAddCategoryModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Budget Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="categoryName">
                                <Form.Label>Category Name</Form.Label>
                                <Form.Control type="text" onChange={e => this.setState({ ...this.state, name: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="categoryLimit">
                                <Form.Label>Category Limit</Form.Label>
                                <Form.Control type="number" onChange={e => this.setState({ ...this.state, limit: parseFloat(e.target.value) })} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.submitAddCategory}>Add Category</Button>
                        <Button variant="secondary" onClick={this.hideAddCategoryModal}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default DashboardContent;