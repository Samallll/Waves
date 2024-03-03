import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/square-logo.jpg'
import { useSelector } from 'react-redux';
import OtpTimer from '../OtpTimer';

function OtpValidation() {

    const [error,setError] = useState("")
    const [otp,setOtp] = useState("");
    const otpStored = useSelector(state=>state.otp)
    const navigate = useNavigate();

    const handleSubmit = (e) => {

      e.preventDefault();
      if (otp.length !== 6) {
          setError('OTP must be 6 characters long')
          return;
      }

      if (!/^\d+$/.test(otp)) {
          setError('OTP must contain only digits')
          return;
      }

      if (Date.now() > otpStored.expiryTime) {
          setError('OTP has expired');
          return;
      }
      if(!(otpStored.otp === otp)){
          setError('Incorrect OTP. Please try again.');
          return;
      }
      navigate("/password-confirmation")
    }

  return (
    <section className="bg-white">
        <div className="flex flex-col items-center justify-center pb-6 pt-0 py-6 mx-auto md:my-20">
            <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-black">
                <img className="w-16 h-18 mr-2 rounded-xl" src={logo} alt="logo"/>
                CrowdCraft      
            </Link>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl" >
                        OTP Validation
                    </h1>
                    { error && <>
                        <h6 className='text-white bg-red-700 py-2 text-center rounded'>{error}</h6>
                    </>}
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <p className="block text-center my-4 text-sm font-medium text-gray-900 dark:text-white">We have send an OTP to your email! Please validate it</p>
                            <input type="text" 
                                placeholder='xxxxxx'
                                name="otp" 
                                id="otp" 
                                value = {otp} 
                                onChange={(e)=>setOtp(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                        </div>
                        <OtpTimer expiryTime={otpStored.expiryTime}/>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 hover:ring-4 hover:outline-none hover:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Validate Otp</button>
                        <Link to='/' type="button" className="w-full text-white bg-primary-600 hover:bg-primary-700 hover:ring-4 hover:outline-none hover:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default OtpValidation