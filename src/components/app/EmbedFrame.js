import React from 'react';
import { Card, Row } from 'react-bootstrap';

export default function EmbedFrame({source}) {
  return (
    <Card>
        <Card.Body className="overflow-hidden p-lg-6" >
            <Row className="align-items-center justify-content-between">
            <iframe src={source} height={630} width={'100%'} />
            </Row>
        </Card.Body>
    </Card>
  )
}