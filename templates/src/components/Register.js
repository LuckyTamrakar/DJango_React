import React, {useState} from 'react'
import Navbar from './Navbar'
import register from './images/register.png'
import {Box , TextField, FormControlLabel, Typography,CircularProgress, Alert,Checkbox} from '@mui/material';
import { useNavigate, NavLink } from 'react-router-dom';
import {useRegisterUserMutation} from '../Services/userAuthApi'
import { storeToken } from '../Services/LocalServices';
function Register() {
  const navigate=useNavigate()
  
  const [registerUser,{isLoading}]=useRegisterUserMutation()
  const [server_error, setServerError]=useState({})
  const  handleSubmit=async(e)=>{
    e.preventDefault();
    const data =new FormData(e.currentTarget);
    const actualData={
      email:data.get('email'),
      name:data.get('name'),
      phone:data.get('phone'),
      password:data.get('password'),
      password2:data.get('confirm-password'),
      tc:data.get('tc')
    }
    const res = await registerUser(actualData)
    //console.log(res)
    if(res.error){
      //console.log(res.error.data)
      setServerError(res.error.data)
      //console.log(server_error)
    }
    if(res.data){
      storeToken(res.data.token)
      navigate('/')
    }
  }
    
  return (
    <div>
      <Navbar register="nav-link active"/>
      <br/>
      <Box component='form' sx={{}} id="registration-form" onSubmit={handleSubmit}>
      <div className="container card mb-3" style={{"maxWidth": "1000px"}}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={register} className="img-fluid rounded-start" alt="..."/>
          </div>
          <div className="col-md-8">
            <div className="card-body">
            <h3 className='text-center'>Online Registration</h3>
              
              <div className="mb-3 row">
              <TextField margin='normal' required fullwidth="true" id='email' name='email' type='email' label='Email Address'/>
              {server_error.email ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}} >{server_error.email[0]}</Typography>:""}

              <TextField margin='normal' required fullwidth="true" id='name' label='Name' name='name' />
              <TextField margin='normal'  fullwidth="true" id='phone' label='Phone no.' name='phone' />
              {server_error.phone ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}} >{server_error.phone[0]}</Typography>:""}
  <TextField margin='normal'required fullwidth="true" id='password' label='Password' name='password' type='password'/>
  <TextField margin='normal' required fullwidth="true" id='confirm-password' label='Confirm Password' name='confirm-password' type='password'/>
  <FormControlLabel required control={<Checkbox value={true} label="I agree to the term and conditions" color="primary" name="tc" id="tc"></Checkbox>} lable="I agree to  term and conditions" > </FormControlLabel>
  {server_error.tc ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}} >{server_error.tc[0]}</Typography>:""}
    <div className="d-grid gap-2 col-6 mx-auto">
    {isLoading ? <CircularProgress/> : <button className="btn btn-primary" type="submit">Submit</button>}
    
  </div>
  <NavLink to='/login' > login</NavLink>
            </div>
          </div>
          {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert>:""}
  </div>
  
</div>
    </div>
    </Box>
    </div>
  )
}

export default Register