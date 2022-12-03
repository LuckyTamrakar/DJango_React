import React, { useEffect, useState } from 'react'
import logo from './images/mfwlogo.png'
import {

  Link, useNavigate
} from "react-router-dom";
import {useGetLoginUserQuery} from '../Services/userAuthApi'
import { getToken, removeToken } from '../Services/LocalServices';
import { useDispatch } from 'react-redux';
import { unSetUserToken } from '../Features/AuthSlice';
import { setUserInfo, unSetUserInfo } from '../Features/UserSlice';
function Navbar(props) {
  const { access_token } = getToken()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {data,isSuccess}=useGetLoginUserQuery(access_token)
  const [userData,setUserData]=useState({email:"",name:""})
  useEffect(()=>{
    if(data && isSuccess){
      setUserData({
        email:data.email,
        name:data.name
      })    }
  },[data,isSuccess])
  useEffect(()=>{
    if(data && isSuccess){
      dispatch(setUserInfo({
        email:data.email,
        name:data.name
      }))
    }
  },[data,isSuccess,dispatch])
  
  const handleLogout=()=> {
    dispatch(unSetUserInfo({name:"",email:""}))
    dispatch(unSetUserToken({access_token:null}))
    navigate('/login')
    removeToken()
    window.location.reload(true)
    

  }
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="" width="70" height="60" className="d-inline-block align-text-top" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={props.home} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={props.contact} to="/contact">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className={props.about} to="/about">About</Link>
            </li>
          </ul>
          <ul className="navbar-nav justify-content-end">
            {access_token ? <> <li className="nav-item"><Link className="nav-link " to="/change-password"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-check-fill" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                  </svg>&nbsp;  Welcome {userData.name}</Link></li>
                                <li className="nav-item"><Link className="nav-link" onClick={handleLogout}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-power" viewBox="0 0 16 16">
                                    <path d="M7.5 1v7h1V1h-1z"/>
                                    <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
                                  </svg> &nbsp; Logout</Link></li> </>  : <><li className="nav-item"><Link className={props.register} to="/register"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                  </svg> &nbsp; Sign up</Link></li>
                                <li className="nav-item"><Link className={props.login} to="/login"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                                    <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                  </svg>&nbsp; Log in</Link></li></>}
          </ul>
        </div>

      </div>
    </nav>
  )
}
Navbar.defaultProps = {
  home: "nav-link",
  contact: "nav-link",
  about: "nav-link",
  login: "nav-link",
  register: "nav-link"
}
export default Navbar
