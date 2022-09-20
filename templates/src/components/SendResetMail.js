import React, {useState} from 'react'
import {Box , TextField,Typography, Alert, CircularProgress} from '@mui/material';
import Navbar from './Navbar'
import reset from './images/mail.jpg'
import { NavLink} from 'react-router-dom';
import { useSendResetMailMutation } from '../Services/userAuthApi';
function SendResetMail() {
    const [server_error, setServerError]=useState({})
    const [server_msg, setServermsg]=useState({})
    const [sendResetMail,{isLoading}]= useSendResetMailMutation()
    const handleSubmit=async(e)=>{
      e.preventDefault();
      const data =new FormData(e.currentTarget);
      const actualData={
        email:data.get('email'),
      }
      const res = await sendResetMail(actualData)
      if(res.error){
        //console.log(res.error.data)
        setServerError(res.error.data)
        //console.log(server_error)
      }
      if(res.data){
        //console.log(res.data)
        
        setServermsg(res.data)
        setServerError({})
        
      }
    }
  return (
    <>
        <div>
      <Navbar/>
      <br/>
<Box component='form' sx={{}} id="login-form" onSubmit={handleSubmit}>
      <div className=" container card mb-3" style={{"maxWidth": "1000px"}}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={reset} className="img-fluid rounded-start" alt="..."/>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className='text-center'>Login</h3>
              
            <div className="mb-3 row">
    <TextField margin='normal' required fullwidth="true" id='email' name='email' label='Email Address'/>
    {server_error.email ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}} >{server_error.email[0]}</Typography>:""}
  
  </div>
  <div className="d-grid gap-2 col-6 mx-auto">
{isLoading ? <CircularProgress/> : <button className="btn btn-primary" type="submit">Confirm Identity</button>}
  
  
</div>
<NavLink to='/forgot-password' > Forgot Password ?</NavLink>
<br/>
<NavLink to='/register' > Don't have account ? Sign up</NavLink>

            </div>
            {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert>:""}
            {server_msg.msg ? <Alert severity='success'>{server_msg.msg}</Alert>:""}
          </div>
  </div>
</div>
</Box>
    </div>
    </>
  )
}

export default SendResetMail