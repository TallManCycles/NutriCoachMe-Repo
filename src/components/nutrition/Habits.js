import React, {useEffect, useState} from 'react'
import { Card, Form, Row, ProgressBar, FormLabel } from 'react-bootstrap'
import { supabase } from 'supabase/supabaseClient';

const Habits = ({mealsByDay}) => {

    const [meals, setMeals] = useState(mealsByDay);

    const setMealValue = (e) => {
        const updatedMeals = meals.map(meal => {
            if (meal.id === parseInt(e.target.id)) {
                return {...meal, value: e.target.checked};
            }
            return meal;
        });
        setMeals(updatedMeals);
    }

    function percentage() {
        if (meals && meals.length > 0) {
            const checked = meals.filter(meal => meal.value).length;
            return Math.round((checked / meals.length) * 100);
        } else {
            return 0
        }
    }

    function isDayComplete () {
        if (percentage() > 99) {
            return 'success';
        } else {
            return 'info';
        }
    }

    return (
        <Form id='habits'>            
            {meals && meals.length > 0 ? meals.map((meal) => {
                return (
                <div key={meal.id}>
                <Form.Group className="mb-3" controlId={meal.id}>
                <Form.Check 
                type='checkbox'
                id={meal.id}
                checked={meal.value}
                label={`Did you follow meal ${meal.id}?`}
                onChange={(e) => setMealValue(e)}
                />
                </Form.Group>
                </div> )
            }) : <Form.Label>No Meals To Log</Form.Label>}
            
            <Form.Group className="mb-3" controlId="progress">
            {meals ? 
            <ProgressBar now={percentage()} label={`${percentage()}%`} style={{ height:'20px' }} variant={isDayComplete()} /> : '' }
            </Form.Group>

            </Form>
    );
  };

export default Habits;
