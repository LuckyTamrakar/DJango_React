import React,{useState,useEffect} from 'react'

import { useDjangoQuizQuery } from '../Services/userAuthApi'
import { useDispatch } from 'react-redux';
import { setUserToken } from '../Features/AuthSlice';

import { Box ,Alert,AlertTitle} from '@mui/material';
import Navbar from './Navbar';
import { Link, useParams } from 'react-router-dom';
import { getToken } from '../Services/LocalServices';
function DjangoQuiz() {
    const {quiz}=useParams()
    
    const {data}=useDjangoQuizQuery(quiz)
    const [userData,setUserData]=useState({data:[]})
    const [answerCheck, setAnswerCheck] = useState()
    const dispatch = useDispatch()
    
    const {access_token} = getToken()
      useEffect(()=>{
    let {access_token} = getToken()
    dispatch(setUserToken({access_token:access_token}))
  },[access_token,dispatch])
    
    useEffect(()=>{
      if(data){
        setUserData({data})
        
      }
  },[data])
  //const a=userData.data.flatMap((q)=>q)//
  //console.log(a)
  const b=userData.data.flatMap((q)=>q.answer)
  const ac=b.length
  const c=quiz.toUpperCase()
  //console.log(userData)
  const [answer,setAnswer]=useState({})

  const handleSelection=(e)=>{
    setAnswer({...answer,[e.target.value]:e.target.checked})
  }
  //console.log(answer)
  const createInitialAnswer=()=>{
    let z=b.flatMap((obj)=>obj.id)
    var object={}
    for(var x=0;x<ac;x++){
      object[z[x]]=false
    }
    return object
  }
  useEffect(()=>{
    if(Object.keys(answer).length===0){
      setAnswer(createInitialAnswer())
    }
  },[answer]);
  //console.log(answer)
  const checkAnswer=(e)=>{
    e.preventDefault()
    let n=b.map((obj)=>obj.is_right)
    let y={...n}
    //console.log(y)
    function arrayEquals(o,p){
      return(Array.isArray(o) && Array.isArray(p) && o.length===p.length && o.every((val,index)=>val===p[index]))
    }
    let o=Object.values(y)
    let p=Object.values(answer)
    
    if(arrayEquals(o,p)){
      setAnswerCheck(true);
    } else{
      setAnswerCheck(false);
    }
  }
 //console.log(answerCheck)
 function refreshPage() {
  window.location.reload(false);
}
 function Result() {
  if (answerCheck === true) {
    return (
      <Alert severity="success">
        <AlertTitle>Corrent Answer</AlertTitle>
        Well done you got it right —{" "}
        <Link href="#" variant="body2"onClick={refreshPage} >
          {"Next Question"} 

        </Link>
      </Alert>
    );
  } else if (answerCheck === false) {
    return (
      <Alert severity="error">
        <AlertTitle>Wrong Answer</AlertTitle>
        Please try again!
      </Alert>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
}
  ////console.log(userData)
 // //console.log(data)
 //userData.data.map(({quiz,title})=>(//console.log(quiz.title)))
 
 ////console.log(Object.entries(userData.data))

 ////console.log(typeof(userData.data))

  return (
    <><Navbar/><br/>
    <div className='container'>
    {access_token ? 
      <div className="container " style={{"margin":"auto"}}>
        
        <div className="card">
        <div className="card-header text-center">
        <h4>{c}</h4>
        </div>
        {userData.data.map(({quiz,title,answer},i)=>(
        <div><Box component="form" id={i} >
        <div className="card-body" key={i}>
          <h5 className="card-title">{title}</h5>
          
          {answer.map(({ answer_text, id }) => (
              <div className="form-check">
              <input className="form-check-input text-center" type="checkbox" key={id} value={id} id="flexCheckDefault" onChange={handleSelection}/>
              <label className="form-check-label" htmlFor="flexCheckDefault">
                {answer_text}
              </label>
              
            </div>
              
            ))}
          
          
        </div>
        </Box>
        </div>
        
        ))}
        <Result />
        <button className='btn btn-primary' type='button' onClick={checkAnswer}>Submit</button>
      </div>
      </div>
: <div className="alert alert-danger" role="alert">
<h4 className="alert-heading">Please Login!</h4>
<p>If you want to give quiz please login in your account</p>
<hr/>
<p className="mb-0">If you don't have account. Please Register to give Quiz</p>
<br/>
<Link to="/register" className='btn btn-danger'>Register</Link>
</div>}
</div>
      </>
  )
   /* {userData.data.map(({quiz,title,answer},i)=>(
       <div key={i}>
       <Typography component="h1" variant="h5">
         {title}
         
       </Typography>
       {answer.map(({ answer_text, id }) => (
         <RadioGroup>
           <FormControlLabel
             control={
               <Checkbox
                 value={id}
                 color="primary"
                 
               />
             }
             label={answer_text}
           />
         </RadioGroup>
        
       ))}
       </div>
    ))}
   
  
    </React.Fragment>*/
  
}

export default DjangoQuiz