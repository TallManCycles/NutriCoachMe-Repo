import React from 'react';
import { Card, Row } from 'react-bootstrap';

export default function Calendar() {
  return (
    <Card>
        <Card.Body className="overflow-hidden p-lg-6" >
            <Row className="align-items-center justify-content-between">
                {/* <div className="calendly-inline-widget" data-url="https://calendly.com/fatforweightloss/monthly-client-book-in-consultation" style="min-width:320px;height:630px;"></div>
                <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script> */}
            <iframe src={"https://calendly.com/fatforweightloss/monthly-client-book-in-consultation"} height={630} width={'100%'} />
            </Row>
        </Card.Body>
    </Card>
  )
}