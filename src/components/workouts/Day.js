import React from 'react'
import { Card, Form, Accordion } from 'react-bootstrap'

export default function Day ({title, instruction}) {

    console.log(title, instruction)

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{title}</Accordion.Header>
          <Accordion.Body>
          {instruction}
          </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}
