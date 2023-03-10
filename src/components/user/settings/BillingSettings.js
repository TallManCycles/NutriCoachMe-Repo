import FalconCardHeader from 'components/common/FalconCardHeader';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BillingSettings = () => {
  return (
    <Card className="mb-3">
      <FalconCardHeader title="Billing Setting" />
      <Card.Body className="bg-light border-top">
        <h5>Payment</h5>
        <p className="fs-0">Active Subscription</p>
        <Button href='https://form.jotform.com/fatforweightloss/coaching-change-request' variant="falcon-default" size="sm">
          Cancel Subscription
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BillingSettings;
