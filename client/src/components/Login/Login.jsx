import React from 'react';
import {Button,Modal, Form} from 'react-bootstrap';
import classNames from 'classnames'
import { useState } from 'react';

export default function Login(props) {
  const {onClick, apiLogout, state, setState} = props

	const [user, setUser] = useState({});
  // const  [logged,setLogged] = useState(false)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow((prev) => (prev = false));
  const handleShow = () => {
    setShow((prev) => (prev = true));
    console.log('sign the fuk in', show);
  };

  const logout = () => {
    console.log('-------------[logout]------------\n',user)
    apiLogout()
    .then(res => {
      console.log('-------------[login api res]----',res.data)
      setUser(prev => ({...{}, name:null, email: null , password:null}))
      setState(prev => ({...prev, user:null}))
      handleClose()
      return 
    })
    .catch(error => `Error: ${error}`)
  
  }

  const login = () => {
    console.log('-------------[login form]------------\n',user)
    onClick(user)
      .then((res)=>{
      console.log('-------------[login api res]----\n',res.data)
      
      if (res.data.user) {
        setUser(prev => res.data.user)
        setState(prev => ({...prev, user:res.data.user}))
        handleClose()
        return 
      }
      })
      .catch(error => `Error: ${error}`);
      
  };

  const handleEmail = (e) => {
    setUser(prev => ({...prev, email: e.target.value }))
  }
  const handlePassword = (e) => {
    setUser(prev => ({...prev, password: e.target.value }))
  }

  return (
    <>
    
      <pre> </pre>
      {!user.name && 
      <Button variant='outline-warning' onClick={handleShow}>
        Login
      </Button>}

      {user.name &&
      
      <>
        Hello, {user.name} 🙋 <pre>    </pre>

        <Button variant='outline-warning' onClick={logout}>
          Logout
        </Button>
        
      </>
      }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <b> Login</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='sm-2' controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" onChange={handleEmail} value={user.email} placeholder="email address"/>           

              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className='sm-2' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" onChange={handlePassword} value={user.password} placeholder="password"/>           
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='warning' onClick={login}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
      
    </>
  );
}
