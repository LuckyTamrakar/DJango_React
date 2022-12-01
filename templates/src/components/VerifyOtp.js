import React , {  useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import verify from './images/verify.jpg'
import {Box , TextField,Typography,CircularProgress} from '@mui/material';
import { useEmailverifyOtpMutation } from '../Services/userAuthApi';
function VerifyOtp() {
    const navigate=useNavigate()
    const [emailverifyOtp,{isLoading}]=useEmailverifyOtpMutation()
    const [serverError, setServerError]=useState({})
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const data =new FormData(e.currentTarget);
        const actualData={
          email:data.get('email'),
          otp:data.get('otp')
        }
        //console.log(actualData)
        const res = await emailverifyOtp(actualData)
        
        if(res.error){
          //console.log(res.error)
          alert("Email or Invalid Otp")
          
        }
        if(res.data){
        
          console.log(res.data)
          navigate('/login')
          /*storeToken(res.data.token)
          let {access_token}=getToken()
          dispatch(setUserToken({access_token:access_token}))*/
          
        }
        
        
      }
      
  return (
    <>
    <Navbar/>

    <Box component='form' sx={{}} id="otp-form" onSubmit={handleSubmit}>
      <div className=" container card mb-3" style={{"maxWidth": "1000px"}}>
      <div className="row g-0">
          <div className="col-md-4">
            <img src={verify} className="img-fluid rounded-start" alt="..."/>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className='text-center'>Email Verify</h3>
              <div className="mb-3 row">
      <TextField margin='normal' required fullwidth="true" id='email' name='email' label='Email Address' />
      {serverError.error ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}} >{serverError.error}</Typography>:""}
      <TextField margin='normal' required fullwidth="true" id='otp' name='otp' label='Otp'/>
      <div className="d-grid gap-2 col-6 mx-auto">
      {isLoading ? <CircularProgress/> : <button className="btn btn-primary" type="submit">Confirm Identity</button>}
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
</Box>

    </>
  )
}

export default VerifyOtp