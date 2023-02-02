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

function Home() {

    const [isLoading, setIsLoading] = useState(false)
    const [client, setClient] = useState({})

    const [nutrition, setNutrition] = useState({
        macros: false,
        protein: 0,  
        carbs: 0,
        fat: 0,
        calories: 0,
        goal_meals: 0 })

    //sets the form data
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
        complete: false,
        meal_1: false,
        meal_2: false,
        meal_3: false,
        meal_4: false
    })

    const [meals,setMeals] = useState([]);

    //clears the form data
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
            complete: false,
            meal_1: false,
            meal_2: false,
            meal_3: false,
            meal_4: false })
        }

    //Showcase the current time of day to client with "good morning" or "good evening
    function getTimeOfDate () {
        const date = new Date();
        const hour = date.getHours();
        return hour < 12 ? "Good Morning" : "Good Evening";
    }

    //set the value of form data to be null if it is an empty string
    function checkAndSetNull(variable) {
        if (variable === "") {
          variable = null;
        }
        return variable;
      }

    //set the value of form data to be empty if it is an null
    function checkAndSetEmpty(variable) {
        if (variable === null) {
            variable = '';
        }
        return variable;
    }  

    //alter the current day by a number of days
    function alterDate (alterBy) {
        if(!formData.complete) {
            //Prompt to save here
        }
        const currentDate = formData.date.add(alterBy,'day');
        setFormData({
            ...formData,
            date: currentDate})
    }

    //save the current day
    function setAsComplete() {
        setFormData({...formData, complete: true})
    }

    //get the nutrition data for the current user
    async function getNutritionData(client) {

    supabase.from('client_nutrition').select().eq('user_id', client.id).limit(1)
        .then(({ data, error }) => {
            if (data) {

                let currentMacros = data[0]

                setNutrition({
                    ...nutrition,
                    macros: currentMacros.macros,
                    calories: currentMacros.calories,
                    protein: currentMacros.protein,
                    carbs: currentMacros.carbs,
                    fat: currentMacros.fats,
                    goal_meals: currentMacros.goal_meals
                })

                //create an array of meals based on the number of meals the user has set as their goal
                let meals = []
                for (let i = 0; i < currentMacros.goal_meals; i++) {
                    meals.push({id: i, value: false})
                }

                //set the value to true if formData.meal_1 is true
                meals.forEach((meal) => {
                    if (formData[`meal_${meal.id + 1}`]) {
                        meal.value = true
                    }
                })

                setMeals(meals);

            } else {
                console.log(error)
            }
        })
    }

    // handles the date change when the user selects a new date
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

      //handles the change of the form data
      const handleFieldChange = e => {

          setFormData({
              ...formData,
              [e.target.name]: e.target.value
            });
      };

      //gets the current day from the database
      async function getCurrentDay() {

        setIsLoading(true)

        const client = getSupabaseClient().then((client) => {
            setClient(client)
        
            supabase.from('tracking_data').select().match({user_id: client.id, date: formData.date}).limit(1)
            .then(({ data, error }) => { 

                if (!error && data.length > 0) {
                    const savedData = data[0]
        
                    setFormData({...formData,
                        protein: checkAndSetEmpty(savedData.protein),
                        carbs: checkAndSetEmpty(savedData.carbs),
                        fats: checkAndSetEmpty(savedData.fats),
                        weight: checkAndSetEmpty(savedData.weight),
                        sleep: checkAndSetEmpty(savedData.sleep),
                        steps: checkAndSetEmpty(savedData.steps),
                        complete: checkAndSetEmpty(savedData.complete),
                        notes: checkAndSetEmpty(savedData.notes),
                        calories: checkAndSetEmpty(savedData.calories),
                        meal_1: savedData.meal_1,
                        meal_2: savedData.meal_2,
                        meal_3: savedData.meal_3,
                        meal_4: savedData.meal_4
                    })  
                } else {
                    clearData()
                }

                getNutritionData(client).then(() => { setIsLoading(false) });

            });
        })
        
      }

      //loads the current day when the page loads
      useEffect(async () => {
        await getCurrentDay()
      }, [formData.date])

      //saves the current day
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
            complete: true,
            meal_1: formData.meal_1,
            meal_2: formData.meal_2,
            meal_3: formData.meal_3,
            meal_4: formData.meal_4
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

      //updates the current day
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
    {isLoading ?
        <Spinner 
            animation="border" 
            role="status" style={{marginLeft: '50%'}}>
            <span className="visually-hidden">Loading...</span>
        </Spinner> 
        : 
    <div>

    <Accordion style={{margin: 5}}>
        <Accordion.Item>
        <Accordion.Header>Current Goals</Accordion.Header>
                <Accordion.Body>
                    {nutrition.macros ? <Macros radius={['100%', '80%']} macros={nutrition} /> : <div>Set Meal Plan Targets HERE</div>}
                        
                </Accordion.Body>
        </Accordion.Item>
    </Accordion>

    {nutrition.macros ?
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
    </div> }
    </div>
  ) 
}

export default Home