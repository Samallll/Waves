import React from 'react'
import logo from '../../assets/square-logo.jpg'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendEmail } from '../../utils/authMethods';
import { generateOtp } from '../../features/otpSlice';
import { useDispatch } from 'react-redux';
import { generateRandomOtp } from '../../utils/authMethods';

function ForgotPassword() {

    const [email,setEmail] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    const handleSubmit = (e) => {

        e.preventDefault();
        localStorage.setItem('registeredEmail',email);
        const otp = generateRandomOtp();
        dispatch(generateOtp(otp))
        const message = "Here is your otp: " + otp;
        const subject = "OTP Verification - CrowdCraft.com"
        sendEmail(email,subject,message);
        navigate('/otpValidate');
    }

  return (
    <section className="bg-white">
        <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto md:my-20">
            <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-black">
                <img className="w-16 h-18 mr-2 rounded-xl" src={logo} alt="logo"/>
                CrowdCraft      
            </Link>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white" >
                        Change Password
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <p className="block text-center my-4 text-base tracking-normal text-gray-900 dark:text-white">Please enter your registered email. We will send you an otp for validation</p>
                            <input type="email" 
                                placeholder='Registered Email'
                                name="email" 
                                id="email" 
                                value = {email} 
                                onChange={(e)=>setEmail(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 hover:ring-4 hover:outline-none hover:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Send Otp</button>
                        <Link to='/' type="button" className="w-full text-white bg-primary-600 hover:bg-primary-700 hover:ring-4 hover:outline-none hover:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ForgotPassword