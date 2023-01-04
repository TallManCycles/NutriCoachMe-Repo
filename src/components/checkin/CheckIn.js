import React from 'react';
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import editing from 'assets/img/icons/spot-illustrations/21.png';

const CheckIn = () => {

  const handleSubmit = e => {
    e.preventDefault();
    toast.success(`Successfully sent checkin`, {
      theme: 'colored'
    });
  };




  return (

    <Card>
      <Card.Body className="overflow-hidden p-lg-6">
        <Row className="align-items-center justify-content-between">
        <h2>Weekly Check In</h2>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="checkin-email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com"  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="checkin-name">
          <Form.Label>Your Name:</Form.Label>
          <Form.Control type="text"  />
        </Form.Group>
        <Form.Group>
        <Form.Label>How have your cravings been over the past 7 days?</Form.Label>
          <Form.Range 
            min='0'
            max='5'
            step="1"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="check-in-success">
          <Form.Label>How do you FEEL about your accomplished goals over the last 7 days? - Where did you succeed?</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
        </Form>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CheckIn;

