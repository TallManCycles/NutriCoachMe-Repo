import React from 'react';
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import editing from 'assets/img/icons/spot-illustrations/21.png';
import Iframe from './Iframe';

const Main = () => {
  return (
    <Card>
      <Card.Body className="overflow-hidden p-lg-6">
      <Row className="align-items-center justify-content-between">
        <Button
        variant="falcon-primary"
        as={Link}
        to="https://form.jotform.com/fatforweightloss/weekly-check-in-form"
        >
        Getting started
        </Button>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Main;


