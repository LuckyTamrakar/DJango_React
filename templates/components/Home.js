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
            <img src={quiz_exam}  className="d-block w-100" alt="..."/>
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
            <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                    <div className="card">
                    <img src={quiz_exam} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <Link to="#" className="btn btn-primary">Go somewhere</Link>

                    </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                    <img src={patient} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <Link to="#" className="btn btn-primary">Go somewhere</Link>
                    </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                    <img src={news} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                        <Link to="/news" className="btn btn-primary">Go somewhere</Link>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home