import React, {useEffect, useState} from 'react'
import { Card, Form, Row, ProgressBar } from 'react-bootstrap'
import { DatePicker, Checkbox } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/de';

const Habits = ({noCard}) => {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const [checkbox3, setCheckbox3] = useState(false);

    function percentage() {
        const checked = [checkbox1, checkbox2, checkbox3].filter(checkbox => checkbox).length;
        return Math.round((checked / 3) * 100);
    }

    function isDayComplete () {
        if (percentage() > 99) {
            return 'success';
        } else {
            return 'info';
        }
    }

    return (
    <Card>
      <Card.Body className="overflow-hidden p-lg-6">
        <h2>Habits</h2>
        <Row className="align-items-center justify-content-between">
        <Form id='habits'>
            <Form.Group className="mb-3" controlId="dateSelector">
                <Form.Label>Date:</Form.Label>
                    <DatePicker onChange={(date) => setSelectedDate(date)} 
                    id='dateSelector'
                    value={selectedDate}
                    />
            </Form.Group>

            <Form.Group className="mb-3" controlId="check-1">
            <Form.Check 
                type='checkbox'
                id='defaultCheckbox'
                label='Did you follow meal 1?'
                onChange={(e) => setCheckbox1(e.target.checked)}
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="check-2">
            <Form.Check 
                type='checkbox'
                id='defaultCheckbox'
                label='Did you follow meal 2?'
                onChange={(e) => setCheckbox2(e.target.checked)}
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="check-3">
            <Form.Check 
                type='checkbox'
                id='defaultCheckbox'
                label='Did you follow meal 3?'
                onChange={(e) => setCheckbox3(e.target.checked)}
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="progress">
            <ProgressBar now={percentage()} label={`${percentage()}%`} style={{ height:'20px' }} variant={isDayComplete()} />
            </Form.Group>

            </Form>
            </Row>
      </Card.Body>
     </Card>
    );
  };

export default Habits;
