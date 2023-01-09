import {React, useState, useEffect }from 'react'
import { supabase } from 'supabase/supabaseClient'
import { Card } from 'react-bootstrap'
import Day from './Day'

export default function WorkoutLayout() {
    
    const [workouts,SetWorkouts] = useState([])
    const [currentUser, SetCurrentUser] = useState('')

    useEffect(async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          SetCurrentUser(user)

          const {data} = await supabase.from('workouts').select().eq('user_id', user.id)
          if (data) {
              SetWorkouts(data);
          }
        } else {
          SetWorkouts([{title: "no workouts", instruction: "no workouts"}])
        }
        
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
