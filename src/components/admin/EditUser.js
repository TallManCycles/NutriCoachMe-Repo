import {React, useState, useEffect} from 'react'
import { Card, Row, Form, Button } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { supabase } from 'supabase/supabaseClient';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';

export default function EditUser() {
  
  const [formData, setFormData] = useState([])
  const [user, SetUser] = useState()
  const [isLoading, SetIsLoading] = useState(false)
  const parameters = useParams()
  const navigate = useNavigate()

  useEffect(async () => {
    const {error, data} = await supabase.from('clients').select().eq('id', parameters.id).maybeSingle()
    if (data) {
      setFormData(data)
    }
  }, [])

  
  const handleBackClick = () => {
    navigate(-1);
  }

  //Handlers
  const handleFieldChange = e => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async e => {
    e.preventDefault();

    console.log(formData)

    const { error, data } = await supabase
    .from('clients')
    .update({ 
      full_name: formData.full_name, 
      email: formData.email, 
      status: formData.status,
      start_date: formData.start_date })
    .eq('id', formData.id)

    console.log(data)

    if (!error) {
      toast.success(`Successfully updated details`, {
        theme: 'colored'
      }); 
      navigate(-1);
    }
    else 
    toast.error(`Something went wrong ${error.message}`)
  };

  return (
    <Card>
      <Card.Body className="overflow-hidden p-lg-6">
        <Row className="align-items-center justify-content-between">
        <h2>Edit User</h2>
        <Form id='edituser' onSubmit={handleSubmit}>

        {/* Name */}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control 
          type="text" 
          required={true}
          rows={3}
          name="full_name"
          value={formData.full_name}
          onChange={handleFieldChange} />
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control 
          type="text" 
          required={true}
          rows={3}
          name="email"
          value={formData.email}
          onChange={handleFieldChange} 
          />
        </Form.Group>

        {/* Start Date */}
        <Form.Group className="mb-3" controlId="start_date">
          <Form.Label>Start Date</Form.Label>
          <DatePicker
            selected={Date.parse(formData.start_date)}
            onChange={(date) => setFormData({
              ...formData,
              'start_date': date
            })}
            formatWeekDay={day => day.slice(0, 3)}
            className='form-control'
            placeholderText="Select Date"
            name='start_date'
          />
        </Form.Group>

        {/* Status */}
        <Form.Group className="mb-3" controlId="status">
        <Form.Label>Status</Form.Label>
        <Form.Select aria-label="Status"
          name="status"
          value={formData.status}
          onChange={handleFieldChange}
          >
          <option>Open this select menu</option>
          <option 
            name="status"
            value="onboard">Onboard</option>
          <option name="status" value="active">Active</option>
          <option name="status" value="last month">Last Month</option>
          <option name="status" value="paused">Paused</option>
          <option name="status" value="cancelled">Cancelled</option>
        </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="button">
        <Button variant="primary" size="lg" type="submit" disabled={isLoading}>Update</Button>
        </Form.Group>

        <Form.Group className="mb-3" controlId="cancel">
        <Button variant="secondary" onClick={handleBackClick}>Cancel</Button>
        </Form.Group>

        </Form>
        </Row>
      </Card.Body>
    </Card>
    
  )
}
