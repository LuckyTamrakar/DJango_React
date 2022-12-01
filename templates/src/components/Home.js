import React from 'react'
import quiz_exam from './images/Quiz_exam.jpg'
import patient from './images/Patient_appointment.jpg'
import news from './images/News.jpg'
import Navbar from './Navbar'
import {
  
    Link
  } from "react-router-dom";
function Home(props) {

  return (
    <>  
        <Navbar home="nav-link active"/>
        <br/>
        
        <div className="container">
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
            <div className="carousel-item active">
           <Link to="/quiz-exam"> <img src={quiz_exam}  className="d-block w-100" alt="..."/></Link>
            </div>
            <div className="carousel-item">
            <img src={patient}  className="d-block w-100" alt="..."/>
            </div>
            <div className="carousel-item">
            <img src={news} className="d-block w-100" alt="..."/>
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
        </div>
        <br/>
        <div className="bg-dark row row-cols-1 row-cols-md-3 g-4">
  <div className="bg-dark  col">
    <div className="bg-dark card h-100 text-white border border-light border-2" style={{"border":"white"}}>
      <img src={quiz_exam} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Quiz Exam</h5>
        <p className="card-text">MFW provide various types of quiz to our customer related to computer or computer language or data structure.</p>
      </div>
      <Link to="/quiz-exam" className="btn btn-primary" role="button"> Quiz Exam</Link>
    </div>
  </div>
  <div className="col">
    <div className="card h-100 text-white bg-dark border border-light border-2">
      <img src={patient} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Doctor Appointment</h5>
        <p className="card-text">MFW provide various types of doctor to our customer for their treatments.</p>
      </div>
      <Link to="/doctor-appointment" className="btn btn-primary" role="button"> Doctor Appointment</Link>
    </div>
  </div>
  <div className="col">
    <div className="card h-100 text-white bg-dark border border-light border-2">
      <img src={news} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Breaking News</h5>
        <p className="card-text">Breaking news of all over the world in our MFW News</p>
      </div>
      <Link to="/news" className="btn btn-primary " role="button"> Watch News</Link>
    </div>
  </div>
 
</div>
            </div>
    </>
  )
}

export default Home