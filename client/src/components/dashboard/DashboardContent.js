import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';

import CategoryCard from './CategoryCard';
import IncomeCard from './IncomeCard';

class DashboardContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAddCategoryModal: false,
            showAddIncomeModal: false,
            showAddExpenseModal: false,
            categoryName: "",
            categoryLimit: 0.00,
            user: null,
            incomeName: "",
            incomeDate: Date.now(),
            incomeAmount: 0.00,
            incomeConsistent: true,
            incomeSaving: false,
            expenseCategory: "",
            expenseName: "",
            expenseDate: Date.now(),
            expenseAmount: 0.00
        }
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
                this.setState({ ...this.state, user: user });
            }
        })
        .catch(err => this.props.error(err))
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
        let { categoryName, categoryLimit } = this.state;
        fetch('http://localhost:5000/create-category', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({ name: categoryName, limit: categoryLimit })
        })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                this.props.error(data.error);
            } else {
                window.location.reload();
            }
        })
        .catch(err => this.props.error(err));
    }
    
    submitAddIncome = () => {
        let { incomeName, incomeAmount, incomeDate, incomeConsistent, incomeSaving } = this.state;
        fetch('http://localhost:5000/add-income', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                name: incomeName,
                amount: incomeAmount,
                date: incomeDate,
                isConsistent: incomeConsistent,
                isSavings: incomeSaving
            })
        })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                this.props.error(data.error);
            } else {
                window.location.reload();
            }
        })
        .catch(err => this.props.error(err));
    }

    submitAddExpense = () => {
        let { expenseCategory, expenseName, expenseAmount, expenseDate } = this.state;
        fetch('http://localhost:5000/add-expense', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                expenseCategory,
                item: expenseName,
                amount: expenseAmount,
                date: expenseDate
            })
        })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                this.props.error(data.error);
            } else {
                window.location.reload();
            }
        })
        .catch(err => this.props.error(err));
    }

    render() {
        return (
            <div id="budgetr-dashboard-content">
                <Row className="budgetr-dashboard-banner">
                    <h4 style={{ paddingTop: 5 }}>Dashboard</h4>
                    <div className="ml-auto">
                        <Button variant="primary" onClick={this.showAddExpenseModal}>Add Expense</Button>
                        <Button variant="primary" onClick={this.showAddIncomeModal}>Add Income</Button>
                        <Button variant="primary">Generate Statement</Button>
                        {this.state.user && this.state.user.replyLink ? (
                            <Button variant="primary">View Last Report</Button>
                        ) : <></>}
                    </div>
                </Row>
                <Row style={{paddingTop: '5vh'}}>
                    <Col>
                        <Card bg="secondary" text="primary" border="primary" className="budgetr-category-list">
                            <Card.Header>
                                <Row>
                                    <Col style={{lineHeight: 2}}>Expenses: {this.state.user && `$${this.state.user.totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })} Total`}</Col>
                                    <Col md={2}>
                                        <Button variant="primary" size="sm" onClick={this.showAddCategoryModal}>+</Button>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Accordion style={{ width: '100%' }}>
                                {this.state.user && this.state.user.categories.map((cat, id) => (
                                    <CategoryCard key={id} cat={cat} />
                                ))}
                            </Accordion>
                        </Card>
                    </Col>
                    <Col>
                        <Card bg="secondary" text="primary" border="primary" className="budgetr-category-list">
                            <Card.Header>
                                <Row>
                                    <Col style={{lineHeight: 2}}>Income: {this.state.user && `$${(this.state.user.totalIncome + this.state.user.totalSavings).toLocaleString('en-US', { minimumFractionDigits: 2 })} Total`}</Col>
                                </Row>
                            </Card.Header>
                            <Accordion style={{ width: '100%' }}>
                                <Card className="category-card">
                                    <Accordion.Toggle as="div" variant="link" eventKey='income'>
                                        <Row>
                                            <Col><span>Income</span></Col>
                                            <Col>
                                                <span style={{ textAlign: 'right' }}>
                                                    ${this.state.user && this.state.user.totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </span>
                                            </Col>
                                        </Row>
                                    </Accordion.Toggle>
                                    {this.state.user && this.state.user.income.map((inc, id) => (
                                        <IncomeCard key={id} income={inc} />
                                    ))}
                                </Card>
                                <Card className="category-card">
                                    <Accordion.Toggle as="div" variant="link" eventKey='savings'>
                                        <Row>
                                            <Col><span>Savings</span></Col>
                                            <Col>
                                                <span style={{ textAlign: 'right' }}>
                                                    ${this.state.user && this.state.user.totalSavings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </span>
                                            </Col>
                                        </Row>
                                    </Accordion.Toggle>
                                    {this.state.user && this.state.user.savings.map((sav, id) => (
                                        <IncomeCard key={id} income={sav} />
                                    ))}
                                </Card>
                            </Accordion>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <p style={{margin: '0 auto', paddingTop: '5vh'}}>Row 3</p>
                </Row>
                <Modal show={this.state.showAddCategoryModal} onHide={this.hideAddCategoryModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="categoryName">
                                <Form.Label>Category Name</Form.Label>
                                <Form.Control type="text" onChange={e => this.setState({ ...this.state, categoryName: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="categoryLimit">
                                <Form.Label>Category Limit</Form.Label>
                                <Form.Control type="number" onChange={e => this.setState({ ...this.state, categoryLimit: parseFloat(e.target.value) })} />
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
                                <Form.Control type="text" onChange={e => this.setState({ ...this.state, incomeName: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="incomeDate">
                                <Form.Label>Income Date</Form.Label>
                                <Form.Control type="date" onChange={e => this.setState({ ...this.state, incomeDate: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="incomeAmount">
                                <Form.Label>Income Amount</Form.Label>
                                <Form.Control type="number" onChange={e => this.setState({ ...this.state, incomeAmount: parseFloat(e.target.value) })} />
                            </Form.Group>
                            <Form.Group controlId="incomeConsistent">
                                <Form.Check type="switch" label="Is Consistent?" checked={this.state.incomeConsistent} onChange={e => this.setState({ ...this.state, incomeConsistent: !this.state.incomeConsistent })} />
                            </Form.Group>
                            <Form.Group controlId="incomeSaving">
                                <Form.Check type="switch" label="Is Savings?" checked={this.state.incomeSaving} onChange={e => this.setState({ ...this.state, incomeSaving: !this.state.incomeSaving })} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.submitAddIncome}>Add Income</Button>
                        <Button variant="secondary" onClick={this.hideAddIncomeModal}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showAddExpenseModal} onHide={this.hideAddExpenseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Expense</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="expenseCategory">
                                <Form.Label>Expense Category</Form.Label>
                                <Form.Control as="select" onChange={e => this.setState({ ...this.state, expenseCategory: e.target.value })} >
                                    {this.state.user && this.state.user.categories.map((cat, id) => (
                                        <option key={id}>{cat.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="expenseName">
                                <Form.Label>Expense Name</Form.Label>
                                <Form.Control type="text" onChange={e => this.setState({ ...this.state, expenseName: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="expenseDate">
                                <Form.Label>Expense Date</Form.Label>
                                <Form.Control type="date" onChange={e => this.setState({ ...this.state, expenseDate: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="expenseAmount">
                                <Form.Label>Expense Amount</Form.Label>
                                <Form.Control type="number" onChange={e => this.setState({ ...this.state, expenseAmount: parseFloat(e.target.value) })} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.submitAddExpense}>Add Expense</Button>
                        <Button variant="secondary" onClick={this.hideAddExpenseModal}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default DashboardContent;