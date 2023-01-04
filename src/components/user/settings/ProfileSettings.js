import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import { supabase } from 'supabase/supabaseClient';

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    name: 'Anthony',
    email: 'anthony@gmail.com'
  });

  // const [name,setName] = useState("")
  // const [email, setEmail] = useState("")

  // const getEmailByUser = async () => {
  //   const {data, error} = await supabase.auth.getSession();

  //   if (!error) {
  //   setEmail(data.session.user.email)
  //   console.log(data.session.user.email) 
  //   }
  //   else 
  //   console.log(error.message)

  // }

  // const getNameByEmail = async () => {
  //     const {data, error} = await supabase
  //     .from('clients')
  //     .select('Name')
  //     .eq('Email', email)

  //     if (!error && data){
  //       setName(data)
  //       console.log(data) }
  //     else
  //     console.log(error)

  // }

  // useEffect(async () => {

  //   console.log("use effect starting")
  //   await getEmailByUser()
  //   console.log("got email address")
  //   await getNameByEmail()
  //   console.log("got name")


  //   console.log("setting the form data")
  //   setFormData({name: name, email: email})
  //   console.log("finished")

  // },[])

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <Card>
      <FalconCardHeader title="Profile Settings" />
      <Card.Body className="bg-light">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={6} controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                value={formData.name}
                name="firstName"
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
                name="email"
                onChange={handleChange}
              />
            </Form.Group>

            {/* <Form.Group as={Col} lg={6} controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone"
                value={formData.phone}
                name="phone"
                onChange={handleChange}
              />
            </Form.Group> */}
          </Row>

          {/* <Form.Group className="mb-3" controlId="heading">
            <Form.Label>Heading</Form.Label>
            <Form.Control
              type="text"
              placeholder="Heading"
              value={formData.heading}
              name="heading"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="intro">
            <Form.Label>Intro</Form.Label>
            <Form.Control
              as="textarea"
              rows={13}
              placeholder="Intro"
              value={formData.intro}
              name="intro"
              onChange={handleChange}
            />
          </Form.Group> */}
          <div className="text-end">
            <Button variant="primary" type="submit">
              Update
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ProfileSettings;
