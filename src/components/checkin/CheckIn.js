import {React, useState }from 'react';
import { Button, Card, Row, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { supabase } from 'supabase/supabaseClient';

const CheckIn = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cravings: '',
    acheivements: ''
  });

  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { error } = await supabase
    .from('checkindata')
    .insert({ 
      name: formData.name, 
      email: formData.email,
      cravings: formData.cravings,
      feeling: formData.acheivements })

    if (!error) {
    toast.success(`Successfully sent checkin`, {
      theme: 'colored'
    }); 

    //Clear form
    document.getElementById("checkin")
    .reset(); }
    else 
    toast.error(`Something went wrong ${error}`)
  };

  return (

    <Card>
      <Card.Body className="overflow-hidden p-lg-6">
        <Row className="align-items-center justify-content-between">
        <h2>Weekly Check In</h2>
        <Form id='checkin' onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="checkin-email">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
          type="email" 
          name="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleFieldChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="checkin-name">
          <Form.Label>Your Name:</Form.Label>
          <Form.Control 
          type="text"
          name="name"
          value={formData.name}
          onChange={handleFieldChange}  />
        </Form.Group>
        <Form.Group>
        <Form.Label>How have your cravings been over the past 7 days?</Form.Label>
          <Form.Range 
            min='0'
            max='5'
            step="1"
            name="cravings"
            value={formData.cravings}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="check-in-success">
          <Form.Label>How do you FEEL about your accomplished goals over the last 7 days? - Where did you succeed?</Form.Label>
          <Form.Control 
          as="textarea" 
          rows={3}
          name="acheivements"
          value={formData.acheivements}
          onChange={handleFieldChange} />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
        </Form>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CheckIn;

