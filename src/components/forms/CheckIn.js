import {React, useState, useEffect, useRef }from 'react';
import { Button, Card, Row, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { supabase } from 'supabase/supabaseClient';
import { useDropzone } from 'react-dropzone';
import Flex from 'components/common/Flex';
import cloudUpload from 'assets/img/icons/cloud-upload.svg';

const CheckIn = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    acheivements: '',
    obstacles: '',
    activity: '',
    energy: 4,
    stress: 1,
    hunger: 1,
    sleep: 4,
    cravings: 1,
    digestion: 4,
    mentalhealth: 4,
    waist: '',
    hips: '',
    weight: '',
    events: '',
  });

  //File uploader
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [user, setUser] = useState('')
  const textboxRef = useRef(null);

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  //Handlers
  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTextboxBlur = () => {
    textboxRef.current.blur();
    console.log("handled")
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { error } = await supabase
    .from('checkindata')
    .insert({ 
      name: '', 
      email: user.email,
      user_id: user.id,
      acheivements: formData.acheivements,
      obstacles: formData.obstacles,
      activity: formData.activity,
      energy: formData.energy,
      stress: formData.stress,
      hunger: formData.hunger,
      sleep: formData.sleep,
      cravings: formData.cravings,
      digestion: formData.digestion,
      mentalhealth: formData.mentalhealth,
      waist: formData.waist,
      hips: formData.hips,
      weight: formData.weight,
      events: formData.events
     })

    if (!error)
    toast.success(`Successfully sent checkin`, {
      theme: 'colored'
    }); 
    else 
    toast.error(`Something went wrong ${error.message}`)
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session, user } }) => {
      if (session.user) {
        setUser(session.user)
        console.log(session.user)
      }
    })
  }, [])


  return (

    <Card>
      <Card.Body className="overflow-hidden p-lg-6">
        <Row className="align-items-center justify-content-between">
        <h2>Weekly Check In</h2>
        <Form id='checkin' onSubmit={handleSubmit}>

        {/* Accoumplishments */}
        <Form.Group className="mb-3" controlId="check-in-success">
          <Form.Label>How do you FEEL about your accomplished goals over the last 7 days? - Where did you succeed?</Form.Label>
          <Form.Control 
          ref={textboxRef}
          onBlur={handleTextboxBlur}
          as="textarea" 
          required={true}
          rows={3}
          name="acheivements"
          value={formData.acheivements}
          onChange={handleFieldChange} />
        </Form.Group>

        {/* Obstacles */}
        <Form.Group className="mb-3" controlId="obstacles">
          <Form.Label>What do you BELIEVE to be the obstacles you faced? What took priority? </Form.Label>
          <Form.Control 
          ref={textboxRef}
          onBlur={handleTextboxBlur}
          as="textarea" 
          required={true}
          rows={3}
          name="obstacles"
          value={formData.obstacles}
          onChange={handleFieldChange} />
        </Form.Group>

        {/* Activity */}
        <Form.Group className="mb-3" controlId="activity">
          <Form.Label>How active have you been this week? (please add #workouts, average step count or minutes walked) </Form.Label>
          <Form.Control
          ref={textboxRef}
          onBlur={handleTextboxBlur} 
          type="text" 
          rows={3}
          required={true}
          name="activity"
          value={formData.activity}
          onChange={handleFieldChange} />
        </Form.Group>

        {/* Energy */}
        <Form.Group className="mb-3" controlId="energy">
        <Form.Label>What is your ENERGY like on a daily basis? (low to high)</Form.Label>
          <Form.Range 
            min='0'
            max='5'
            step="1"
            name="energy"
            value={formData.energy}
            onChange={handleFieldChange}
          />
        </Form.Group>

         {/* Stress */}
         <Form.Group className="mb-3" controlId="stress">
        <Form.Label>How much STRESS are you currently dealing with (low to high)</Form.Label>
          <Form.Range 
            min='0'
            max='5'
            step="1"
            name="stress"
            value={formData.stress}
            onChange={handleFieldChange}
          />
        </Form.Group>

        {/* Hunger */}
        <Form.Group className="mb-3" controlId="hunger">
        <Form.Label>How would you rate your HUNGER on a daily basis?</Form.Label>
          <Form.Range 
            min='0'
            max='5'
            step="1"
            name="hunger"
            value={formData.hunger}
            onChange={handleFieldChange}
          />
        </Form.Group>

        {/* Sleep */}
        <Form.Group className="mb-3" controlId="sleep">
        <Form.Label>How would you rate your SLEEP QUALITY? (low to high)</Form.Label>
          <Form.Range 
            min='0'
            max='5'
            step="1"
            name="sleep"
            value={formData.sleep}
            onChange={handleFieldChange}
          />
        </Form.Group>

        {/* Cravings */}
        <Form.Group className="mb-3" controlId="cravings">
        <Form.Label>How would you rate your CRAVINGS? (low to high)</Form.Label>
          <Form.Range 
            min='0'
            max='5'
            step="1"
            name="cravings"
            value={formData.cravings}
            onChange={handleFieldChange}
          />
        </Form.Group>

        {/* Digestion */}
        <Form.Group className="mb-3" controlId="digestion">
        <Form.Label>How would you rate your DIGESTION? (low to high)</Form.Label>
          <Form.Range 
            min='0'
            max='5'
            step="1"
            name="digestion"
            value={formData.digestion}
            onChange={handleFieldChange}
          />
        </Form.Group>

        {/* Mental Health */}
        <Form.Group className="mb-3" controlId="mentalhealth">
        <Form.Label>How would you rate your mental health? (low to high)</Form.Label>
          <Form.Range 
            min='0'
            max='5'
            step="1"
            name="mentalhealth"
            value={formData.mentalhealth}
            onChange={handleFieldChange}
          />
        </Form.Group>

        {/* Waist */}
        <Form.Group className="mb-3" controlId="waist">
          <Form.Label>Please add your WAIST measurement (cm or inches)</Form.Label>
          <Form.Control 
          ref={textboxRef}
          onBlur={handleTextboxBlur}
          type="number"
          rows={1}
          name="waist"
          required={true}
          value={formData.waist}
          onChange={handleFieldChange} />
        </Form.Group>

        {/* Hips */}
        <Form.Group className="mb-3" controlId="hips">
          <Form.Label>Please add your HIPS measurement (cm or inches)</Form.Label>
          <Form.Control 
          ref={textboxRef}
          onBlur={handleTextboxBlur}
          type="number" 
          rows={1}
          name="hips"
          required={true}
          value={formData.hips}
          onChange={handleFieldChange} />
        </Form.Group>

        {/* Weight */}
        <Form.Group className="mb-3" controlId="weight">
          <Form.Label>Enter today's weight (if not weighing, type 0)</Form.Label>
          <Form.Control 
          ref={textboxRef}
          onBlur={handleTextboxBlur}
          type="number" 
          rows={1}
          name="weight"
          required={true}
          value={formData.weight}
          onChange={handleFieldChange} />
        </Form.Group>

        {/* Events */}
        <Form.Group className="mb-3" controlId="events">
          <Form.Label>Are there any known events/holidays/challenges coming up? - (Please detail upcoming dates and durations if you haven't already notified me) </Form.Label>
          <Form.Control 
          ref={textboxRef}
          onBlur={handleTextboxBlur}
          as="textarea" 
          rows={3}
          name="events"
          value={formData.events}
          onChange={handleFieldChange} />
        </Form.Group>

        {/* File Upload */}
        <Form.Group className="mb-3" controlId="files">
        <Form.Label>Attach progress photos / documents / blood tests for this week (optional)</Form.Label>
        <div {...getRootProps({ className: 'dropzone-area py-6' })}>
          <input {...getInputProps()} />
            <Flex justifyContent="center">
              <img src={cloudUpload} alt="" width={25} className="me-2" />
              <p className="fs-0 mb-0 text-700">Drop your files here</p>
            </Flex>
        </div>
        <div className="mt-3">
          {acceptedFiles.length > 0 && (
            <>
              <h6>Files</h6>
              <ul>{files}</ul>
            </>
          )}
        </div>
        </Form.Group>

        <Button variant="primary" size="lg" type="submit">Submit</Button>
        </Form>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CheckIn;

