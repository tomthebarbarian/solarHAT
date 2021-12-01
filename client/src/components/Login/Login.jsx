import React from 'react';
import {Button,Modal, Col, Row, Form, InputGroup} from 'react-bootstrap';
import classNames from 'classnames'
import { useState } from 'react';


const initState = {
    user: null,
    map: null,
    marker: null,
    sites: null,
    userSites:null,
    count:0,
  };

export default function Login(props) {
  const {apiLogin, apiLogout, state, setState} = props

	const [user, setUser] = useState({});
  const  [code,setCode] = useState(false)

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setUser(prev => ({...prev, name: '', email:'', password:''}))
    setCode(prev => prev = null)
    setShow((prev) => prev = false);
    setValidated(prev => prev = false)
  }
  const handleShow = () => {
    setUser(prev => ({...prev, name: '', email:'', password:''}))
    setCode(prev => null)
    setShow((prev) => (prev = true));

  };

  const logout = () => {
    console.log('-------------[logout]------------\n',user)
    apiLogout()
    .then(res => {
      console.log('-------------[login api res]----',res.data)
      setUser(prev => ({...{}, name:null, email: null , password:null}))
      setState(prev => ({...{}, ...initState } ))
      handleClose()
      return 
    })
    .catch(error => `Error: ${error}`)
  
  }

  const login = () => {
    console.log('-------------[login form]------------\n',user)
    apiLogin(user)
      .then((res)=>{
      console.log('-------------[login api res]----\n',res.data)
      setCode(prev => res.data.code)

      if (res.data.code ===200) {
        setUser(prev => res.data.user)
        setState(prev => ({...prev, user:res.data.user, logged:true}))
        handleClose()
        return 
      }
      })
      .catch(error => `Error: ${error}`);
      
  };

  const handleChange = (e) => {
    setUser(prev => ({...prev, [e.target.name]: e.target.value }))
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
      login();
      setValidated((prev) => false);
    }
  };
  return (
    <>
    <pre> </pre>
      {!state.user && 
      <Button variant='outline-warning' onClick={handleShow}>
        Login
      </Button>}

      {state.user &&
      
      <>
        <div className='navrbar'> 🙋 Hello, {state.user.name}  </div>
        <pre> </pre>
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
        <Form      
          noValidate
          validated={validated}
          onSubmit={handleSubmit}>
            <Form.Group className='sm-2' controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control required type="email"  onChange={handleChange} name='email' value={user.email} placeholder="email address"/>           
              {/* <input type="email" name="email" value={user.email} onChange={handleEmail} className="form-control" /> */}

              <Form.Text className='text-muted'>
              </Form.Text>
            </Form.Group>
            <p/>
            <Form.Group className='sm-2' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password"  onChange={handleChange} name='password' value={user.password} placeholder="password"/>           
            </Form.Group>
            <p/>
            <div class={code===null? '' :"alert alert-danger"} role="alert">
              {code === 400 && <> Invalid user name or password </> }
              {code === 401 && <> {user.email} not found! </>}
              {code === 403 &&  <>Invalid credentials. Please check password and try again.' </>}
            </div>
            <Button type='submit' variant='warning' >
              Login
           </Button>
          </Form>
        </Modal.Body>
      </Modal>
      
    </>
  );
}
