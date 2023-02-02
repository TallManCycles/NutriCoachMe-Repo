import {React, useState, useEffect} from 'react'
import { Card, Row, Form, Button, Accordion } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { supabase } from 'supabase/supabaseClient';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';


export default function EditUser() {
  
  const [formData, setFormData] = useState([])
  const [nutritrionData, setNutritionData] = useState({
    macros: false,
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    goal_meals: 0,
    date_start: '',
    date_end: null
   })
  
  const [isLoading, SetIsLoading] = useState(false)
  const parameters = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    supabase.from('clients').select().eq('id', parameters.id).maybeSingle()
    .then((response) => {
        if (response.error) {
          console.log(response.error)
        }
        else {
          setFormData(response.data)
          getNutritionData()
        }
      })
  }, [])

  async function getNutritionData () {
    const {data, error} = await supabase.from('client_nutrition').select().eq('user_id', parameters.id)

    if (data.length > 0) {
      setNutritionData(data[0])
    } 
  }

  
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

  const handleMacroToggle = e => {
    setNutritionData({
      ...nutritrionData,
      [e.target.name]: e.target.checked ? true : false
    });
  }

  const handleNutritionChange = e => {
    setNutritionData({
      ...nutritrionData,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmit = async e => {
    e.preventDefault();

    const { error, data } = await supabase
    .from('clients')
    .update({ 
      full_name: formData.full_name, 
      email: formData.email, 
      status: formData.status,
      start_date: formData.start_date,
      end_date: formData.end_date })
    .eq('id', formData.id)

    if (error) {
      console.log(error.message)
    }

    await updateOrInsertNutrition();

    if (!error) {
      toast.success(`Successfully updated details`, {
        theme: 'colored'
      }); 
      navigate(-1);
    }
    else {
      console.log(error)
      toast.error(`Something went wrong`) 
    }
  };

  async function updateOrInsertNutrition() {

    // Check if the record already exists in the database
    const {data} = await supabase.from('client_nutrition').select().eq('user_id', parameters.id)

    const calories = (nutritrionData.protein * 4) + (nutritrionData.carbs * 4) + (nutritrionData.fats * 9)
  
    // If the record already exists, update it
    if (data.length > 0) {
      await supabase.from('client_nutrition').update({
        macros: nutritrionData.macros,
        calories: calories, 
        protein: nutritrionData.protein,
        carbs: nutritrionData.carbs,
        fats: nutritrionData.fats,
        start_date: nutritrionData.start_date,
        end_date: nutritrionData.end_date,
        goal_meals: nutritrionData.goal_meals})
      .eq('user_id', parameters.id)
    }
    // Otherwise, insert a new record
    else {
      const {error} = await supabase
      .from('client_nutrition')
      .insert({
        macros: nutritrionData.macros,
        calories: calories, 
        protein: nutritrionData.protein,
        carbs: nutritrionData.carbs,
        fats: nutritrionData.fats,
        start_date: nutritrionData.start_date,
        end_date: nutritrionData.end_date,
        goal_meals: nutritrionData.goal_meals,
        user_id: parameters.id}) 
        
        if (error) {
          console.log(error.message)
        }
    }
  }

  return (
    <div style={{margin: 5}}>
    <Form id='edituser' onSubmit={handleSubmit}>
    
    <Accordion defaultActiveKey="0" flush>
      <Accordion.Item eventKey="0">
      <Accordion.Header>Edit User</Accordion.Header>
      <Accordion.Body>
        

        {/* Name */}
          <Form.Label>Name</Form.Label>
          <Form.Control 
          type="text" 
          required={true}
          rows={3}
          name="full_name"
          value={formData.full_name}
          onChange={handleFieldChange} />

        {/* Email */}
          <Form.Label>Email</Form.Label>
          <Form.Control 
          type="text" 
          required={true}
          rows={3}
          name="email"
          value={formData.email}
          onChange={handleFieldChange} 
          />

        {/* Start Date */}
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

        {/* End Date */}
          <Form.Label>End Date</Form.Label>
          <DatePicker
            selected={Date.parse(formData.end_date)}
            onChange={(date) => setFormData({
              ...formData,
              'end_date': date
            })}
            formatWeekDay={day => day.slice(0, 3)}
            className='form-control'
            placeholderText="No end date set"
            name='end_date'
          />

        {/* Status */}
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
        </Accordion.Body>
        </Accordion.Item>
    </Accordion>
    <Accordion>
      <Accordion.Item>
        <Accordion.Header>Nutirtion Details</Accordion.Header>
        <Accordion.Body>  

        <Form.Check 
          type='switch'
          name='macros'
          // defaultChecked={false}
          checked={nutritrionData ? nutritrionData.macros : false}
          label='Tracking macros'
          onChange={handleMacroToggle}
          />

          {nutritrionData ? 
          <div>
          {nutritrionData.macros ?
          <div>
          <Form.Label>Calories</Form.Label>
          <Form.Control 
          type="number"
          rows={1}
          name='calories'
          readOnly={true}
          value={nutritrionData.calories}
          onChange={handleNutritionChange}
          />

          <Form.Label>Protein</Form.Label>
          <Form.Control 
          type="number"
          rows={1}
          name='protein'
          value={nutritrionData.protein}
          onChange={handleNutritionChange} />

          <Form.Label>Carbs</Form.Label>
          <Form.Control 
          type="number"
          rows={1}
          name='carbs'
          value={nutritrionData.carbs}
          onChange={handleNutritionChange}
          />

        <Form.Label>Fats</Form.Label>
          <Form.Control 
          type="number"
          rows={1}
          name='fats'
          value={nutritrionData.fats}
          onChange={handleNutritionChange}
          />
          </div>
        : 
        <div>
          <Form.Label>Goal Meals</Form.Label>
          <Form.Control 
          type="number"
          rows={1}
          name='goal_meals'
          value={nutritrionData.goal_meals}
          onChange={handleNutritionChange}
          />
        </div>
        } 

          {/* Start Date */}
          <Form.Label>Start Date</Form.Label>
          <DatePicker
            selected={Date.parse(nutritrionData.start_date)}
            onChange={(date) => setNutritionData({
              ...nutritrionData,
              'start_date': date
            })}
            formatWeekDay={day => day.slice(0, 3)}
            className='form-control'
            placeholderText="Select Date"
            name='start_date'
          />

        {/* End Date */}
          <Form.Label>End Date</Form.Label>
          <DatePicker
            selected={Date.parse(nutritrionData.end_date)}
            onChange={(date) => setNutritionData({
              ...nutritrionData,
              'end_date': date
            })}
            formatWeekDay={day => day.slice(0, 3)}
            className='form-control'
            placeholderText="No end date set"
            name='end_date'
          /> 
          </div>
        : '' }

          
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    <div className="d-grid gap-2"> 
        <Button variant="primary" size="lg" type="submit" disabled={isLoading}>Update</Button>
        <Button variant="secondary" onClick={handleBackClick}>Cancel</Button>
    </div>
    </Form>

    </div>
  )
}
