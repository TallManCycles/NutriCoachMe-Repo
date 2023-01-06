import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Form, Table, Dropdown } from 'react-bootstrap';
import CardDropdown from 'components/common/CardDropdown';
import { supabase } from 'supabase/supabaseClient';
import { toast } from 'react-toastify';

const CreateWorkout = () => {

    const [formData, setFormData] = useState({
        title: '',
        instruction: '',
        user_id: '',
      });
      const [user, setUser] = useState('')
      const [isloading, SetIsLoading] = useState(false)
    
      //Handlers
      const handleFieldChange = e => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = async e => {
        e.preventDefault();

        SetIsLoading(true);
    
        const { error } = await supabase
        .from('workouts')
        .insert({ 
          title: formData.title,
          instruction: formData.instruction,
          user_id: user.id
         })
    
        if (!error)
        toast.success(`Successfully created workout`, {
          theme: 'colored'
        }); 
        else 
        toast.error(`Something went wrong ${error.message}`)

        SetIsLoading(false)
      };
    
      useEffect(() => {
        supabase.auth.getSession().then(({ data: { session, user } }) => {
          if (session.user) {
            setUser(session.user)
          }
        })
      }, [])
    
    
      return (    
        <Card>
          <Card.Body className="overflow-hidden p-lg-6">
            <Row className="align-items-center justify-content-between">
            <h2>Create A Workout</h2>
            <Form id='createworkout' onSubmit={handleSubmit}>
    
            {/* Title */}
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title </Form.Label>
              <Form.Control 
              type="text" 
              rows={3}
              required={true}
              name="title"
              value={formData.title}
              onChange={handleFieldChange} />
            </Form.Group>

            {/* Instructions */}
            <Form.Group className="mb-3" controlId="instructions">
              <Form.Label>Instructions </Form.Label>
              <Form.Control 
              as="textarea" 
              rows={3}
              required={true}
              name="instruction"
              value={formData.instruction}
              onChange={handleFieldChange} />
            </Form.Group>
    
            <Button variant="primary" size="lg" type="submit" disabled={isloading}>Create</Button>
            </Form>
            </Row>
          </Card.Body>
        </Card>
      );
    };

export default CreateWorkout;


