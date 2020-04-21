import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

export default function CategoryCard(props) {
  return (
    <Card className="category-card">
      <Accordion.Toggle as={'div'} variant="link" eventKey={props.name}>
        <Row>
          <Col><span>{props.name}</span></Col>
          <Col>
            {props.limit > 0 ? (
              <span style={{ textAlign: 'right' }}>
                ${props.spent.toLocaleString('en-US', { minimumFractionDigits: 2 })} / ${props.limit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            ) : <></>}
          </Col>
        </Row>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={props.name}>
        <Card.Body style={{paddingLeft: 5}}>
          {props.expenses.map(expense => {
            let date = new Date(Date.parse(expense.date))
            return (
              <Row style={{fontSize: 12}}>
                <Col xs={5}>{expense.item}</Col>
                <Col xs={4} style={{textAlign: 'center'}}>{date.getMonth()+1}/{date.getDate()}/{date.getFullYear()}</Col>
                <Col xs={3} style={{textAlign: 'right'}}>${expense.amount}</Col>
              </Row>
            )
          })}
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );  
}