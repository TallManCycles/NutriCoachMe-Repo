import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Form, Table, Dropdown } from 'react-bootstrap';
import CardDropdown from 'components/common/CardDropdown';
import { supabase } from 'supabase/supabaseClient';
import { toast } from 'react-toastify';

const CreateWorkout = () => {

    const [formData, setFormData] = useState({
        title: '',
        instruction: '',
        id: null,
      });

      const [clients, setClients] = useState([])
      const [workout, setWorkouts] = useState([])
      const [isloading, SetIsLoading] = useState(false)

      useEffect(() => {
        supabase.from("clients").select().then(({data}) => {
          setClients(data)
          console.log(data)
        })
      }, [])
    
      //Handlers
      const handleFieldChange = e => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });

        console.log(e.target.name, e.target.value)
      };

      const handleGetWorkout = async e => {

        SetIsLoading(true)

        const {error, data} = await supabase.from('workouts').select().eq('user_id', formData.id).maybeSingle()

        if (data) {
          setFormData(data)
          toast.success("Current workouts loaded", {
            theme: 'colored'
          });
        } else {
          toast.error("no workouts found for this user", {
            theme: 'colored'
          }); 
        }

        SetIsLoading(false)
      }

      async function createWorkout(isDelete) {
        
      }
    
      const handleSubmit = async e => {

        e.preventDefault();

        SetIsLoading(true);

        const { error } = await supabase
        .from('workouts')
        .insert({ 
          title: formData.title,
          instruction: formData.instruction,
          user_id: formData.id
         })
         if (!error)
          toast.success(`Successfully created workout`, {
            theme: 'colored'
          }); 
          else 
          toast.error(`Something went wrong ${error.message}`, {
            theme: 'colored'
          })

        SetIsLoading(false)
      };
    
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

            <Form.Group className="mb-3" controlId="status">
            <Form.Label>Assign To</Form.Label>
            <Form.Select
            aria-label="client"
            name="id"
            onChange={handleFieldChange}>
              <option>Select A Client</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.email}
                </option>
              ))}
            </Form.Select>
            </Form.Group>
    
            <Form.Group>
              <Button variant="primary" size="lg" type="submit" disabled={isloading}>Create</Button>
              {/* <Button variant="error" onClick={deleteWorkout} disabled={isloading}>Delete</Button> */}
            </Form.Group>
            <Form.Group>
              <Button variant="secondary" onClick={handleGetWorkout} disabled={isloading}>Get Current Workout</Button>
            </Form.Group>
            </Form>
            </Row>
          </Card.Body>
        </Card>
      );
    };

export default CreateWorkout;


