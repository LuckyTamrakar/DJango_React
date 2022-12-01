import React, {useState,useEffect} from 'react'
import Navbar from './Navbar'
import edit from './images/edit.png'
import {Box,TextField,Alert,CircularProgress} from '@mui/material'
import {Link} from 'react-router-dom';
import { getToken } from '../Services/LocalServices';
//import { confirmAlert } from 'react-confirm-alert'; // Import
//import 'react-confirm-alert/src/react-confirm-alert.css';
import { useGetLoginUserQuery, usePatientDeleteMutation, usePatientProfileQuery, usePatientUpdateMutation } from '../Services/userAuthApi';
function ProfleView() {
  //window.onload = function () {window.location.reload()}
    const {access_token}=getToken()
    const {currentData}=useGetLoginUserQuery(access_token)
    const [userData,setUserData]=useState({})
    //console.log(currentData)
    //const [patientData,setPatientData]=useState({email:"",name:"",dtr_id:"",address:"",date:""})
    //console.log(patientData)
    useEffect(()=>{
        if(currentData){
          setUserData({
           email:currentData.email
            
          })    }
      },[currentData])
      
    
    //console.log(userData.email)
    const [deleteData]=usePatientDeleteMutation()
    const {data,isSuccess}=usePatientProfileQuery(userData.email)
    const [userPatientData,setUserPatientData]=useState({data:[]})
    useEffect(()=>{
        if(data && isSuccess){
          setUserPatientData({
            data
            
            
          })    }
      },[data,isSuccess])
      //console.log(userPatientData)
   function deletePatientData(){
    
    /*confirmAlert({
      title: 'Cancellation of Appointment',
      message: 'Are you sure you want to cancel your appointment.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteData(userData.email)
          
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
      
    });*/
    if (window.confirm('Are you sure you want to cancel the appointment')){
      deleteData(userData.email)
      window.location.reload()
    }
  
    
   }
   const [patientAppointment,{isLoading}]=usePatientUpdateMutation()
  const [server_error, setServerError]=useState({})
  const [server_msg, setServermsg]=useState({})
   const handleSubmit=async(e)=>{
    e.preventDefault();
    const email=userData.email
    
    const data =new FormData(e.currentTarget);
    const actualData={
      name:data.get('name'),
      date:data.get('date'),
      desc:data.get('desc')
    }
    const res=await patientAppointment({actualData,email})
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
      window.location.reload()
    }
  }

  return (
    <>
        <Navbar/>
        <br/>
      {access_token  ? 
       
      <div className=" container card mb-3" style={{"maxWidth": "1000px"}}>
        <br/>

        <div className="row g-0">
          <div className="col-md-6">
          
            <img src={edit} className="img-fluid rounded-start" alt="..."/>
            
          </div>
          <div className='col-md-6'>
            <div className='card-body'>
            {userPatientData.data.map(({email,name,date,desc,time},i)=>(
                <div key={i}>
                    <h6>Email : {email}</h6>
                    <h6>Name : {name}</h6>
                    <h6>Date : {date}</h6>
                    {time>12 ? <h6>Time : {time}pm</h6>:<h6>Time : {time}am</h6>}
                    <h6>Desc : {desc}</h6>
                </div>
            ))}
           { userPatientData.data[0] ? <> <button className="btn btn-danger btn-sm" onClick={deletePatientData} >Cancel Appointment</button> <button type="button" className="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Update Appointment</button></>:<><div className="alert alert-danger container" role="alert"><h4 className="alert-heading">Sorry, You don't have any appointment!</h4> <hr/><p>Please Book your Doctor's Appointment</p><Link to="/doctor-appointment" className='btn btn-danger'>Book Appointment</Link></div></>}
           
            </div>
          </div>
          </div>
          
         
        </div> : <div className="alert alert-danger container" role="alert">
<h4 className="alert-heading">Please Login!</h4>
<p>Please login in your account for enjoy our webapp</p>
<hr/>
<p className="mb-0">If you don't have account. Please Register for enjoy our webapp</p>
<br/>
<Link to="/register" className='btn btn-danger'>Register</Link>
</div>}


<Box component='form' sx={{}} id="contact-form" onSubmit={handleSubmit}>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update Patient Detail</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
          <div className="mb-3">
            <TextField margin='normal' required fullwidth="true" id='name' label='Name' name='name' />
          </div>
          <div className="mb-3">
          <TextField margin='normal' required fullwidth="true" id='date' label='Date' name='date' />
          </div>
          <div className='mb-3'>
          <TextField margin='normal' required fullwidth="true" id='desc' label='Description' name='desc' />
          </div>
       
      </div>
      {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert>:""}
          {server_msg.msg ? <Alert severity='success'>{server_msg.msg}</Alert>:""}
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        {isLoading ? <CircularProgress/> : <button className="btn btn-outline-success " type="submit">Update</button>}
      </div>
    </div>
  </div>
 
</div>     
</Box> 
    </>
  )
}

export default ProfleView