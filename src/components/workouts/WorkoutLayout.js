import {React, useState, useEffect }from 'react'
import { supabase } from 'supabase/supabaseClient'
import { Card } from 'react-bootstrap'
import Day from './Day'

export default function WorkoutLayout() {
    
    const [workouts,SetWorkouts] = useState([])
    const [user, setUser] = useState('')

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session, user } }) => {
            if (session.user) {
              setUser(session.user)
            }
          })
        supabase.from('workouts').select().then(({data}) => {
        if (data) {
            SetWorkouts(data);
        }})
    }, [])


  return (
    <>
        {workouts && workouts.map((w) => {
            return <Day key={w.id}
                    title={w.title}
                    instruction={w.instruction}/>}) }
    </>            
  )
}
