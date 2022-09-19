import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import login from './images/login1.png'
import {Box , TextField,Typography, Alert, CircularProgress} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import {useLoginUserMutation} from '../Services/userAuthApi'
import { getToken, storeToken } from '../Services/LocalServices';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../Features/AuthSlice';
function Login() {
  const navigate=useNavigate()
  const [loginUser,{isLoading}]=useLoginUserMutation()
  const [server_error, setServerError]=useState({})
  const dispatch = useDispatch()
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const data =new FormData(e.currentTarget);
    const actualData={
      email:data.get('email'),
      password:data.get('password')
    }
    const res = await loginUser(actualData)
    if(res.error){
      //console.log(res.error.data.errors)
      setServerError(res.error.data.errors)
      //console.log(server_error)
    }
    if(res.data){
      //console.log(res.data)
      storeToken(res.data.token)
      let {access_token}=getToken()
      dispatch(setUserToken({access_token:access_token}))
      navigate('/')
    }
  }
  let {access_token}=getToken()
  useEffect(()=>{
    
    dispatch(setUserToken({access_token:access_token}))
  },[access_token,dispatch])
  return (
    <div>
      <Navbar login="nav-link active"/>
      <br/>
<Box component='form' sx={{}} id="login-form" onSubmit={handleSubmit}>
      <div className=" container card mb-3" style={{"maxWidth": "1000px"}}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={login} className="img-fluid rounded-start" alt="..."/>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className='text-center'>Login</h3>
              
            <div className="mb-3 row">
    <TextField margin='normal' required fullwidth="true" id='email' name='email' label='Email Address'/>
    {server_error.email ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}} >{server_error.email[0]}</Typography>:""}
  <br/>
  <br/>
  <TextField margin='normal' required fullwidth="true" id='password' label='Password' name='password' type='password'/>
  {server_error.password ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}} >{server_error.password[0]}</Typography>:""}
  </div>
  <div className="d-grid gap-2 col-6 mx-auto">
{isLoading ? <CircularProgress/> : <button className="btn btn-primary" type="submit">Confirm Identity</button>}
  
  
</div>
<NavLink to='/forgot-password' > Forgot Password ?</NavLink>
<br/>
<NavLink to='/register' > Don't have account ? Sign up</NavLink>

            </div>
            {server_error.Non_field_errors ? <Alert severity='error'>{server_error.Non_field_errors[0]}</Alert>:""}
          </div>
  </div>
</div>
</Box>
    </div>
  )
}

export default Login