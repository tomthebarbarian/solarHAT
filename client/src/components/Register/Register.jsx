import React from 'react';
import {Button,Modal, Form} from 'react-bootstrap';

import { useState } from 'react';

export default function Register(props) {
  const {onClick, state, setState} = props
  
	const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [code,setCode] = useState(false)

  const handleClose = () => {
    setShow(prev => false);
    setUser(prev => ({...prev, name: '', email:'', password:''}))
  }
  const handleShow = () => {
    setShow(prev => true);
    console.log('sign the fuk in', show);
  };


  const register = () => {
      

    console.log('-------------[register form]------------\n',user)
    onClick(user)
    .then(res => {
      console.log('-------------[register api res]----\n',res.data)
      setCode(prev => res.data.code)
      if (res.data.user) {
        // setUser(prev => ({...prev, name: '', email:'', password:''}))
        setState(prev => ({...prev, user:res.data.user}))
        handleClose()
        return
      }
      
      // setState(prev => ({...prev, user:null})) 
      // handleShow()
      return
    
      
    })
    .catch(error => `Error: ${error}`);

  };

  const handleName = (e) => {
    setUser(prev => ({...prev, name: e.target.value }))
    setCode(prev => null)
  }

  const handleEmail = (e) => {
    setUser(prev => ({...prev, email: e.target.value }))
    setCode(prev => null)
  }
  const handlePassword = (e) => {
    setUser(prev => ({...prev, password: e.target.value }))
    setCode(prev => null)
   }


  return (
    <>
    
      <pre> </pre>
     { (code !==200) && <Button variant='outline-warning' onClick={handleShow}>
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
          <Form.Group className='sm-2' controlId='namze'>
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
              {code === 400 && 
                <div class="alert alert-danger" role="alert">
                    {user.email} already exists!
                </div>}

                {code === 401 && 
                <div class="alert alert-danger" role="alert">
                    Invalid user name or password
                </div>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='warning' onClick={register}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
      
    </>
  );
}
