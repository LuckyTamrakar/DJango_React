import React, {useState,useEffect} from 'react'

import forgot from './images/forgot.png'
import {Box , TextField,Typography, Alert, CircularProgress} from '@mui/material';
import { NavLink,useNavigate} from 'react-router-dom';
import { useForgotUserMutation } from '../Services/userAuthApi';
import Navbar from './Navbar';
import {useGetLoginUserQuery} from '../Services/userAuthApi'
import { getToken } from '../Services/LocalServices';
import { useDispatch } from 'react-redux';

function ForgotPassword() {
    const [forgotUser,{isLoading}]=useForgotUserMutation()
    const [server_error, setServerError]=useState({})
    const [server_msg, setServermsg]=useState({})
    const {access_token}=getToken()
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const {data,isSuccess}=useGetLoginUserQuery(access_token)
    const [userData,setUserData]=useState({email:"",name:""})
    useEffect(()=>{
      if(data && isSuccess){
        setUserData({
          email:data.email,
          name:data.name,
        })    }
    },[data,isSuccess])
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const data =new FormData(e.currentTarget);
        const actualData={
          password:data.get('password'),
          password2:data.get('confirm-password')
        }
        const res = await forgotUser({actualData,access_token})
        if(res.error){
          //console.log(res.error.data)
          setServerError(res.error.data)
          //console.log(server_error)
        }
        if(res.data){
          //console.log(res.data)
          setServerError({})
          setServermsg(res.data)
          //console.log(server_msg)
        }
      }
  return (
    <>
        <div>
      <Navbar/>
      <br/>
<Box component='form' sx={{}} id="forgot-form" onSubmit={handleSubmit}>
      <div className=" container card mb-3" style={{"maxWidth": "1000px"}}>
        <br/>
        <div className="row g-0">
          <div className="col-md-4">
          <h6>Name : {userData.name}</h6>
            <h6>Email : {userData.email}</h6>
            <img src={forgot} className="img-fluid rounded-start" alt="..."/>
            
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className='text-center'>Change Password</h3>
              
            <div className="mb-3 row">
    <TextField margin='normal' required fullwidth id='password' name='password' label='Password' type='password'/>
    {server_error.password ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}} >{server_error.password[0]}</Typography>:""}
  <br/>
  <br/>
  <TextField margin='normal' required fullwidth id='confirm-password' label='Confirm Password' name='confirm-password' type='password'/>
  {server_error.password2 ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}} >{server_error.password2[0]}</Typography>:""}
  </div>
  <div className="d-grid gap-2 col-6 mx-auto">
{isLoading ? <CircularProgress/> : <button className="btn btn-primary" type="submit">Change Password</button>}
  
  
</div>


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

export default ForgotPassword