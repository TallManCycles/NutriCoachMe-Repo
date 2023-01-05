import React from 'react'
import { Button, Card, Row, Form } from 'react-bootstrap';

const FormLabelText = ({controlId, label, controlType, rows, controlName, value, handleFieldChange}) => {
  return (
    <Form.Group className="mb-3" controlId={controlId}>
          <Form.Label>{label}</Form.Label>
          <Form.Control 
          as={controlType} 
          rows={rows}
          name={controlName}
          value={value}
          onChange={handleFieldChange} />
        </Form.Group>
  )
}

export {FormLabelText, value, handleFieldChange}
