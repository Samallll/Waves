import React from 'react'
import './OtpForm.css'
import { useState } from 'react';

const handleSubmit = async (e) => {
  e.preventDefault();
//   if(Object.values(formData).some(value => value === null || value === '')){
//       setError("Please complete the form")
//       return;
//   }
// // Email Id exists check needed
//   console.log("form submitted");
//   sessionStorage("registerRequest",formData)
//   navigate("/otp/verify")
};

function OtpForm({children}) {

  const [error,setError] = useState("");

  return (
    <>
      <div className='d-flex justify-content-center align-items-center mt-5'>
        <div className="OtpForm">
          <div className="Logo">Waves</div>
          <div className="mainContent">
            {error && <p style={{
                  textAlign:"center",
                  color:"red",
                  marginTop:"25px",
                  marginBottom:"10px"
                  }}>{error}</p>}
            <div className="heading">OTP Verification</div>
            <div className="subHeading">We have send an OTP to your email. Enter your OTP here.</div>
            <input type='text' className="otpField"/>
            <div className='container'>
              <button className="proceed">Proceed</button>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OtpForm