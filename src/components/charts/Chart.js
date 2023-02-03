import LineChart from "./LineChart";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "supabase/supabaseClient";
import { useParams } from "react-router-dom";
import { Route } from "react-router-dom";

// create a list of weight data to be used in the line chart for the past 7 days

const Chart = () => {
    const parameters = useParams();

    const [values, setValues] = useState([
    { date: '1/1/2021', value: null },
    { date: '1/2/2021', value: null },
    { date: '1/3/2021', value: null },
    { date: '1/4/2021', value: null },
    { date: '1/5/2021', value: null },
    { date: '1/6/2021', value: null },
    { date: '1/7/2021', value: null }
    ])

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    useEffect(() => {
            supabase.from('tracking_data').select().match({user_id: parameters.id})
            .then((response) => {
                if (response.error) {
                    console.log(response.error)
                }
                else {
                    let previous_seven_days = [];

                    let previous_value = null;

                    for (let i = 6; i >= 0 ; i--) {
                        let date = new Date();
                        date.setDate(date.getDate() - i);
                        let dateString = date.toISOString().substring(0, 10);
                        let weight = response.data.find((item) => item.date === dateString);
                        if (weight && weight.weight != null) {
                            previous_seven_days.push({date: dateString, value: weight.weight})
                            previous_value = weight.weight;
                        }
                        else {
                            previous_seven_days.push({date: dateString, value: previous_value})
                        }
                    }
                    setValues(previous_seven_days)
                }
            }) 
    }, []);

    return (
      <div>
        <Card style={{padding: 10}}>
            <LineChart data={values} title={'Previous 7 Day Weight'}/>
            <Button variant="primary" size="med" block onClick={handleBack}>Back</Button>
        </Card>
      </div>
    );
  };
  
//get the props from the parent component
    Chart.defaultProps = {
        client: {}
    }

  export default Chart;
  