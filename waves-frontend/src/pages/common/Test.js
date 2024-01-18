import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Test() {

  const[message01,setMessage01] = useState("Api has not been called yet");
  const[message02,setMessage02] = useState("Api has not been called yet");
  const[userInfo,setUserInfo] = useState("No data");
  
  function login(){
    window.location.href='http://127.0.0.1:8090/oauth2/authorization/gateway';
  }

  function logout(){
    window.location.href = "http://127.0.0.1:8090/logout"
  }

  const button1=() => {

    fetch("http://127.0.0.1:8090/email/user",{
      method:'GET',
      mode: 'no-cors'
    }).then(async (demoData) => {
      const demoStr = await demoData.text();
      setMessage01(demoStr)
    }).catch(error=>{
      console.log(error)
    })
  }

  const button2=() => {
    
    fetch("http://127.0.0.1:8090/email/admin",{
      method:'GET',
      mode: 'no-cors'
    }).then(async (demoData) => {
      const demoStr = await demoData.text();
      setMessage02(demoStr)
    }).catch(error=>{
      console.log(error)
    })

  }
  
  const getUserInfo=() => {
    
    fetch("http://127.0.0.1:8090/userinfo",{
      method:'GET',
      mode: 'no-cors'
    }).then(async (demoData) => {
      const demoStr = await demoData.text();
      setUserInfo(demoStr)
    }).catch(error=>{
      console.log(error)
    })

  }


  return (
    <>
    <h1>Welcome to Spring boot tutorial</h1>
    <button onClick={login}>Login</button><br />
    <button onClick={logout}>Logout</button><br /><br />
    <button onClick={button1}>Call Resource Server 01</button><br /><br />
    <h1>Message from Resource Server 01: {message01}</h1> 
    <button onClick={button2}>Call Resource Server 02</button><br /><br />
    <h1>Message from Resource Server 02: {message02}</h1> 
    <button onClick={getUserInfo}>User Info</button><br /><br />
    <h1>User info: {userInfo} </h1>
    <Link to={"/home"}>To home</Link>
    </>
  )
}

export default Test