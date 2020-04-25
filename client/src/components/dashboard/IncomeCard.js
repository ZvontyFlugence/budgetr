import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function IncomeCard(props) {

  const activeIncome = props.income;
  const [showEditIncomeModal, setShowEditIncomeModal] = useState(false);
  const [editIncomeData, setEditIncomeData] = useState({ name: '', amount: 0.00, date: activeIncome.date, isConsistent: activeIncome.isConsistent, isSavings: activeIncome.isSavings })
  const eventKey = (!props.income.isSavings) ? 'income' : 'savings';
  const display_date = activeIncome ? new Date(Date.parse(activeIncome.date[0].replace(/-/g, '/'))) : Date.now();

  const submitEditIncome = () => {
    let oldName = activeIncome.name;
    let oldAmount = activeIncome.amount;
    let oldIsSavings = activeIncome.isSavings;
    fetch(`${process.env.REACT_APP_API_URL}/edit-income`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        name: editIncomeData.name || oldName,
        amount: editIncomeData.amount || oldAmount,
        date: editIncomeData.date[0] || activeIncome.date,
        isConsistent: editIncomeData.isConsistent,
        isSavings: editIncomeData.isSavings,
        oldName,
        oldAmount,
        oldIsSavings,
      })
    })
    .then(response => response.json())
    .then(data => {
      if (!data.success) {
        props.error(data.error);
      } else {
        window.location.reload();
      }
    })
    .catch(err => props.error('Uh oh! Something went wrong!'));
  }

  const submitDeleteIncome = () => {
    fetch(`${process.env.REACT_APP_API_URL}/delete-income`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify(activeIncome)
    })
    .then(response => response.json())
    .then(data => {
      if (!data.success) {
        props.error(data.error);
      } else {
        window.location.reload();
      }
    })
    .catch(err => props.error('Uh oh! Something went wrong!'));
  }

  return (
    <>
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body style={{ padding: 5 }}>
              <Row style={{fontSize: 12}} onClick={() => setShowEditIncomeModal(true)}>
                <Col xs={5}>{props.income.name}</Col>
                <Col xs={4} style={{ textAlign: 'center' }}>{display_date.getMonth()+1}/{display_date.getDate()}/{display_date.getFullYear()}</Col>
                <Col xs={3} style={{ textAlign: 'right' }}>${props.income.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Col>
              </Row>
        </Card.Body>
      </Accordion.Collapse>
      <Modal show={showEditIncomeModal} onHide={() => setShowEditIncomeModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Income</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="incomeName">
              <Form.Label>Income Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={activeIncome.name}
                onChange={e => setEditIncomeData({ ...editIncomeData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="incomeDate">
              <Form.Label>Income Date</Form.Label>
              <Form.Control
                type="date"
                defaultValue={activeIncome.date}
                onChange={e => setEditIncomeData({ ...editIncomeData, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="incomeAmount">
              <Form.Label>Income Amount</Form.Label>
              <Form.Control
                type="number"
                defaultValue={activeIncome.amount}
                onChange={e => setEditIncomeData({ ...editIncomeData, amount: parseFloat(e.target.value) })}
              />
            </Form.Group>
            <Form.Group controlId="incomeConsistent">
              <Form.Check
                type="switch"
                label="Is Consistent?"
                checked={editIncomeData.isConsistent}
                onChange={() => setEditIncomeData({ ...editIncomeData, isConsistent: !editIncomeData.isConsistent })}
              />
            </Form.Group>
            <Form.Group controlId="incomeSavings">
              <Form.Check
                type="switch"
                label="Is Savings?"
                checked={editIncomeData.isSavings}
                onChange={() => setEditIncomeData({ ...editIncomeData, isSavings: !editIncomeData.isSavings })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={submitEditIncome}>Edit</Button>
          <Button variant="secondary" onClick={() => setShowEditIncomeModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={submitDeleteIncome}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}