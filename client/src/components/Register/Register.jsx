import React from 'react';
import {Button,Modal, Form} from 'react-bootstrap';

import { useState } from 'react';

export default function Register(props) {
  const {onClick, state, setState} = props
  
	const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [exist,setExist] = useState(false)

  const handleClose = () => setShow((prev) => false);
  const handleShow = () => {
    setShow((prev) => true);
    console.log('sign the fuk in', show);
  };


  const submit = () => {
    console.log('-------------[register form]------------',user)
    onClick(user)
    .then(res => {
      console.log('-------------[register api res]----',res.data)
      setExist(prev => res.data.exist)
      if (!exist) {
        setUser(prev => user )
        setState(prev => ({...prev, user:user}))
        handleClose()
        return
      }
      setUser(prev => ({...prev, name: '', email:'', password:''}))
      setState(prev => ({...prev, user:null}))

      handleShow()
    })
    .catch(error => `Error: ${error}`);
  };

  const handleName = (e) => {
    setUser(prev => ({...prev, name: e.target.value }))
    setExist(prev => false)
  }

  const handleEmail = (e) => {
    setUser(prev => ({...prev, email: e.target.value }))
    setExist(prev => false)
  }
  const handlePassword = (e) => {
    setUser(prev => ({...prev, password: e.target.value }))
    setExist(prev => false)
   }


  return (
    <>
    
      <pre> </pre>
     { !user.name && <Button variant='outline-warning' onClick={handleShow}>
        Register
      </Button>}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <b> Sign Up!</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className='sm-2' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" onChange={handleName} value={user.name} placeholder="John Smith"/>           
            </Form.Group>

           <Form.Group className='sm-2' controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" onChange={handleEmail} value={user.email} placeholder="john.smith@email.com"/>           

              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className='sm-2' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" onChange={handlePassword} value={user.password} placeholder="password"/>           
            </Form.Group>
          {exist && 
            <div class="alert alert-danger" role="alert">
                {user.name} already exists!
            </div>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='warning' onClick={submit}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
      
    </>
  );
}
