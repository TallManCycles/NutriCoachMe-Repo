import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import getSupabaseClient from 'supabase/getSupabaseClient';
import { supabase } from 'supabase/supabaseClient';
import { toast } from 'react-toastify';

const ProfileSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setIsLoading(true)

    const { error, data } = await supabase
    .from('clients')
    .update({ 
      full_name: formData.name})
    .eq('email', formData.email)

    if (!error) {
      toast.success(`Successfully updated details`, {
        theme: 'colored'
      }); 
    }
    else 
    toast.error(`Something went wrong ${error.message}`)

    setIsLoading(false)
  };

  useEffect(async () => {
    let client = await getSupabaseClient();

    setFormData({name: client.full_name, email: client.email})

  },[])

  return (
    <Card>
      <FalconCardHeader title="Profile Settings" />
      <Card.Body className="bg-light">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={6} controlId="name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                value={formData.name}
                name="name"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={6} controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={formData.email}
                disabled={true}
                name="email"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <div className="text-end">
            <Button variant="primary" type="submit" disabled={isLoading}>
              Update
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ProfileSettings;
