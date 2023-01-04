import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';
import { supabase } from 'supabase/supabaseClient';

const ForgetPasswordForm = () => {
  // State
  const [email, setEmail] = useState('');

  // Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email) {      
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: '/authentication/reset-password',
      })

      if (!error) {
        toast.success(`An email is sent to ${email} with password reset link`, {
          theme: 'colored'
        });
      } else {
        toast.error(`An error has occured ${erorr}`)
      }
    }
  };

  return (
    <Form className="mt-4" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          placeholder={'Email address'}
          value={email}
          name="email"
          onChange={({ target }) => setEmail(target.value)}
          type="email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Button className="w-100" type="submit" disabled={!email}>
          Send reset link
        </Button>
      </Form.Group>

      <Link className="fs--1 text-600" to="#!">
        I can't recover my account using this page
        <span className="d-inline-block ms-1"> &rarr;</span>
      </Link>
    </Form>
  );
};

ForgetPasswordForm.propTypes = {
  layout: PropTypes.string
};

ForgetPasswordForm.defaultProps = { layout: 'simple' };

export default ForgetPasswordForm;
