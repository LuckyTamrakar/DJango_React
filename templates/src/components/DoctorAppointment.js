import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../Services/LocalServices'
import Navbar from './Navbar'
import doc1 from './images/1.png' 
import doc2 from './images/2.png' 
import doc3 from './images/3.png' 
import doc4 from './images/4.png' 
import doc5 from './images/5.png' 
import doc6 from './images/6.png' 
import {useGetLoginUserQuery,usePatientPastProfileQuery} from '../Services/userAuthApi';
function DoctorApoointment() {
  const {access_token}=getToken()
    
   
    
  const {currentData,isSuccess}=useGetLoginUserQuery(access_token)
  
  const [userData,setUserData]=useState({email:"",name:""})
  useEffect(()=>{
    if(currentData && isSuccess){
      setUserData({
        email:currentData.email,
        
        
      })    }
  },[currentData,isSuccess])
  const email=userData.email
  //console.log(email)
  const {data} = usePatientPastProfileQuery(email)
  const [userPatientData,setUserPatientData]=useState({data:[]})
  useEffect(()=>{
      if(data){
        setUserPatientData({
          data
          
          
          
        })    }
    },[data])
   //console.log(data)
  return (
    <div>
        <Navbar/>
        <br/>
        <div className='container'>
        {access_token ? <>
          <Link to='/profile-view' className='btn btn-primary btn-sm'>Your Appointment</Link> <span/>
        <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Past Patient Detail</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Past Patient Detail</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form>
          <div className="mb-3">{userPatientData.data[0] ?<div>
          {userPatientData.data.map(({email,names,doctor,doctordiag},i)=>(
                <div key={i}>
                  {doctordiag ? <> 
                    <h6>Email : {email}</h6>
                    <h6>Name : {names}</h6>
                    <h6>Doctor : {doctor}</h6>
                    <h6>Doctor Diag : {doctordiag}</h6></>: <h6 style={{"color":"red"}}>You don't have any past detail or Your Diagonsis not be updated by our doctor, Sorry for your inconvinence. </h6>}
                </div>
            ))}</div> : <h6>You don't have any past detail or Your data not be updated by our doctor, Sorry for your inconvinence. </h6>}
          </div>
         
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>
        </> : <div className="alert alert-danger border border-light border-2" role="alert">
<h4 className="alert-heading text-red">Please Login!</h4>
<p>please login in your account</p>
<hr/>
<p className="mb-0">If you don't have account. Please Register to give Quiz</p>
<br/>
<Link to="/register" className='btn btn-danger'>Register</Link>
</div>}</div><br/>
        <div className='container'>
        
        <div className="bg-dark row row-cols-1 row-cols-md-3 g-4">
        
  <div className="col">
    
    <div className="card h-100 text-white bg-dark border border-light border-2">
      <img src={doc4} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Dr. Sohil khan</h5>
        <p className="card-text">Our Medical expert doctor provide various types of medical treatment to our patient.</p>
        
      </div>
      
        {access_token ? <Link to="/patient-appointment" className="btn btn-primary">Book Appointment</Link> : <Link to="/login" className="btn btn-primary">Book Appointment</Link>}
  
    </div>
  </div>
  <div className="col">
    <div className="card h-100 text-white bg-dark border border-light border-2">
      <img src={doc5} alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Dr. Himanshi</h5>
        <p className="card-text">Dr. Himanshi is expertise in Heart related treatment</p>
        
      </div>
      
      {access_token ? <Link to="/patient-appointment" className="btn btn-primary">Book Appointment</Link> : <Link to="/login" className="btn btn-primary">Book Appointment</Link>}
    
    </div>
  </div>
  <div className="col bg-dark">
    <div className="card h-100 text-white bg-dark border border-light border-2">
      <img src={doc3} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Dr. Ashutosh</h5>
        <p className="card-text">Dr. Ashutosh is expertise in anytype of surgery.</p>
        
      </div>
     
      {access_token ? <Link to="/patient-appointment" className="btn btn-primary">Book Appointment</Link> : <Link to="/login" className="btn btn-primary">Book Appointment</Link>}
  
    </div>
  </div>
  <div className="col">
    <div className="card h-100 text-white bg-dark border border-light border-2">
      <img src={doc2} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Dr. Ajeet</h5>
        <p className="card-text">Dr. Ajeet is expertise in our Dental department</p>
        
      </div>
      {access_token ? <Link to="/patient-appointment" className="btn btn-primary">Book Appointment</Link> : <Link to="/login" className="btn btn-primary">Book Appointment</Link>}
    </div>
  </div>
  <div className="col">
    <div className="card h-100 text-white bg-dark border border-light border-2">
      <img src={doc6} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Dr. Varsha</h5>
        <p className="card-text">Dr. Varsha is expertise in our Eye department.</p>
        
      </div>
      {access_token ? <Link to="/patient-appointment" className="btn btn-primary">Book Appointment</Link> : <Link to="/login" className="btn btn-primary">Book Appointment</Link>}
    </div>
  </div>
  <div className="col">
    <div className="card h-100 text-white bg-dark border border-light border-2">
      <img src={doc1} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Dr. Vandna</h5>
        <p className="card-text">Dr. Vandna is expertise for Unconscious.</p>
        
      </div>
      {access_token ? <Link to="/patient-appointment" className="btn btn-primary">Book Appointment</Link> : <Link to="/login" className="btn btn-primary">Book Appointment</Link>}
    </div>
  </div>
</div>
        </div>
    </div>
  )
}

export default DoctorApoointment