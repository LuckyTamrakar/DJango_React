

import './App.css';
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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

function App() {
  const {access_token}=useSelector(state=>state.auth)
  
      return (
      < div >
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
            <Route path="/news" element={<News key="general" pageSize={5} country="in" category="general"/>}/>
            <Route exact path="/business" element={<News key="business" pageSize={5} country="in" category="business"/>}/> 
            <Route path="/entertainment" element={<News key="entertainment" pageSize={5} country="in" category="entertainment"/>}/> 
            <Route path="/general" element={<News key="general" pageSize={5} country="in" category="general"/>}/> 
            <Route path="/health" element={<News key="health" pageSize={5} country="in" category="health"/>}/> 
            <Route path="/science" element={<News key="science" pageSize={5} country="in" category="science"/>}/> 
            <Route path="/sports" element={<News key="sports" pageSize={5} country="in" category="sports"/>}/> 
            <Route path="/technology" element={<News key="technology" pageSize={5} country="in" category="technology"/>}/>   
          </Routes>    
        </Router>
      </div>
      )
  
}
export default App;