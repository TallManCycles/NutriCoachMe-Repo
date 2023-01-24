import { DatePicker } from 'antd';
import Flex from 'components/common/Flex';
import React, {useEffect, useState} from 'react'
import { Card, Button, Form, Accordion, Spinner } from 'react-bootstrap'
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import { supabase } from 'supabase/supabaseClient';
import getSupabaseClient from 'supabase/getSupabaseClient';
import {toast} from 'react-toastify'
import Habits from 'components/nutrition/Habits';
import Macros from 'components/nutrition/Macros';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';

function Home() {

    const [isLoading, setIsLoading] = useState(false)
    const [client, setClient] = useState({})

    const [formData, setFormData] = useState({
        date: dayjs(),
        calories: '',
        protein: '',
        carbs: '',
        fats: '',
        weight: '',
        notes: '',
        sleep: '',
        steps: '',
        complete: false
    })

    const meals = [
        {id: 1, value: false},
        {id: 2, value: false},
        {id: 3, value: false},
        {id: 4, value: false}
    ]

    function clearData () {
        setFormData({...formData,
            calories: '',
            protein: '',
            carbs: '',
            fats: '',
            weight: '',
            notes: '',
            sleep: '',
            steps: '',
            complete: false })
    }

    function getTimeOfDate () {
        const date = new Date();
        const hour = date.getHours();
        return hour < 12 ? "Good Morning" : "Good Evening";
    }

    function checkAndSetNull(variable) {
        if (variable === "") {
          variable = null;
        }
        return variable;
      }

    function alterDate (alterBy) {
        if(!formData.complete) {
            //Prompt to save here
        }
        const currentDate = formData.date.add(alterBy,'day');
        setFormData({
            ...formData,
            date: currentDate})
    }

    function setAsComplete() {
        setFormData({...formData, complete: true})
    }

    const handleDateChange = (date) => {
        if(!formData.complete) {
            //prompt to save here
        }
        if (date) {
            setFormData({
                ...formData,
                date: date})
        } 
      };

      const handleFieldChange = e => {

          setFormData({
              ...formData,
              [e.target.name]: e.target.value
            });
      };

      async function getCurrentDay() {

        setIsLoading(true)

        const client = await getSupabaseClient();

        setClient(client);

        const {data, error} = await supabase.from('tracking_data').select().match({user_id: client.id, date: formData.date}).limit(1)

        if (!error && data.length > 0) {
            const savedData = data[0]

            setFormData({...formData,
                protein: savedData.protein,
                carbs: savedData.carbs,
                fats: savedData.fats,
                weight: savedData.weight,
                sleep: savedData.sleep,
                steps: savedData.steps,
                complete: savedData.complete,
                notes: savedData.notes,
                calories: savedData.calories
            })
        } else {
            clearData()
        }

        setIsLoading(false)
      }

      useEffect(async () => {
        getCurrentDay();

      }, [formData.date])

      const saveDay = async () => {
        setIsLoading(true)

        const client = await getSupabaseClient();

        setAsComplete()
        
        const {error} = await supabase.from('tracking_data').insert({ 
            user_id: client.id, 
            date: formData.date,
            weight: checkAndSetNull(formData.weight),
            calories: checkAndSetNull(((formData.protein * 4) + (formData.carbs * 4) + (formData.fats * 9))),
            protein: checkAndSetNull(formData.protein),
            carbs: checkAndSetNull(formData.carbs),
            fats: checkAndSetNull(formData.fats),
            sleep: checkAndSetNull(formData.sleep),
            steps: checkAndSetNull(formData.steps),
            notes: formData.notes,
            complete: true
         })

         if (!error) {
            toast.success(`Successfully updated details`, {
                theme: 'colored'
            }); 
        } else {
            toast.error(`Please try to complete the day again, ${error.message}`, {
                theme: 'colored'
            })
        }

        setIsLoading(false)
      }

      const updateDay = async () => {

        setIsLoading(true)
        
        const {error} = await supabase.from('tracking_data').update({ 
            date: formData.date,
            weight: checkAndSetNull(formData.weight),
            calories: checkAndSetNull(((formData.protein * 4) + (formData.carbs * 4) + (formData.fats * 9))),
            protein: checkAndSetNull(formData.protein),
            carbs: checkAndSetNull(formData.carbs),
            fats: checkAndSetNull(formData.fats),
            sleep: checkAndSetNull(formData.sleep),
            steps: checkAndSetNull(formData.steps),
            notes: formData.notes,
            complete: true
         }).eq('date', formData.date)

         if (!error) {
            toast.success(`Successfully updated details`, {
                theme: 'colored'
            }); 
        } else {
            toast.error(`Please try to update later, ${error.message}`, {
                theme: 'colored'
            })
        }

        setIsLoading(false)

      }

  return (
    <div> 
    <Card style={{margin: 5}}>
        <Card.Body>
            <h2 style={{textAlign: 'center'}}>{getTimeOfDate()} Aaron </h2>
            <h5 style={{textAlign: 'center'}}>Select Date:</h5>
            <Flex justifyContent='center'>
                <Button onClick={() => {alterDate(-1)}} disabled={isLoading}>{`<`}</Button>
                <DatePicker
                name='date'
                value={formData.date}
                onChange={handleDateChange}
                />
                <Button onClick={() => {alterDate(1)}} disabled={isLoading}>{`>`}</Button>
            </Flex>

        </Card.Body>
    </Card>

    <Accordion style={{margin: 5}}>
        <Accordion.Item>
        <Accordion.Header>Current Goals</Accordion.Header>
                <Accordion.Body>
                    {isLoading ?
                        <Spinner 
                            animation="border" 
                            role="status" style={{marginLeft: '50%'}}>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner> : <div>
                        {client.macros ? <Macros radius={['100%', '80%']} /> : <div>Set Meal Plan Targets HERE</div>}</div>}
                        
                </Accordion.Body>
        </Accordion.Item>
    </Accordion>

    {client.macros ?
    <Accordion defaultActiveKey="0" flush style={{margin: 5}} >
        <Accordion.Item eventKey="0">
            <Accordion.Header>Nutrition Log</Accordion.Header>
                <Accordion.Body>
        <Form>
            <Form.Label>Protein(g):</Form.Label>
            <Form.Control 
                type="number"
                rows={1}
                name='protein'
                value={formData.protein}
                disabled={isLoading}
                onChange={handleFieldChange} />
            <Form.Label>Carbs(g):</Form.Label>
            <Form.Control 
                type="number"
                rows={1}
                name="carbs"
                value={formData.carbs}
                disabled={isLoading}
                onChange={handleFieldChange} />
            <Form.Label>Fats(g):</Form.Label>
            <Form.Control 
                type="number"
                rows={1}
                name="fats"
                value={formData.fats}
                disabled={isLoading}
                onChange={handleFieldChange} />
        </Form>
        </Accordion.Body>
        </Accordion.Item>
    </Accordion>
    :   
    <Accordion defaultActiveKey="0" flush style={{margin: 5}} >
        <Accordion.Item eventKey="0">
        <Accordion.Header>Meals Log</Accordion.Header>
            <Accordion.Body>
                <Habits mealsByDay={meals} />
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>}

    <Accordion style={{margin: 5}}>
        <Accordion.Item eventKey="1">
            <Accordion.Header>Other Metrics</Accordion.Header>
                <Accordion.Body>
            <Form>
            <Form.Label>Sleep(hrs):</Form.Label>
            <Form.Control 
                type="number"
                rows={1}
                name="sleep"
                value={formData.sleep}
                onChange={handleFieldChange} />
            <Form.Label>Steps:</Form.Label>
            <Form.Control 
                type="number"
                rows={1}
                name="steps"
                value={formData.steps}
                onChange={handleFieldChange} />
            <Form.Label>Weight:</Form.Label>
            <Form.Control 
                type="number"
                rows={1}
                name="weight"
                value={formData.weight}
                onChange={handleFieldChange} />
        </Form>
        </Accordion.Body>
        </Accordion.Item>
    </Accordion>

    <Accordion style={{margin: 5}}>
        <Accordion.Item eventKey="2">
            <Accordion.Header>Notes</Accordion.Header>
                <Accordion.Body>
                    <Form>
                    <Form.Control 
                        as="textarea" 
                        rows={3}
                        name="notes"
                        placeholder='Any details you would like to add?'
                        value={formData.notes}
                        onChange={handleFieldChange} />
                    </Form>
                </Accordion.Body>
        </Accordion.Item>
    </Accordion>
        <div className="d-grid gap-2">
            {formData.complete ?
                <Button variant="primary" style={{margin: 10}} onClick={updateDay} disabled={isLoading}>
                    Save
                </Button> 
            :
                <Button variant="primary" style={{margin: 10}} onClick={saveDay} disabled={isLoading || formData.complete}>
                    Save
                </Button> 
            } 
        </div>
    </div>
  ) 
}

export default Home