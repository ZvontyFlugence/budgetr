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
            <span style={{ textAlign: 'right' }}>
              Limit: ${props.limit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </Col>
        </Row>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={props.name}>
        <Card.Body>{props.name}'s Expenses</Card.Body>
      </Accordion.Collapse>
    </Card>
  );  
}