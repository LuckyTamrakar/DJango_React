import React from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../Services/LocalServices'
import Navbar from './Navbar'
import quizExam from './images/34.jpg'
function QuizExam() {
    const { access_token } = getToken()
  return (
    <div>
        <Navbar/>
        <br/>
        <div className='container'>
        {access_token ? <></> : <div className="alert alert-danger" role="alert">
<h4 className="alert-heading">Please Login!</h4>
<p>If you want to give quiz please login in your account</p>
<hr/>
<p className="mb-0">If you don't have account. Please Register to give Quiz</p>
<br/>
<Link to="/register" className='btn btn-danger'>Register</Link>
</div>}</div>
        <div className='container'>
        <div className="row row-cols-1 row-cols-md-3 g-4">
  <div className="col">
    <div className="card h-100 text-white bg-dark border border-light border-2">
      <img src={quizExam} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Django Quiz</h5>
        <p className="card-text">This quiz provide realted to Django and its functionality.</p>
        
      </div>
      
        {access_token ? <Link to="/quiz-exam/django" className="btn btn-primary">Start Quiz</Link> : <Link to="/login" className="btn btn-primary">Start Quiz</Link>}
  
    </div>
  </div>
  <div className="col">
    <div className="card h-100 text-white bg-dark border border-light border-2">
      <img src={quizExam} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">JavaScript Quiz</h5>
        <p className="card-text">This quiz provide realted to JavaScript and its functionality</p>
        
      </div>
      
      {access_token ? <Link to="/quiz-exam/react" className="btn btn-primary">Start Quiz</Link> : <Link to="/login" className="btn btn-primary">Start Quiz</Link>}
    
    </div>
  </div>
  <div className="col">
    <div className="card h-100 text-white bg-dark border border-light border-2">
      <img src={quizExam} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Python Quiz</h5>
        <p className="card-text">This quiz provide realted to Python and its functionality.</p>
        
      </div>
     
      {access_token ? <Link to="/quiz-exam/python" className="btn btn-primary">Start Quiz</Link> : <Link to="/login" className="btn btn-primary">Start Quiz</Link>}
  
    </div>
  </div>
  <div className="col">
    <div className="card h-100 text-white bg-dark border border-light border-2">
      <img src={quizExam} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Java Quiz</h5>
        <p className="card-text">This quiz provide realted to Java and its functionality.</p>
        
      </div>
      {access_token ? <Link to="/quiz-exam/java" className="btn btn-primary">Start Quiz</Link> : <Link to="/login" className="btn btn-primary">Start Quiz</Link>}
    </div>
  </div>
  <div className="col">
    <div className="card h-100 text-white bg-dark border border-light border-2">
      <img src={quizExam} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">C/C++ Quiz</h5>
        <p className="card-text">This quiz provide realted to C/C++ and its functionality.</p>
        
      </div>
      {access_token ? <Link to="/quiz-exam/C-C++" className="btn btn-primary">Start Quiz</Link> : <Link to="/login" className="btn btn-primary">Start Quiz</Link>}
    </div>
  </div>
  <div className="col">
    <div className="card h-100 text-white bg-dark border border-light border-2">
      <img src={quizExam} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">DSA</h5>
        <p className="card-text">This quiz provide realted to Data Structure and Algorithms and its functionality.</p>
        
      </div>
      {access_token ? <Link to="/quiz-exam/DSA" className="btn btn-primary">Start Quiz</Link> : <Link to="/login" className="btn btn-primary">Start Quiz</Link>}
    </div>
  </div>
</div>

        </div>
    </div>
  )
}

export default QuizExam