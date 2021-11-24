import React from 'react';
import { Button, Modal, Form, Row, Col, InputGroup } from 'react-bootstrap';
import classNames from 'classnames';
import { useState } from 'react';

export default function EditSite(props) {
  const { onClick, apiLogout, state, setState } = props;

  const [user, setUser] = useState({});
  const [code, setCode] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setUser((prev) => ({ ...prev, name: '', email: '', password: '' }));
    setCode((prev) => null);
    setShow((prev) => (prev = false));
  };
  const handleShow = () => {
    setUser((prev) => ({ ...prev, name: '', email: '', password: '' }));
    setCode((prev) => null);
    setShow((prev) => (prev = true));
  };

  const logout = () => {
    console.log('-------------[logout]------------\n', user);
    apiLogout()
      .then((res) => {
        console.log('-------------[login api res]----', res.data);
        setUser((prev) => ({ ...{}, name: null, email: null, password: null }));
        setState((prev) => ({ ...prev, user: null }));
        handleClose();
        return;
      })
      .catch((error) => `Error: ${error}`);
  };

  const login = () => {
    console.log('-------------[login form]------------\n', user);
    onClick(user)
      .then((res) => {
        console.log('-------------[login api res]----\n', res.data);
        setCode((prev) => res.data.code);

        if (res.data.user) {
          setUser((prev) => res.data.user);
          setState((prev) => ({ ...prev, user: res.data.user }));
          handleClose();
          return;
        }
      })
      .catch((error) => `Error: ${error}`);
  };

  const handleEmail = (e) => {
    setUser((prev) => ({ ...prev, email: e.target.value }));
  };
  const handlePassword = (e) => {
    setUser((prev) => ({ ...prev, password: e.target.value }));
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <main>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className='mb-3'>
          <Form.Group as={Col} md='4' controlId='validationCustom01'>
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='First name'
              defaultValue='Mark'
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='4' controlId='validationCustom02'>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Last name'
              defaultValue='Otto'
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='4' controlId='validationCustomUsername'>
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id='inputGroupPrepend'>@</InputGroup.Text>
              <Form.Control
                type='text'
                placeholder='Username'
                aria-describedby='inputGroupPrepend'
                required
              />
              <Form.Control.Feedback type='invalid'>
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} md='6' controlId='validationCustom03'>
            <Form.Label>City</Form.Label>
            <Form.Control type='text' placeholder='City' required />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='3' controlId='validationCustom04'>
            <Form.Label>State</Form.Label>
            <Form.Control type='text' placeholder='State' required />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='3' controlId='validationCustom05'>
            <Form.Label>Zip</Form.Label>
            <Form.Control type='text' placeholder='Zip' required />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className='mb-3'>
          <Form.Check
            required
            label='Agree to terms and conditions'
            feedback='You must agree before submitting.'
            feedbackType='invalid'
          />
        </Form.Group>
        <Button type='submit'>Submit form</Button>
      </Form>
    </main>
  );
}
