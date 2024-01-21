import React, { useState } from 'react'
import logo from '../../assets/square-logo.jpg'
import { Link, useNavigate } from 'react-router-dom';
import OtpTimer from '../OtpTimer';
import { useSelector } from 'react-redux';

function OtpForm(props) {

    const submitURL = props.submitURL;
    const [error,setError] = useState("");
    const [otp,setOtp] = useState("");
    const expiryTime = useSelector((state) => state.otp.expiryTime);

    if (!props.submitURL) {
        throw new Error('OtpForm component requires a "submitURL" prop');
    }
    
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
    
        if (Date.now() > expiryTime) {
            setError('OTP has expired');
            return;
        }

        // using the data stored in the session , send a request to the back end for user creation.
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
                        OTP Validation
                    </h1>
                    { error && <>
                        <h6 className='text-white bg-red-700 py-2 text-center rounded-20'>{error}</h6>
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
                        <OtpTimer expiryTime={expiryTime}/>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Validate Otp</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default OtpForm