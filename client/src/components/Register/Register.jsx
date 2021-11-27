import React from 'react';
import {Button,Modal, Form} from 'react-bootstrap';

import { useState } from 'react';

export default function Register(props) {
  const {apiRegister, state, setState} = props
  
	const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [code,setCode] = useState(false)

  const handleClose = () => {
    setShow(prev => prev = false);
    setCode(prev => prev = null)
    setValidated(prev => prev = false)
    setUser(prev => ({...prev, name: '', email:'', password:''}))
  }
  const handleShow = () => {
    setShow(prev => true);
    console.log('sign the fuk in', show);
  };


  const register = () => {
    console.log('-------------[register form]------------\n',user)
    apiRegister(user)
    .then(res => {
      console.log('-------------[register api res]----\n',res.data)
      setCode(prev => res.data.code)
      if (res.data.user) {
        // setUser(prev => ({...prev, name: '', email:'', password:''}))
        setState(prev => ({...prev, user:res.data.user, logged:true}))
        handleClose()
        return
      }
      
      // setState(prev => ({...prev, user:null})) 
      // handleShow()
      return
    
      
    })
    .catch(error => `Error: ${error}`);

  };

  const handleChange = (e) => {
    setUser(prev => ({...prev, [e.target.name]: e.target.value }))
    setCode(prev => prev = null)
    console.log(user)
  }

  const [validated, setValidated] = useState(false);
  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated((prev) => true);

    if (form.checkValidity()) {
      register();
      setValidated((prev) => false);
    }
  };


  return (
    <>
      <Button variant='outline-warning' onClick={handleShow}>
        Register
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <b> Sign Up!</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form      
          noValidate
          validated={validated}
          onSubmit={handleSubmit}>
          <Form.Group className='sm-2' controlId='namze'>
              <Form.Label>Name</Form.Label>
              <Form.Control required type="text" onChange={handleChange} name='name' value={user.name} placeholder="John Smith"/>           
            </Form.Group>
            <p/>

           <Form.Group className='sm-2' controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control required type="email" onChange={handleChange} name='email' value={user.email} placeholder="john.smith@email.com"/>           

              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className='sm-2' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required onChange={handleChange} name='password' value={user.password} placeholder="password"/>           
            </Form.Group>
            <br/>
              {code === 400 && 
                <div class="alert alert-danger" role="alert">
                    {user.email} already exists!
                </div>}

                {code === 401 && 
                <div class="alert alert-danger" role="alert">
                    Invalid user name or password
                </div>}
            <Button  type='submit' variant='warning'>
              Register
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      
    </>
  );
}
