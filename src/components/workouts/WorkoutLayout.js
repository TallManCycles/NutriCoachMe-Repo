import {React, useState, useEffect }from 'react'
import { supabase } from 'supabase/supabaseClient'
import { Card } from 'react-bootstrap'
import Day from './Day'

export default function WorkoutLayout() {
    
    const [workouts,SetWorkouts] = useState([])

    useEffect(async () => {
        const { data: { session } } = await supabase.auth.getSession()

        if (session.user) {

          const {data} = await supabase.from('workouts').select().eq('user_id', session.user.id)

          if (data.length > 0) {
              SetWorkouts(data);
          } else {
            SetWorkouts([{title: "no workout currently set", instruction: ""}])
          }
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
