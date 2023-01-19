import React, {useEffect, useState} from 'react'
import { Card, Form, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import {Checkbox} from 'antd'



const Habits = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const [checkbox3, setCheckbox3] = useState(false);

    function percentage() {
        const checked = [checkbox1, checkbox2, checkbox3].filter(checkbox => checkbox).length;
        return Math.round((checked / 3) * 100);
    }

    function firstPercentage() {
        return checkbox1 ? 100 : 0;
    }

    function secondPercentage() {
        return checkbox2 ? 100 : 0;
    }

    function thridPercentage() {
        return checkbox3 ? 100 : 0;
    }

    return (
    <Card>
      <Card.Body className="overflow-hidden p-lg-6">
        <h2>Meal Tracker</h2>
        <Row className="align-items-center justify-content-between">
        <Form id='habits'>
            <Form.Group className="mb-3" controlId="dateSelector">
                <Form.Label>Date:</Form.Label>
                    <DatePicker onChange={(date) => setSelectedDate(date)} 
                    id='dateSelector'
                    selected={selectedDate}
                    placeholderText='Select A Date'
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
            <Form.Group className="mb-3" controlId="check-in-success">
                <p>Meal 1: {firstPercentage()} %</p>
                <p>Meal 2: {secondPercentage()} %</p>
                <p>Meal 3: {thridPercentage()} %</p>
                <p>Total: {percentage()} %</p>
            </Form.Group>

            </Form>
            </Row>
        </Card.Body>
    </Card>
    );
  };

export default Habits;
