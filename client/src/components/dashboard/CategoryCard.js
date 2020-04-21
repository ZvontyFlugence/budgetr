import React, {useState, useEffect} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function CategoryCard(props) {

  const [showEditExpenseModal, setShowEditExpenseModal] = useState(false);
  const [showEditCatModal, setShowEditCatModal] = useState(false);
  const [activeExpense, setActiveExpense] = useState({});
  const [editCatData, setEditCatData] = useState({ name: "", limit: 0.00 });
  const [expenseData, setExpenseData] = useState({ item: "", amount: 0.00, date: "", expenseCategory: "" })
  const [catList, setCatList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/user', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(data => {
      let user = data.user;
      if (user) {
        setCatList(user.categories);
      }
    })
  }, []);

  const editExpense = expense => {
    setActiveExpense(expense);
    setShowEditExpenseModal(true);
  }

  const submitEditCategory = () => {
    fetch('http://localhost:5000/edit-category', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify(editCatData)
    })
    .then(response => response.json())
    .then(data => {
      if (!data.success) {
        console.log(data.error);
      } else {
        window.location.reload();
      }
    });
  }

  const deleteCategory = name => {
    fetch('http://localhost:5000/delete-category', {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({ name })
    })
    .then(response => response.json())
    .then(data => {
      if (!data.success) {
        console.log(data.error);
      } else {
        window.location.reload();
      }
    });
  }

  const submitEditExpense = () => {
    fetch('http://localhost:5000/edit-expense', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify(expenseData)
    })
    .then(response => response.json())
    .then(data => {
      if (!data.success) {
        console.log(data.error);
      } else {
        window.location.reload();
      }
    });
  }

  const deleteExpense = () => {
    fetch('http://localhost:5000/delete-expense', {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify(activeExpense.item)
    })
    .then(response => response.json())
    .then(data => {
      if (!data.success) {
        console.log(data.error);
      } else {
        window.location.reload();
      }
    });
  }

  return (
    <Card className="category-card">
      <Accordion.Toggle as={'div'} variant="link" eventKey={props.cat.name}>
        <Row>
          <Col><span>{props.cat.name}</span></Col>
          <Col>
            {props.cat.limit > 0 ? (
              <span style={{ textAlign: 'right' }}>
                ${props.cat.spent.toLocaleString('en-US', { minimumFractionDigits: 2 })} / ${props.cat.limit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            ) : (
              <span style={{ textAlign: 'right' }}>
                Spent: ${props.cat.spent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            )}
          </Col>
        </Row>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={props.cat.name}>
        <Card.Body style={{padding: 5}}>
          <Button
            className="budgetr-edit-category-btn"
            variant="outline-light"
            size="sm"
            block
            onClick={() => setShowEditCatModal(true)}
          >
            Edit Category
          </Button>
          {props.cat.expenses.map((expense, id) => {
            let date = new Date(Date.parse(expense.date))
            return (
              <Row key={id} style={{fontSize: 12}} onClick={() => editExpense(expense)}>
                <Col xs={5}>{expense.item}</Col>
                <Col xs={4} style={{textAlign: 'center'}}>{date.getMonth()+1}/{date.getDate()}/{date.getFullYear()}</Col>
                <Col xs={3} style={{textAlign: 'right'}}>${expense.amount}</Col>
              </Row>
            )
          })}
        </Card.Body>
      </Accordion.Collapse>
      <Modal show={showEditCatModal} onHide={() => setShowEditCatModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="categoryName">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={props.cat.name}
                  onChange={e => setEditCatData({ ...editCatData, name: e.target.value })}
                />
              </Form.Group>
              {props.cat.limit > 0 ? (
                <Form.Group controlId="categoryLimit">
                  <Form.Label>Category Limit</Form.Label>
                  <Form.Control
                    type="number"
                    defaultValue={props.cat.limit}
                    onChange={e => setEditCatData({ ...editCatData, limit: parseFloat(e.target.value) })}
                  />
                </Form.Group>
              ) : <></>}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={submitEditCategory}>Edit</Button>
            <Button variant="secondary" onClick={() => setShowEditCatModal(false)}>Cancel</Button>
            {props.cat.limit > 0 ? (
              <Button variant="danger" onClick={() => deleteCategory(props.cat.name)}>Delete</Button>
            ) : <></>}
          </Modal.Footer>
      </Modal>
      <Modal show={showEditExpenseModal} onHide={() => setShowEditExpenseModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="expenseCategory">
              <Form.Label>Expense Category</Form.Label>
              <Form.Control
                as="select"
                defaultValue={activeExpense.expenseCategory}
                onChange={e => setExpenseData({ ...expenseData, expenseCategory: e.target.value })}
              >
                {catList.map((cat, id) => (
                  <option key={id}>{cat.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="expenseItem">
              <Form.Label>Expense Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={activeExpense.item}
                onChange={e => setExpenseData({ ...expenseData, item: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="expenseDate">
              <Form.Label>Expense Date</Form.Label>
              <Form.Control
                type="date"
                defaultValue={activeExpense.date}
                onChange={e => setExpenseData({ ...expenseData, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="expenseAmount">
              <Form.Label>Expense Amount</Form.Label>
              <Form.Control
                type="number"
                defaultValue={activeExpense.amount}
                onChange={e => setExpenseData({ ...expenseData, amount: parseFloat(e.target.value) })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={submitEditExpense}>Edit</Button>
          <Button variant="secondary" onClick={() => setShowEditExpenseModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={deleteExpense}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );  
}