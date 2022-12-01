import React , {useState} from 'react'
import {Box , TextField, Alert, CircularProgress} from '@mui/material';
import { useContactUserMutation } from '../Services/userAuthApi'
import Navbar from './Navbar'
import { NavLink } from 'react-router-dom';
import contact from './images/contact.jpg'
function Contact() {
  const [contactUser,{isLoading}]=useContactUserMutation()
  const [server_error, setServerError]=useState({})
  const [server_msg, setServermsg]=useState({})
  const  handleSubmit=async(e)=>{
    e.preventDefault();
    const data =new FormData(e.currentTarget);
    const actualData={
      name:data.get('name'),
      email:data.get('email'),
      phone:data.get('phone'),
      address:data.get('address'),
      city:data.get('city'),
      state:data.get('state'),
      desc:data.get('desc')
    }
    const res = await contactUser(actualData)
    //console.log(res)
    if(res.error){
      //console.log(res.error.data)
      setServerError(res.error.data)
      //console.log(server_error)
    }
    if(res.data){
      setServerError({})
      setServermsg(res.data)
      document.getElementById('contact-form').reset()
    }
  }
    
  return (
    <div>
      <Navbar contact="nav-link active"/>
      <br/>
      <Box component='form' sx={{}} id="contact-form" onSubmit={handleSubmit}>
      <div className="container card mb-3" style={{"maxWidth": "1000px"}}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={contact} className="img-fluid rounded-start" alt="..."/>
          </div>
          <div className="col-md-8">
            <div className="card-body">
            <h3 className='text-center'>Contact Us</h3>
              
              <div className="mb-3 row">
              <TextField margin='normal' required fullwidth="true" id='email' name='email' type='email' label='Email Address'/>

              <TextField margin='normal' required fullwidth="true" id='name' label='Name' name='name' />
              <TextField margin='normal'  fullwidth="true" id='phone' label='Phone no.' name='phone' />
              
  <TextField margin='normal'required fullwidth="true" id='address' label='Address' name='address'/>
  <TextField margin='normal' required fullwidth="true" id='city' label='City' name='city' />
  <TextField margin='normal' required fullwidth="true" id='state' label='State' name='state' />
  <TextField margin='normal' required fullwidth="true" id='desc' label='Description' name='desc' />
  
    <div className="d-grid gap-2 col-6 mx-auto">
    {isLoading ? <CircularProgress/> : <button className="btn btn-primary" type="submit">Submit</button>}
  
    
  </div>
  <NavLink to='/login' > login</NavLink>
            </div>
          </div>
          {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert>:""}
          {server_msg.msg ? <Alert severity='success'>{server_msg.msg}</Alert>:""}
  </div>
  
</div>
    </div>
    </Box>
    </div>
    
  )
}

export default Contact