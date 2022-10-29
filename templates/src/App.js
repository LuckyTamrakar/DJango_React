

import './App.css';
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom";
import { useSelector } from 'react-redux';
import About from './components/About';
import Contact from './components/Contact';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import News from './components/News'
import ForgotPassword from './components/ForgotPassword';
import SendResetMail from './components/SendResetMail';
import ResetPassword from './components/ResetPassword';
import DjangoQuiz from './components/DjangoQuiz';
import QuizExam from './components/QuizExam';
import PatientAppointment from './components/PatientAppointment';
import DoctorApoointment from './components/DoctorAppointment';
import ProfleView from './components/ProfleView';
import VerifyOtp from './components/VerifyOtp';

function App() {
  const {access_token}=useSelector(state=>state.auth)
  
      return (
      <div className='bg-dark'>
        <Router>
        
          <Routes>
            <Route path="/" element={<Home/>}  />
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>} />
            <Route path="/register" element={!access_token ?  <Register/> : <Navigate to="/"/>} />
            <Route path="/login" element={!access_token ? <Login/> : <Navigate to="/"/>} />  
            <Route path="/change-password" element={<ForgotPassword/>} />
            <Route path="/reset-password/:id/:token/" element={<ResetPassword/>} />
            <Route path="/forgot-password" element={<SendResetMail/>} />
            <Route path="/quiz-exam/:quiz" element={<DjangoQuiz/>} />
            <Route path="/quiz-exam" element={<QuizExam/>} />
            <Route path="/otp" element={<VerifyOtp/>}/>
            <Route path="/profile-view" element={<ProfleView/>}/>
            <Route path="/doctor-appointment" element={<DoctorApoointment/>} />
            <Route path="/patient-appointment" element={<PatientAppointment/>} />
            <Route path="/news" element={<News key="general" pageSize={5} country="in" category="general"/>}/>
            <Route exact path="/business" element={<News key="business" pageSize={5} country="in" category="business"/>}/> 
            <Route path="/entertainment" element={<News key="entertainment" pageSize={5} country="in" category="entertainment"/>}/> 
            <Route path="/general" element={<News key="general" pageSize={5} country="in" category="general"/>}/> 
            <Route path="/health" element={<News key="health" pageSize={5} country="in" category="health"/>}/> 
            <Route path="/science" element={<News key="science" pageSize={5} country="in" category="science"/>}/> 
            <Route path="/sports" element={<News key="sports" pageSize={5} country="in" category="sports"/>}/> 
            <Route path="/technology" element={<News key="technology" pageSize={5} country="in" category="technology"/>}/>   
          </Routes>    
        
        <br/>
        <br/>
        <br/>
        <br/>
        <hr style={{"color":"white"}}></hr>
        <footer className="bg-dark text-center text-white">
 
  <div className="container p-4 pb-0">
   
    <section className="mb-4">
    

      <Link className="btn btn-outline-light btn-floating m-1" to="#!" role="button"><i className="fab fa-facebook-f"></i></Link>

      
      <Link className="btn btn-outline-light btn-floating m-1" to="#!" role="button"
        ><i className="fab fa-twitter"></i
      ></Link>

     
      <Link className="btn btn-outline-light btn-floating m-1" to="#!" role="button"
        ><i className="fab fa-google"></i
      ></Link>

      
      <Link className="btn btn-outline-light btn-floating m-1" to="#!" role="button"
        ><i className="fab fa-instagram"></i
      ></Link>

     
      <Link className="btn btn-outline-light btn-floating m-1" to="#!" role="button"
        ><i className="fab fa-linkedin-in"></i
      ></Link>

      <Link className="btn btn-outline-light btn-floating m-1" to="#!" role="button"
        ><i className="fab fa-github"></i
      ></Link>
    </section>
   
  </div>
 
  <div className="text-center p-3" style={{"backgroundcolor": "rgba(0, 0, 0, 0.2)"}}>
    © 2020 Copyright:
    <Link className="text-white " to="/" style={{"textDecoration":"None"}} > MFW.com</Link>
  </div>

</footer>
</Router>
</div>

      )
  
}
export default App;