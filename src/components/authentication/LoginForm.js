import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { supabase } from '../../supabase/supabaseClient'
import {Spinner} from 'react-bootstrap';

const LoginForm = ({ hasLabel }) => {
  // State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithOtp({email: formData.email ,
      options: {
        shouldCreateUser: false,
      }})
    if (!error) {
      toast.success("Please check your email for the magic link", {
        theme: 'coloured'
      })
    } else {
      console.log(error)
      toast.error(`An error occured. If you are a new user, please register first`, {
        theme: 'coloured' })
    }

    setIsLoading(false)

  };

  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
      {isLoading ? 
          <Spinner 
            animation="border" 
            role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          : ''}
        {hasLabel && <Form.Label>Email address</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Email address' : ''}
          value={formData.email}
          name="email"
          onChange={handleFieldChange}
          type="email"
        />
      </Form.Group>

      {/* <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Password</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Password' : ''}
          value={formData.password}
          name="password"
          onChange={handleFieldChange}
          type="password"
        />
      </Form.Group> */}

      <Row className="justify-content-between align-items-center">
        {/* <Col xs="auto">
          <Form.Check type="checkbox" id="rememberMe" className="mb-0">
            <Form.Check.Input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={e =>
                setFormData({
                  ...formData,
                  remember: e.target.checked
                })
              }
            />
            <Form.Check.Label className="mb-0 text-700">
              Remember me
            </Form.Check.Label>
          </Form.Check>
        </Col> */}

        {/* <Col xs="auto"> */}
          <Link
            className="fs--1 mb-0"
            to={`/authentication/forgot-password`}
          >
            Forgot Password?
          </Link>
        {/* </Col> */}
      </Row>

      <Form.Group>
        <Button
          type="submit"
          color="primary"
          className="mt-3 w-100"
          disabled={!formData.email || isLoading}
        >
          Send The Magic Link
        </Button>
      </Form.Group>

      {/* <Divider className="mt-4">or log in with</Divider>

      <SocialAuthButtons /> */}
    </Form>
  );
};

LoginForm.propTypes = {
  layout: PropTypes.string,
  hasLabel: PropTypes.bool
};

LoginForm.defaultProps = {
  layout: 'simple',
  hasLabel: false
};

export default LoginForm;
