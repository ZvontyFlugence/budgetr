import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';

import CategoryCard from './CategoryCard';

class DashboardContent extends React.Component {

    state = {
        showAddCategoryModal: false,
        showAddIncomeModal: false,
        showAddExpenseModal: false,
        name: "",
        limit: 0.00,
        categories: [],
    }

    componentDidMount() {
        fetch('http://localhost:5000/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            }
        })
        .then(response => response.json())
        .then(data => {
            let user = data.user;
            if (user) {
                this.setState({ ...this.state, categories: user.categories });
            }
        });
    }

    showAddCategoryModal = () => {
        this.setState({ ...this.state, showAddCategoryModal:  true });
    }

    hideAddCategoryModal = () => {
        this.setState({ ...this.state, showAddCategoryModal: false });
    }

    showAddIncomeModal = () => {
        this.setState({ ...this.state, showAddIncomeModal: true });
    }

    hideAddIncomeModal = () => {
        this.setState({ ...this.state, showAddIncomeModal: false });
    }

    showAddExpenseModal = () => {
        this.setState({ ...this.state, showAddExpenseModal: true });
    }

    hideAddExpenseModal = () => {
        this.setState({ ...this.state, showAddExpenseModal: false });
    }

    submitAddCategory = () => {
        let { name, limit } = this.state;
        fetch('http://localhost:5000/create-category', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ name, limit })
        })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                console.log(data.error);
            } else {
                window.location.reload();
            }
        })
    }
    
    submitAddIncome = () => {

    }

    submitAddExpense = () => {

    }

    render() {
        return (
            <div id="budgetr-dashboard-content">
                <Row className="budgetr-dashboard-banner">
                    <h4>Dashboard</h4>
                    <div className="ml-auto">
                        <Button variant="primary" onClick={this.showAddExpenseModal}>Add Expense</Button>
                        <Button variant="primary" onClick={this.showAddIncomeModal}>Add Income</Button>
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
                            <Accordion style={{ width: '100%' }}>
                                {this.state.categories && this.state.categories.map((cat, id) => <CategoryCard key={id} name={cat.name} limit={cat.limit} />)}
                            </Accordion>
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
                <Modal show={this.state.showAddIncomeModal} onHide={this.hideAddIncomeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Income</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="incomeName">
                                <Form.Label>Income Name</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group controlId="incomeDate">
                                <Form.Label>Income Date</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>
                            <Form.Group controlId="incomeAmount">
                                <Form.Label>Income Amount</Form.Label>
                                <Form.Control type="number" />
                            </Form.Group>
                            <Form.Group controlId="incomeConsistant">
                                <Form.Check type="switch" label="Is Consistant?" />
                            </Form.Group>
                            <Form.Group controlId="incomeSaving">
                                <Form.Check type="switch" label="Is Savings?" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.submitAddIncome}>Add Income</Button>
                        <Button variant="secondary" onClick={this.hideAddIncomeModal}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default DashboardContent;